<template>
  <v-container>
    <div class="d-flex justify-center" v-if="!contentLoaded">
      <v-progress-circular indeterminate :size="128" :width="12"></v-progress-circular>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="6">
          <v-text-field
              append-inner-icon="mdi-magnify"
              clearable
              v-model="userMediaSearch"
              :label="`Search ${mediaType}`"
              variant="underlined"
              @click:append-inner="handleSearch"
              @click:clear="handleSearch"
          />
        </v-col>
        <v-col cols="6">
          <filter-component :mediaType="mediaType" @filter-changed="handleFilterChange" :disabled="isSearching"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            v-for="item in mediaArray"
            :key="item.mal_id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
        >
          <card-info :mediaType="mediaType" :item="item"/>
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
    </div>
  </v-container>
</template>

<script>
import {useMediaStore} from "@/store/mediaStore.js";
import FilterComponent from "@/components/FilterComponent.vue";
import { animeFilters, mangaFilters } from "@/constants/filters.js";
import CardInfo from "@/components/CardInfo.vue";
import {mapState, mapActions} from "pinia";

export default {
  name: "BaseCards",
  components: {
    FilterComponent,
    CardInfo
  },
  props: {
    mediaType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userMediaSearch: '',
      isSearching: false,
      contentLoaded: false,
    };
  },
  computed: {
    ...mapState(useMediaStore, ['mediaArray', 'totalPages', 'currentPage', 'filteredBy']),
    page: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.setPage(value);
      },
    },
  },
  methods: {
    ...mapActions(useMediaStore, ['fetchMedia', "fetchMediaSearch", 'setFilter', 'setPage', 'resetSingleMedia', 'resetPage']),
    handleFilterChange(newFilter) {
      this.isSearching = false;
      this.setFilter(newFilter);
      this.resetPage();
      this.updateRouteQuery();
    },
    handlePageChange() {
      this.updateRouteQuery();
    },
    handleSearch() {
      this.isSearching = !!this.userMediaSearch;
      this.setFilter('');
      this.resetPage();
      this.updateRouteQuery();
    },
    async fetchMediaByType() {
      if (this.isSearching) {
        await this.fetchMediaSearch(this.mediaType, this.userMediaSearch);
      } else {
        await this.fetchMedia(this.mediaType);
      }
    },
    validateQueryParams(filter, page) {
      const validFilters = this.mediaType === 'anime'
          ? animeFilters.map(f => f.value)
          : mangaFilters.map(f => f.value);

      if (filter && !validFilters.includes(filter)) {
        this.$router.push({ name: 'not-found' });
      }

      if (page > this.totalPages) {
        this.$router.push({ name: 'not-found' });
      }
    },

    updateRouteQuery() {
      const query = {};

      if (this.isSearching) {
        query.search = this.userMediaSearch;
      } else {
        if (this.filteredBy) query.filter = this.filteredBy;
      }

      if (this.currentPage > 1) query.page = this.currentPage;

      this.$router.push({ name: `${this.mediaType}`, query });
    },
  },
  watch: {
    '$route.query': {
      async handler(newQuery) {
        this.contentLoaded = false;
        this.resetSingleMedia();
        const filter = newQuery.filter || '';
        const search = newQuery.search || "";
        const page = newQuery.page <= 0 || isNaN(+newQuery.page) && newQuery.page !== undefined || +newQuery.page || 1;

        if (page === true) {
          this.$router.push({ name: 'not-found' });
          return;
        }

        this.setFilter(filter);
        this.userMediaSearch = search;
        this.isSearching = !!search;
        this.setPage(page);

        await this.fetchMediaByType();

        this.validateQueryParams(filter, page);
        this.contentLoaded = true;
      },
      immediate: true
    }
  },
};
</script>

<style scoped>
</style>