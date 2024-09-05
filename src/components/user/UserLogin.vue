<template>
  <div class="my-4">
    <v-form ref="form" v-model="valid" @submit.prevent="handleLogin">
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
  name: 'UserLogin',
  mixins: [validationMixin],
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapState(useUserStore, ['errorMessage']),
  },
  methods: {
    ...mapActions(useUserStore, ['login']),
    async handleLogin() {
      if (await this.$refs.form.validate()) {
        const success = await this.login(this.formData.email, this.formData.password);
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