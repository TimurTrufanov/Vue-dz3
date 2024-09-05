<template>
  <div class="my-4">
    <v-form ref="form" v-model="valid" @submit.prevent="handleRegister">
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
      <v-alert
          v-if="errorMessage"
          type="error"
          :text="errorMessage"
      ></v-alert>
      <v-btn class="mt-4" :disabled="!valid" color="success" type="submit">
        Submit
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@/store/userStore';
import validationMixin from '@/mixins/validationMixin';

export default {
  name: 'UserRegistration',
  mixins: [validationMixin],
  data() {
    return {
      formData: {
        username: '',
        email: '',
        age: '',
        password: '',
        passwordConfirmation: '',
      },
    };
  },
  computed: {
    ...mapState(useUserStore, ['errorMessage']),
  },
  methods: {
    ...mapActions(useUserStore, ['register']),
    async handleRegister() {
      if (await this.$refs.form.validate()) {
        const success = await this.register({
          email: this.formData.email,
          password: this.formData.password,
          username: this.formData.username,
          age: this.formData.age,
        });
        if (success) {
          this.$router.push({ name: 'main' });
        }
      }
    },
  },
  mounted() {
    if (this.userId) {
      this.$emit('update:userId', this.userId);
    }
  }
};
</script>

<style scoped></style>