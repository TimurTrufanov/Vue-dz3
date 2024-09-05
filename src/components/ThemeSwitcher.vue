<template>
  <div class="d-flex align-center theme-switcher">
    <v-icon :color="isDarkTheme ? 'grey' : 'yellow'" class="mx-2">mdi-weather-sunny</v-icon>
    <v-switch
        class="mt-5"
        v-model="isDarkTheme"
        inset
    ></v-switch>
    <v-icon :color="isDarkTheme ? 'lightblue' : 'grey'" class="mx-2">mdi-weather-night</v-icon>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  data() {
    return {
      isDarkTheme: true,
    };
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
    } else {
      this.isDarkTheme = this.$vuetify.theme.global.name === 'dark';
    }
  },
  watch: {
    isDarkTheme(newValue) {
      this.$vuetify.theme.global.name = newValue ? 'dark' : 'light';
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
    },
  },
};
</script>

<style scoped>
.theme-switcher {
  height: 40px;
}
</style>