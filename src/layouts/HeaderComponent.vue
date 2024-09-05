<template>
  <v-app-bar class="px-4">
    <v-row justify="space-between">
      <v-col cols="auto">
        <v-btn :to="{name: 'main'}">Main page</v-btn>
        <v-btn :to="{name: 'anime'}">Anime</v-btn>
        <v-btn :to="{name: 'manga'}">Manga</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn :to="{name: 'abstract'}">Abstract examples</v-btn>
      </v-col>
      <v-col cols="auto">
        <theme-switcher/>
      </v-col>
      <v-col v-if="userId" cols="auto">
        <router-link :to="{name: 'user-statuses', params: {id: userId}}">
          <v-avatar class="mr-4">
            <v-img :src="profilePictureUrl" alt="User Avatar"/>
          </v-avatar>
        </router-link>
        <v-btn v-if="isAdmin" :to="{name: 'admin'}">Admin page</v-btn>
        <v-btn :to="{name: 'user-statuses', params: {id: userId}}">Personal cabinet</v-btn>
        <v-btn @click="handleLogout">Logout</v-btn>
      </v-col>
      <v-col v-else cols="auto">
        <v-btn :to="{name: 'login'}">Sign in</v-btn>
        <v-btn :to="{name: 'registration'}">Sign up</v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import {mapState, mapActions} from 'pinia';
import {useUserStore} from "@/store/userStore";

export default {
  name: "HeaderComponent",
  components: {
    ThemeSwitcher,
  },
  computed: {
    ...mapState(useUserStore, ['userId', 'isAdmin', 'profilePictureUrl']),
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    async handleLogout() {
      await this.logout();
      this.$router.push({name: 'main'});
    },
  },
}
</script>

<style scoped>

</style>