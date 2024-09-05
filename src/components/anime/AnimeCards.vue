<template>
  <v-container>
    <v-row>
      <v-col
          v-for="anime in animeArray"
          :key="anime.mal_id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
      >
        <card-info mediaType="anime" :item="anime"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-pagination
            v-model="page"
            :length="totalPages"
            @click="handlePageChange"
            total-visible="8"
            class="mt-4"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useMediaStore } from "@/store/mediaStore.js";
import { mapState, mapActions } from "pinia";
import CardInfo from "@/components/CardInfo.vue";
import {animeFilters, mangaFilters} from "@/constants/filters.js";

export default {
  name: "AnimeCards",
  components: {
    CardInfo,
  },
  props: {
    season: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(useMediaStore, ['currentSeasonArray', 'upcomingSeasonArray', 'totalPages', 'currentPage']),
    page: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.setPage(value);
      },
    },
    animeArray() {
      return this.season === 'now' ? this.currentSeasonArray : this.upcomingSeasonArray;
    },
  },
  methods: {
    ...mapActions(useMediaStore, ['fetchMainMedia', 'setPage', 'resetSingleMedia']),
    handlePageChange() {
      this.updateRouteQuery();
    },

    validatePage(page) {
      if (page > this.totalPages) {
        this.$router.push({ name: 'not-found' });
      }
    },

    updateRouteQuery() {
      const query = {};

      if (this.currentPage > 1) query.page = this.currentPage;

      this.$router.push({ name: `anime-${this.season}`, query });
    },
  },
  watch: {
    '$route.query.page': {
      async handler(page) {
        this.resetSingleMedia();
        let currentPage = page <= 0 || isNaN(+page) && page !== undefined || +page || 1;

        if (currentPage === true) {
          this.$router.push({ name: 'not-found' });
          return;
        }

        this.setPage(currentPage);

        await this.fetchMainMedia(this.season);

        this.validatePage(currentPage);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
</style>