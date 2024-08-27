<template>
  <div class="my-4">
    <v-form ref="form" v-model="valid" @submit.prevent="login">
      <v-text-field
          v-model="formData.email"
          :rules="emailRules"
          label="Email"
          required
      ></v-text-field>

      <v-text-field
          v-model="formData.password"
          :rules="passwordRules"
          label="Password"
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
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/main.js";

export default {
  name: "UserLogin",
  data() {
    return {
      valid: false,
      formData: {
        email: '',
        password: '',
      },
      emailRules: [
        v => !!v || 'Email is required.',
        v => /.+@.+\..+/.test(v) || 'Email must be valid.',
      ],
      passwordRules: [
        v => !!v || 'Password is required.',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters long.',
      ],
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      if (await this.$refs.form.validate()) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, this.formData.email, this.formData.password);
          this.$emit('update:userId', userCredential.user.uid);
          this.$router.push({name: 'main'});
        } catch (error) {
          this.errorMessage = error.code
        }
      }
    },
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