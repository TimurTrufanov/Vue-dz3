<template>
  <v-card v-if="hasStatuses">
    <v-card-title>User Statuses</v-card-title>
    <v-tabs v-model="activeTab">
      <v-tab v-for="(type, index) in mediaTypes" :key="type" @click="saveActiveTab(index)">
        {{ type }}
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="activeTab">
      <v-tabs-window-item v-for="type in mediaTypes" :key="type">
        <template v-if="localStatusList[type] && groupedStatuses[type]">
          <v-list v-for="status in sortedStatusList(type)" :key="status" class="px-4">
            <v-list-item-title>{{ status }}:</v-list-item-title>
            <v-list v-if="groupedStatuses[type][status] && groupedStatuses[type][status].length > 0">
              <v-list-item
                  v-for="(item, index) in groupedStatuses[type][status]"
                  :key="item.mediaId"
                  @click="goToMediaPage(item.mediaType, item.mediaId)"
              >
                <v-list-item-subtitle class="d-flex justify-space-between">
                  {{ index + 1 }}. {{ item.mediaTitle }}
                  <span v-if="item.userRating">Rating: {{ item.userRating }}</span>
                  <span v-else>not rated</span>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <v-list v-else>
              <v-list-item-subtitle>list is empty</v-list-item-subtitle>
            </v-list>
          </v-list>
        </template>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useStatusStore } from '@/store/statusStore';
import { useUserStore } from '@/store/userStore';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/main.js";

export default {
  name: "UserStatuses",
  data() {
    return {
      activeTab: localStorage.getItem('activeTab') ? +localStorage.getItem('activeTab') : 0,
      groupedStatuses: {},
      localStatusList: {
        anime: [],
        manga: [],
      },
    };
  },
  computed: {
    ...mapState(useStatusStore, ['mediaTypes', 'userStatuses', 'statusList']),
    ...mapState(useUserStore, ['userId']),

    hasStatuses() {
      return this.userStatuses && this.userStatuses.length > 0;
    }
  },
  methods: {
    ...mapActions(useStatusStore, ['loadUserStatuses', 'loadStatusList']),
    async loadStatuses() {
      for (let type of this.mediaTypes) {
        await this.loadStatusList(type);
        this.localStatusList[type] = [...this.statusList];
      }
    },
    async groupStatuses() {
      this.groupedStatuses = {};

      const ratings = await this.fetchAllUserRatings();

      for (const type of this.mediaTypes) {
        this.groupedStatuses[type] = {};
        for (const status of this.getStatusListByType(type)) {
          this.groupedStatuses[type][status] = [];

          const mediaStatuses = this.userStatuses.filter(
              item => item.mediaType === type && item.status === status
          );

          for (const mediaStatus of mediaStatuses) {
            const userRating = ratings[mediaStatus.mediaId] || null;
            this.groupedStatuses[type][status].push({
              ...mediaStatus,
              userRating,
            });
          }

          this.groupedStatuses[type][status].sort((firstRating, secondRating) => {
            if (firstRating.userRating && secondRating.userRating) {
              return secondRating.userRating - firstRating.userRating;
            }
            if (firstRating.userRating && !secondRating.userRating) return -1;
            if (!firstRating.userRating && secondRating.userRating) return 1;
            return 0;
          });
        }
      }
    },
    async fetchAllUserRatings() {
      const userId = this.userId;
      if (!userId) return {};

      const ratings = {};
      const q = query(collection(db, 'mediaRatings'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        const data = doc.data();
        ratings[data.mediaId] = data.rating;
      });

      return ratings;
    },
    sortedStatusList(type) {
      return this.getStatusListByType(type).sort((firstStatus, secondStatus) => {
        const firstStatusEmpty = !this.groupedStatuses[type][firstStatus] ||
            this.groupedStatuses[type][firstStatus].length === 0;
        const secondStatusEmpty = !this.groupedStatuses[type][secondStatus] ||
            this.groupedStatuses[type][secondStatus].length === 0;
        if (firstStatusEmpty && !secondStatusEmpty) return 1;
        if (!firstStatusEmpty && secondStatusEmpty) return -1;
        return 0;
      });
    },
    getStatusListByType(type) {
      return this.localStatusList[type] || [];
    },
    goToMediaPage(mediaType, mediaId) {
      this.$router.push({name: `${mediaType}-details`, params: {id: mediaId}});
    },
    saveActiveTab(index) {
      this.activeTab = index;
      localStorage.setItem('activeTab', index);
    },
  },
  async created() {
    await this.loadUserStatuses(this.userId);
    await this.loadStatuses();
    await this.groupStatuses();
  },
}
</script>