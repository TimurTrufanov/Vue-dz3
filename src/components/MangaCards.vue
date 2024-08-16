<template>
  <v-container>
    <v-row>
      <v-col
          v-for="manga in mangaArray"
          :key="manga.mal_id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
      >
        <v-card>
          <v-img
              :src="manga.images.jpg.image_url"
              height="350px"
              cover
          ></v-img>
          <v-card-title>{{ manga.title }}</v-card-title>
          <v-card-subtitle>{{ manga.year }}</v-card-subtitle>
          <v-card-subtitle class="pt-2">score: {{ manga.score }}</v-card-subtitle>
          <v-card-text>{{ getGenres(manga.genres) }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axiosInstance from '../../services/axios.js';

export default {
  name: "MangaCards",
  props: {
    filteredBy: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentPage: 1,
      mangaArray: [],
      limitPerPage: 24,
      allPages: 0,
    }
  },
  methods: {
    fetchManga() {
      axiosInstance.get(`top/manga?filter=${this.filteredBy}&page=${this.currentPage}&limit=${this.limitPerPage}`)
          .then((response) => {
            this.mangaArray = response.data.data;
            console.log(this.mangaArray);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getGenres(genres) {
      return genres.map(genre => genre.name).join(', ');
    },
  },
  watch: {
    filteredBy() {
      this.fetchManga();
    }
  },
  mounted() {
    this.fetchManga();
  },
}
</script>

<style scoped>

</style>