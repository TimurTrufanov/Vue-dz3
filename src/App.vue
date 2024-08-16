<template>
  <v-app class="py-4">
    <header-component @content-changed="handleContentChange"></header-component>
    <v-main>
      <filter-component @filter-changed="handleFilterChange"></filter-component>
      <anime-cards v-if="currentComponent === 'anime'" :filteredBy="filteredBy"></anime-cards>
      <manga-cards v-if="currentComponent === 'manga'" :filteredBy="filteredBy"></manga-cards>
    </v-main>
  </v-app>
</template>

<script>
import AnimeCards from '@/components/AnimeCards.vue';
import MangaCards from "@/components/MangaCards.vue";
import HeaderComponent from "@/components/layouts/HeaderComponent.vue";

export default {
  name: 'App',
  components: {
    AnimeCards,
    MangaCards,
    HeaderComponent
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
