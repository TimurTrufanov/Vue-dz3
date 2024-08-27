<template>
  <div>
    <div class="progress-container" v-if="!details">
      <v-progress-circular indeterminate :size="128" :width="12"></v-progress-circular>
    </div>
    <div v-else>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-img :src="details.images.jpg.image_url" :alt="details.title"/>
          </v-col>
          <v-col cols="12" md="8">
            <h2>{{ details.title }}</h2>
            <h3 v-if="details.title_english">({{ details.title_english }})</h3>
            <p>
              <strong>Japanese:</strong> {{ details.title_japanese }}
            </p>
            <p v-if="details.title_synonyms.length">
              <strong>Synonyms:</strong> {{ details.title_synonyms.join(', ') }}
            </p>
            <v-divider class="my-4"></v-divider>
            <p class="font-italic">{{ details.synopsis }}</p>
            <v-divider class="my-4"></v-divider>
            <v-list>
              <v-list-item>
                <strong>ID:</strong> {{ $route.params.id }}
              </v-list-item>
              <v-list-item v-if="details.score">
                <strong>Score:</strong> {{ details.score }}
              </v-list-item>
              <v-list-item v-if="details.rank">
                <strong>Rank:</strong> {{ details.rank }}
              </v-list-item>
              <v-list-item v-if="details.popularity">
                <strong>Popularity:</strong> {{ details.popularity }}
              </v-list-item>
              <v-list-item v-if="details.members">
                <strong>Members:</strong> {{ details.members }}
              </v-list-item>
              <v-list-item v-if="details.favorites">
                <strong>Favorites:</strong> {{ details.favorites }}
              </v-list-item>
              <v-list-item v-if="details.type">
                <strong>Type:</strong> {{ details.type }}
              </v-list-item>
              <v-list-item v-if="details.status">
                <strong>Status:</strong> {{ details.status }}
              </v-list-item>
              <v-list-item v-if="details.rating">
                <strong>Rating:</strong> {{ details.rating }}
              </v-list-item>
              <slot :details="details"></slot>
              <v-list-item>
                <v-btn variant="tonal" :to="{name: `${mediaType}-characters`}">View characters</v-btn>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row v-if="details.trailer && details.trailer.embed_url">
          <v-col cols="12">
            <v-divider class="my-4"></v-divider>
            <h3 class="text-center mb-4">Trailer</h3>
            <iframe :src="details.trailer.embed_url" class="trailer" width="100%" allowfullscreen></iframe>
          </v-col>
        </v-row>
        <router-view />
      </v-container>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/services/axios.js";

export default {
  name: "BaseDetails",
  props: {
    mediaType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      details: null
    };
  },
  methods: {
    async fetchDetails() {
      try {
        const id = this.$route.params.id;
        const response = await axiosInstance.get(`${this.mediaType}/${id}`);
        this.details = response.data.data;
      } catch (error) {
        if (error.response.status === 404) {
          this.$router.push({ name: 'not-found' });
        }
      }
    },
  },
  created() {
    this.fetchDetails();
  },
};
</script>

<style scoped>
.progress-container{
  display: flex;
  justify-content: center;
}

.trailer {
  aspect-ratio: 16 / 9;
  border: none;
}
</style>