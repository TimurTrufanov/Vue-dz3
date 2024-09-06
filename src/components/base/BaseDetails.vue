<template>
  <div>
    <div class="d-flex justify-center" v-if="!details">
      <v-progress-circular indeterminate :size="128" :width="12"></v-progress-circular>
    </div>
    <div v-else>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-img v-tooltip="`${details.title}`" :src="details.images.jpg.image_url" :alt="details.title"/>
            <div class="d-flex flex-column align-center justify-center mt-4">
              <v-rating
                  hover
                  half-increments
                  :length="ratingLength"
                  density="compact"
                  color="primary"
                  active-color="warning"
                  :model-value="averageRating"
                  :readonly="!userId"
                  @update:model-value="handleRatingUpdate"
              />
              <p v-if="ratingCount">({{ ratingCount }} ratings)</p>
            </div>
            <media-status :mediaType="mediaType" :mediaId="$route.params.id" :mediaTitle="details.title"/>
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
            <div v-if="details.synopsis">
              <v-divider class="my-4"></v-divider>
              <p  class="font-italic">{{ details.synopsis }}</p>
            </div>
            <v-divider class="my-4"></v-divider>
            <v-list>
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
        <v-row>
          <v-col cols="12">
            <v-divider class="my-4"></v-divider>
            <comments-section :mediaType="mediaType" :mediaId="$route.params.id"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import {useMediaStore} from "@/store/mediaStore.js";
import MediaStatus from "@/components/MediaStatus.vue";
import CommentsSection from "@/components/CommentsSection.vue";
import {mapState, mapActions} from "pinia";
import {useUserStore} from '@/store/userStore.js';

export default {
  name: "BaseDetails",
  components: {
    MediaStatus,
    CommentsSection,
  },
  directives: {
    tooltip: {
      mounted(el, binding) {
        const tooltip = document.createElement('div');

        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = '#333';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.display = 'none';
        tooltip.textContent = binding.value;

        document.body.appendChild(tooltip);

        el.addEventListener('mouseenter', () => {
          tooltip.style.display = 'block';
        });

        el.addEventListener('mousemove', (event) => {
          const mouseX = event.pageX;
          const mouseY = event.pageY;

          tooltip.style.left = `${mouseX + 15}px`;
          tooltip.style.top = `${mouseY - tooltip.offsetHeight - 10}px`;
        });

        el.addEventListener('mouseleave', () => {
          tooltip.style.display = 'none';
        });

        el.tooltip = tooltip;
      },
      unmounted(el) {
        if (el.tooltip) {
          document.body.removeChild(el.tooltip);
        }
      }
    }
  },
  data() {
    return {
      ratingLength: 10,
    };
  },
  props: {
    mediaType: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(useMediaStore, {
      mediaArray: 'mediaArray',
      currentMedia: 'currentMedia',
      averageRating: 'averageRating',
      ratingCount: 'ratingCount',
      userRating: 'userRating',
      details() {
        return this.currentMedia || this.mediaArray.find(media => media.mal_id === +this.$route.params.id);
      }
    }),
    ...mapState(useUserStore, ['userId']),
  },
  methods: {
    ...mapActions(useMediaStore, ['fetchSingleMedia', 'scrollToTop', 'resetSingleMedia', 'fetchMediaRatings', 'updateMediaRating']),

    handleRatingUpdate(newRating) {
      this.updateMediaRating(this.$route.params.id, newRating);
    },
  },
  watch: {
    '$route.params.id': {
      async handler(newId) {
        this.scrollToTop();
        this.resetSingleMedia();

        if (!this.details) {
          try {
            await this.fetchSingleMedia(this.mediaType, +newId);
          } catch (error) {
            if (error.response) {
              this.$router.push({name: 'not-found'});
            }
          }
        }

        await this.fetchMediaRatings(newId);
      },
      immediate: true,
    }
  }
};
</script>

<style scoped>
.trailer {
  aspect-ratio: 16 / 9;
  border: none;
}
</style>