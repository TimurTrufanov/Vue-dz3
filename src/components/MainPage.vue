<template>
  <div>
    <h1 class="text-center mb-4">Main page</h1>
    <anime-list
        title="Current season anime"
        routeName="anime-now"
        :fetchAction="fetchNowAnime"
        :animeArray="currentSeasonArray"/>
    <v-divider class="my-8"></v-divider>
    <anime-list
        title="Upcoming season anime"
        routeName="anime-upcoming"
        :fetchAction="fetchUpcomingAnime"
        :animeArray="upcomingSeasonArray"/>
  </div>
</template>

<script>
import {useMediaStore} from "@/store/mediaStore.js";
import AnimeList from "@/components/anime/AnimeList.vue";
import {mapActions, mapState} from "pinia";

export default {
  name: "MainPage",
  components: {
    AnimeList,
  },
  computed: {
    ...mapState(useMediaStore,['currentSeasonArray', 'upcomingSeasonArray']),
  },
  methods: {
    ...mapActions(useMediaStore, ['fetchMainMedia', 'resetPage', 'resetSingleMedia']),
    async fetchNowAnime() {
      await this.fetchMainMedia('now');
    },
    async fetchUpcomingAnime() {
      await this.fetchMainMedia('upcoming');
    }
  },
  created() {
    this.resetSingleMedia();
    this.resetPage();
  },
}
</script>

<style scoped>

</style>