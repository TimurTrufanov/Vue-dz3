<template>
  <v-app>
    <header-component/>
    <v-main>
      <v-container class="container">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from "@/layouts/HeaderComponent.vue";
import { mapActions } from 'pinia';
import { useUserStore } from "@/store/userStore";

export default {
  name: 'App',
  components: {
    HeaderComponent,
  },
  methods: {
    ...mapActions(useUserStore, ['initAuth']),
  },
  async created() {
    await this.initAuth();
  },
}
</script>

<style scoped>
  .container{
    max-width: 1200px;
  }
</style>
