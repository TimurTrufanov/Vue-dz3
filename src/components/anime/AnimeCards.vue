<template>
  <base-cards :media-type="mediaType" />
</template>

<script>
import BaseCards from "@/components/BaseCards.vue";

export default {
  name: "AnimeCards",
  components: {
    BaseCards
  },
  data() {
    return{
      mediaType: 'anime',
    }
  }
};
</script>