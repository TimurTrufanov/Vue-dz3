<template>
  <v-container>
    <v-row>
      <v-col
          v-for="item in characters"
          :key="item.mal_id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
      >
        <v-card>
          <v-img :src="item.character.images.jpg.image_url" :alt="item.character.name" height="350px" cover></v-img>
          <v-card-title>{{ item.character.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axiosInstance from "@/services/axios.js";

export default {
  name: "AnimeCharacters",
  data() {
    return {
      characters: [],
    };
  },
  methods: {
    async fetchCharacters() {
      try {
        const id = this.$route.params.id;
        const response = await axiosInstance.get(`anime/${id}/characters`);
        this.characters = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchCharacters();
  },
};
</script>

<style scoped>
</style>