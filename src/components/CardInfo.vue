<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card v-bind="props">
      <v-img :src="item.images.jpg.image_url" :alt="item.title" height="350px" cover>
        <v-expand-transition>
          <div v-if="isHovering" class="hover-info-card d-flex flex-column justify-center text-center px-4">
            <div>
              <v-card-text class="hover-text">{{ item.synopsis }}</v-card-text>
              <v-card-actions>
                <v-btn :to="detailsLink" class="w-100" variant="plain" size="large">Check details</v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-subtitle>{{ item.year }}</v-card-subtitle>
      <v-card-subtitle v-if="showScore" class="pt-2">
        Score: {{ item.score }}
      </v-card-subtitle>
      <v-card-text>{{ item.genres.map(genre => genre.name).join(", ") }}</v-card-text>
      <v-card-actions>
        <v-btn :to="detailsLink" class="w-100" size="large">Check details</v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "CardInfo",
  props: {
    item: {
      type: Object,
      required: true,
    },
    showScore: {
      type: Boolean,
      required: true,
    },
    mediaType: {
      type: String,
      required: true
    }
  },
  computed: {
    detailsLink() {
      return `/${this.mediaType}/${this.item.mal_id}`;
    }
  },
}
</script>

<style scoped>
.hover-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 13;
  -webkit-box-orient: vertical;
  padding: 0;
}

.hover-info-card {
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  color: white;
}
</style>