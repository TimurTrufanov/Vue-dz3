<template>
  <base-details mediaType="manga" v-slot="{ details }">
    <v-list-item v-if="details.volumes">
      <strong>Volumes:</strong> {{ details.volumes }}
    </v-list-item>
    <v-list-item v-if="details.chapters">
      <strong>Chapters:</strong> {{ details.chapters }}
    </v-list-item>
    <v-list-item v-if="details.published">
      <strong>Published:</strong> {{ details.published.string }}
    </v-list-item>
    <v-list-item v-if="details.authors.length">
      <strong>Authors:</strong> {{ details.authors.map(author => author.name).join(', ') }}
    </v-list-item>
    <v-list-item v-if="details.serializations.length">
      <strong>Serializations:</strong> {{ details.serializations.map(serial => serial.name).join(', ') }}
    </v-list-item>
  </base-details>
</template>

<script>
import BaseDetails from '@/components/BaseDetails.vue';

export default {
  name: "MangaDetails",
  components: {
    BaseDetails
  }
};
</script>

<style scoped>

</style>