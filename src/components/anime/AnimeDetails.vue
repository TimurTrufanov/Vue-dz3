<template>
  <base-details mediaType="anime" v-slot="{ details }">
    <v-list-item v-if="details.episodes">
      <strong>Episodes:</strong> {{ details.episodes }}
    </v-list-item>
    <v-list-item v-if="details.duration">
      <strong>Duration:</strong> {{ details.duration }}
    </v-list-item>
    <v-list-item v-if="details.aired">
      <strong>Aired:</strong> {{ details.aired.string }}
    </v-list-item>
    <v-list-item v-if="details.broadcast">
      <strong>Broadcast:</strong> {{ details.broadcast.string }}
    </v-list-item>
    <v-list-item v-if="details.studios">
      <strong>Studios:</strong> {{ details.studios.map(studio => studio.name).join(', ') }}
    </v-list-item>
  </base-details>
</template>

<script>
import BaseDetails from '@/components/base/BaseDetails.vue';

export default {
  name: "AnimeDetails",
  components: {
    BaseDetails
  }
};
</script>

<style scoped>

</style>