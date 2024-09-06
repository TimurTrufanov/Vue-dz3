<template>
  <div v-if="characters.length" ref="charactersList">
    <v-divider class="my-4"></v-divider>
    <h2 class="text-center mt-16">All characters</h2>
    <v-row >
      <v-col
          v-for="character in characters"
          :key="character.character.mal_id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
      >
        <v-card>
          <v-img
              :src="character.character.images.jpg.image_url"
              :alt="character.character.name"
              cover height="350px">
          </v-img>
          <v-card-title>{{ character.character.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axiosInstance from "@/services/axios.js";

export default {
  name: "BaseCharacters",
  props: {
    mediaType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      characters: [],
    };
  },
  methods: {
    async fetchCharacters() {
      try {
        const id = this.$route.params.id;
        const response = await axiosInstance.get(`${this.mediaType}/${id}/characters`);
        this.characters = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    characters(newValue) {
      if (newValue.length) {
        this.$nextTick(() => {
          const charactersList = this.$refs.charactersList;
          if (charactersList) {
            charactersList.scrollIntoView({ behavior: 'smooth'});
          }
        });
      }
    }
  },
  mounted() {
    this.fetchCharacters();
  }
};
</script>

<style scoped>
</style>