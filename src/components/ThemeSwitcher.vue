<template>
    <v-btn @click="toggleTheme">Toggle Theme</v-btn>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  methods: {
    toggleTheme() {
      this.$vuetify.theme.global.name = this.$vuetify.theme.global.name === 'dark' ? 'light' : 'dark';
    },
  },
};
</script>

<style scoped>

</style>