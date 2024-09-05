<template>
  <div>
    <h2 class="text-center text-xl-h3">User cabinet</h2>
    <div class="my-4 d-flex justify-space-between align-center">
      <p class="text-xl-h5 d-flex align-end">
        <router-link :to="{name: 'user-statuses', params: {id: userId}}">
          <v-avatar class="mr-4">
            <v-img :src="profilePictureUrl" alt="User picture"></v-img>
          </v-avatar>
        </router-link>
        {{ username }}
      </p>
      <div class="d-flex ga-5">
        <v-btn exact :to="{ name: 'user-statuses', params: { id: userId } }">View user statuses</v-btn>
        <v-btn :to="{ name: 'change-info', params: { id: userId } }">Change user info</v-btn>
        <v-btn :to="{ name: 'change-password', params: { id: userId } }">Change password</v-btn>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'pinia';
import {useUserStore} from "@/store/userStore";
import UserStatuses from "@/components/user/UserStatuses.vue";

export default {
  name: "UserCabinet",
  components: {
    UserStatuses,
  },
  computed: {
    ...mapState(useUserStore, ['userId', 'username', 'profilePictureUrl']),
  },
  created() {
    if (!this.userId || this.userId !== this.$route.params.id) {
      this.$router.push({name: 'not-found'});
    }
  },
}
</script>

<style scoped>

</style>