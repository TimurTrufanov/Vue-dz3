<template>
  <v-app-bar>
    <v-container>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-btn href="#" @click.prevent="selectAnime">Anime</v-btn>
          <v-btn href="#" @click.prevent="selectManga">Manga</v-btn>
        </v-col>
        <v-col cols="auto">
          <theme-switcher/>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
export default {
  name: "HeaderComponent",
  components: {
    ThemeSwitcher,
  },
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

</style>