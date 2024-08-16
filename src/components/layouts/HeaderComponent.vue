<template>
  <v-app-bar>
    <v-container>
      <a href="#" @click.prevent="selectAnime">Anime</a>
      <a href="#" @click.prevent="selectManga">Manga</a>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderComponent",
  methods: {
    selectAnime() {
      this.$emit('content-changed', 'anime');
    },
    selectManga() {
      this.$emit('content-changed', 'manga');
    }
  }
}
</script>

<style scoped>
a {
  color: #000;
  text-decoration: none;
  font-weight: bold;
}

a + a {
  margin-left: 20px;
}

a:hover {
  color: #3e3d3d;
  text-decoration: underline;
}
</style>