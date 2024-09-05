<template>
  <v-card class="mt-4">
    <v-card-title class=" mt-2">
      Change User Information
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="updateUserInfoHandler" v-model="valid" ref="form">
        <v-text-field
            required
            v-model="formData.newUsername"
            :rules="usernameRules"
            label="New Username"
        ></v-text-field>
        <v-text-field
            required
            v-model="formData.newAge"
            :rules="ageRules"
            label="New Age"
            type="number"
        ></v-text-field>
        <v-file-input
            v-model="formData.profilePicture"
            label="Profile Picture"
            accept="image/*"
        ></v-file-input>
        <v-alert
            v-if="showSuccessMessage"
            type="success"
            class="mt-4"
            text="User information updated successfully!"
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
      <v-btn color="primary" :disabled="!valid" @click="updateUserInfoHandler">Save Changes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapState, mapActions} from 'pinia';
import {useUserStore} from '@/store/userStore';
import validationMixin from '@/mixins/validationMixin';

export default {
  name: 'UserChangeInfo',
  mixins: [validationMixin],
  data() {
    return {
      formData: {
        newUsername: '',
        newAge: '',
        profilePicture: null,
      },
      showSuccessMessage: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ['username', 'age', 'profilePictureUrl', 'errorMessage']),
  },
  methods: {
    ...mapActions(useUserStore, ['updateUserInfo', 'uploadProfilePicture', 'fetchUserData']),
    async updateUserInfoHandler() {
      this.showSuccessMessage = false;
      if (await this.$refs.form.validate()) {
        await this.updateUserInfo({username: this.formData.newUsername, age: this.formData.newAge});
        if (this.formData.profilePicture) {
          await this.uploadProfilePicture(this.formData.profilePicture);
        }
        this.showSuccessMessage = true;
      }
    },
    initializeForm() {
      this.formData.newUsername = this.username;
      this.formData.newAge = this.age;
    }
  },
  async mounted() {
    await this.fetchUserData();
    this.initializeForm();
  },
};
</script>

<style scoped>

</style>