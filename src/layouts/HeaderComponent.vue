<template>
  <v-app-bar class="px-4">
    <v-row justify="space-between">
      <v-col cols="auto">
        <v-btn to="/">Main page</v-btn>
        <v-btn to="/anime">Anime</v-btn>
        <v-btn to="/manga">Manga</v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn :to="{name: 'abstract'}">Abstract examples</v-btn>
      </v-col>
      <v-col cols="auto">
        <theme-switcher/>
      </v-col>
      <v-col v-if="userId" cols="auto">
        <v-btn v-if="isAdmin" :to="{name: 'admin'}">Admin page</v-btn>
        <v-btn :to="{name: 'user-cabinet', params: {id: userId}}">Personal cabinet</v-btn>
        <v-btn @click="logout">Logout</v-btn>
      </v-col>
      <v-col v-else cols="auto">
        <v-btn @click="goToLogin">Sign in</v-btn>
        <v-btn @click="goToRegistration">Sign up</v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import {signOut} from "firebase/auth";
import { auth, db } from "@/main.js";
import { doc, getDoc } from "firebase/firestore";

export default {
  name: "HeaderComponent",
  components: {
    ThemeSwitcher,
  },
  props: {
    userId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isAdmin: false,
    };
  },
  methods: {
    goToLogin() {
      this.$router.push({name: 'login'});
    },
    goToRegistration() {
      this.$router.push({name: 'registration'});
    },
    async logout() {
      try {
        await signOut(auth);
        this.$emit('update:userId', '');
        this.$router.push({ name: 'main' });
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch: {
    userId: {
      immediate: true,
      async handler(newUserId) {
        if (newUserId) {
          const userDocRef = doc(db, "users", newUserId);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            this.isAdmin = userDoc.data().isAdmin || false;
          }
        } else {
          this.isAdmin = false;
        }
      },
    },
  },
}
</script>

<style scoped>

</style>