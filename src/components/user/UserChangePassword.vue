<template>
  <v-card class="mt-4">
    <v-card-title>Change Password</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="changePasswordHandler" v-model="valid" ref="form">
        <v-text-field
            required
            v-model="formData.currentPassword"
            :rules="passwordRules"
            label="Current Password"
            type="password"
            autocomplete="on"
        ></v-text-field>
        <v-text-field
            required
            v-model="formData.newPassword"
            :rules="passwordRules"
            label="New Password"
            type="password"
            autocomplete="on"
        ></v-text-field>
        <v-text-field
            required
            v-model="formData.confirmNewPassword"
            :rules="newPasswordConfirmationRules"
            label="Confirm New Password"
            type="password"
            autocomplete="on"
        ></v-text-field>
        <v-alert
            v-if="showSuccessMessage"
            type="success"
            class="mt-4"
            text="Password changed successfully!"
        ></v-alert>
        <v-alert
            v-if="errorMessage"
            type="error"
            class="mt-4"
            :text="errorMessage"
        ></v-alert>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" :disabled="!valid" @click="changePasswordHandler">Change Password</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@/store/userStore';
import validationMixin from '@/mixins/validationMixin';

export default {
  name: 'UserChangePassword',
  mixins: [validationMixin],
  data() {
    return {
      formData: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      showSuccessMessage: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ['errorMessage']),
  },
  methods: {
    ...mapActions(useUserStore, ['fetchUserData', 'changePassword']),
    async changePasswordHandler() {
      this.showSuccessMessage = false;

      if (await this.$refs.form.validate()) {
        const success = await this.changePassword(this.formData.currentPassword, this.formData.newPassword);
        if (success) {
          this.showSuccessMessage = true;
        }
      }
    },
  },
};
</script>

<style scoped>
</style>