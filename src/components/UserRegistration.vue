<template>
  <div class="my-4">
    <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
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
      ></v-text-field>

      <v-text-field
          v-model="formData.passwordConfirmation"
          :rules="passwordConfirmationRules"
          label="Confirm Password"
          required
          type="password"
      ></v-text-field>

      <v-btn class="mt-4" :disabled="!valid" color="success" type="submit">
        Submit
      </v-btn>
    </v-form>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    handleSubmit() {
      if (this.$refs.form.validate()) {
        alert('Form successfully submitted!');
      }
      console.log(this.formData);
      this.$refs.form.reset();
    },
  }
}
</script>

<style scoped>

</style>