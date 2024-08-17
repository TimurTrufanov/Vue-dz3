<template>
  <v-app class="py-4">
    <header-component @content-changed="handleContentChange"/>
    <v-main>
      <v-container>
        <div class="mb-8">
          <current-time/>
          <user-registration/>
          <toggle-methods/>
          <dynamic-list/>
          <animated-component/>
          <dynamic-table/>
        </div>
        <filter-component @filter-changed="handleFilterChange"/>
        <anime-cards v-if="currentComponent === 'anime'" :filteredBy="filteredBy"/>
        <manga-cards v-if="currentComponent === 'manga'" :filteredBy="filteredBy"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AnimeCards from '@/components/AnimeCards.vue';
import MangaCards from "@/components/MangaCards.vue";
import HeaderComponent from "@/components/layouts/HeaderComponent.vue";
import CurrentTime from "@/components/CurrentTime.vue";
import UserRegistration from "@/components/UserRegistration.vue";
import ToggleMethods from "@/components/ToggleMethods.vue";
import DynamicList from "@/components/DynamicList.vue";
import AnimatedComponent from "@/components/AnimatedComponent.vue";
import DynamicTable from "@/components/DynamicTable.vue";

export default {
  name: 'App',
  components: {
    DynamicTable,
    AnimatedComponent,
    AnimeCards,
    MangaCards,
    HeaderComponent,
    CurrentTime,
    UserRegistration,
    ToggleMethods,
    DynamicList,
  },
  data() {
    return {
      currentComponent: 'anime',
      filteredBy: '',
    }
  },
  methods: {
    handleFilterChange(newFilter) {
      this.filteredBy = newFilter;
    },
    handleContentChange(newContent) {
      if (newContent === 'anime') {
        this.currentComponent = 'anime';
      }
      if (newContent === 'manga') {
        this.currentComponent = 'manga';
      }
    }
  }
}
</script>

<style scoped>

</style>
