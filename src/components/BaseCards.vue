<template>
  <v-container>
    <v-row>
      <filter-component :mediaType="mediaType" @filter-changed="handleFilterChange" />
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
        <card-info :mediaType="mediaType" :item="item" :showScore="showScore" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-pagination
            v-model="currentPage"
            :length="totalPages"
            @click="fetchMedia"
            total-visible="8"
            class="mt-4"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axiosInstance from "@/services/axios.js";
import FilterComponent from "@/components/FilterComponent.vue";
import CardInfo from "@/components/CardInfo.vue";

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
      currentPage: 1,
      totalPages: 1,
      mediaArray: [],
      limitPerPage: 24,
      filteredBy: "",
    };
  },
  methods: {
    async fetchMedia() {
      try {
        const response = await axiosInstance.get(
            `top/${this.mediaType}?filter=${this.filteredBy}&page=${this.currentPage}&limit=${this.limitPerPage}`
        );
        this.mediaArray = response.data.data;
        this.totalPages = response.data.pagination.last_visible_page;
        console.log(this.mediaArray);
        console.log(response);
        this.scrollToTop();
      } catch (error) {
        console.log(error);
      }
    },
    handleFilterChange(newFilter) {
      this.filteredBy = newFilter;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  },
  computed: {
    showScore() {
      return this.filteredBy !== "upcoming";
    },
  },
  watch: {
    filteredBy() {
      this.currentPage = 1;
      this.fetchMedia();
    },
  },
  mounted() {
    this.fetchMedia();
  },
};
</script>

<style scoped>
</style>