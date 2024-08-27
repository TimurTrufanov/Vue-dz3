<template>
  <v-app>
    <header-component :userId="userId" @update:userId="userId = $event"/>
    <v-main>
      <v-container class="container">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from "@/layouts/HeaderComponent.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/main.js";

export default {
  name: 'App',
  components: {
    HeaderComponent,
  },
  data() {
    return {
      userId: '',
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.userId = user ? user.uid : '';
    });
  }
}
</script>

<style scoped>
  .container{
    max-width: 1200px;
  }
</style>
