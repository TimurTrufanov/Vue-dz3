<template>
  <div class="my-4">
    <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
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
      ></v-text-field>

      <v-btn class="mt-4" :disabled="!valid" color="success" type="submit">
        Submit
      </v-btn>
    </v-form>
  </div>
</template>

<script>
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