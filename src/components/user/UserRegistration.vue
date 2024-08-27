<template>
  <div class="my-4">
    <v-form ref="form" v-model="valid" @submit.prevent="register">
      <v-text-field
          v-model="formData.username"
          :rules="usernameRules"
          label="Username"
          required
      ></v-text-field>

      <v-text-field
          v-model="formData.email"
          :rules="emailRules"
          label="Email"
          required
      ></v-text-field>

      <v-text-field
          v-model="formData.age"
          :rules="ageRules"
          label="Age"
          required
          type="number"
      ></v-text-field>

      <v-text-field
          v-model="formData.password"
          :rules="passwordRules"
          label="Password"
          required
          type="password"
          autocomplete="on"
      ></v-text-field>

      <v-text-field
          v-model="formData.passwordConfirmation"
          :rules="passwordConfirmationRules"
          label="Confirm Password"
          required
          type="password"
          autocomplete="on"
      ></v-text-field>

      <v-alert v-if="errorMessage" type="error" :text="errorMessage"></v-alert>

      <v-btn class="mt-4" :disabled="!valid" color="success" type="submit">
        Submit
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { auth, db } from "@/main.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default {
  name: "UserRegistration",
  data() {
    return {
      valid: false,
      formData: {
        username: '',
        email: '',
        age: '',
        password: '',
        passwordConfirmation: '',
      },
      usernameRules: [
        v => !!v || 'Username is required.',
        v => (v && v.length >= 6) || 'Username must be at least 6 characters long.',
      ],
      emailRules: [
        v => !!v || 'Email is required.',
        v => /.+@.+\..+/.test(v) || 'Email must be valid.',
      ],
      ageRules: [
        v => !!v || 'Age is required.',
        v => (v && v > 0) || 'Age must be a positive number.'
      ],
      passwordRules: [
        v => !!v || 'Password is required.',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters long.',
      ],
      passwordConfirmationRules: [
        v => !!v || 'Password confirmation is required.',
        v => v === this.formData.password || 'Passwords do not match.',
      ],
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      if (await this.$refs.form.validate()) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, this.formData.email, this.formData.password);
          const userId = userCredential.user.uid;

          await setDoc(doc(db, "users", userId), {
            username: this.formData.username,
            email: this.formData.email,
            age: this.formData.age,
            isAdmin: false,
          });

          this.$emit('update:userId', userId);
          this.$router.push({name: 'main'});

        } catch (error) {
          this.errorMessage = error.code
        }
      }
    }
  },
  mounted() {
    if (auth.currentUser) {
      this.$emit('update:userId', auth.currentUser.uid);
    }
  }
}
</script>

<style scoped>

</style>