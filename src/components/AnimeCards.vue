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
        <v-card>
          <v-img
              :src="anime.images.jpg.image_url"
              height="350px"
              cover
          ></v-img>
          <v-card-title>{{ anime.title }}</v-card-title>
          <v-card-subtitle v-if="checkYear(anime.year)">{{ anime.year }}</v-card-subtitle>
          <v-card-subtitle v-show="checkYear(anime.year)">{{ anime.year }}</v-card-subtitle>
          <v-card-subtitle v-if="showScore" class="pt-2">score: {{ anime.score }}</v-card-subtitle>
          <v-card-text>{{ getGenres(anime.genres) }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axiosInstance from '../../services/axios.js';

export default {
  name: "AnimeCards",
  props: {
    filteredBy: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentPage: 1,
      animeArray: [],
      limitPerPage: 24,
    }
  },
  methods: {
    fetchAnime() {
      axiosInstance.get(`top/anime?filter=${this.filteredBy}&page=${this.currentPage}&limit=${this.limitPerPage}`)
          .then((response) => {
            this.animeArray = response.data.data;
            console.log(this.animeArray);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getGenres(genres) {
      return genres.map(genre => genre.name).join(', ');
    },
    checkYear(year) {
      return year !== null;
    }
  },
  computed: {
    showScore() {
      return this.filteredBy !== 'upcoming';
    }
  },
  watch: {
    filteredBy() {
      this.fetchAnime();
    }
  },
  mounted() {
    this.fetchAnime();
  },
}
</script>

<style scoped>

</style>