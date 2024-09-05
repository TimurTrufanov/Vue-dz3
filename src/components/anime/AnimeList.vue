<template>
  <v-sheet class="mx-auto rounded-xl" :max-width="1200">
    <h2 class="pl-16 pt-8">{{ title }}</h2>
    <v-slide-group show-arrows>
      <v-slide-group-item v-for="anime in animeArray" :key="anime.mal_id">
        <v-hover v-slot="{ isHovering, props }">
          <v-card v-bind="props" class="ma-4" width="250px">
            <v-img :src="anime.images.jpg.image_url" :alt="anime.title" height="350px" cover>
              <v-expand-transition>
                <div v-if="isHovering" class="hover-info-card d-flex flex-column justify-center text-center px-4">
                  <div>
                    <v-card-text class="hover-text">{{ anime.synopsis }}</v-card-text>
                    <v-card-actions>
                      <v-btn
                          :to="{ name: 'anime-details', params: { id: anime.mal_id }}"
                          class="w-100" variant="plain" size="large">Check details</v-btn>
                    </v-card-actions>
                  </div>
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-title>{{ anime.title }}</v-card-title>
          </v-card>
        </v-hover>
      </v-slide-group-item>
      <v-slide-group-item>
        <v-card
            :to= "{ name: routeName} "
            width="250px" class="ma-4 d-flex align-center justify-center">
          <v-card-title class="show-more">Show more &#8594</v-card-title>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>

export default {
  name: 'AnimeList',
  props: {
    title: {
      type: String,
      required: true
    },
    fetchAction: {
      type: Function,
      required: true
    },
    animeArray: {
      type: Array,
      required: true
    },
    routeName: {
      type: String,
      required: true
    }
  },

  mounted() {
    this.fetchAction();
  }
};
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