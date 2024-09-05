<template>
  <v-card class="mt-4">
    <v-card-title>Update Status</v-card-title>
    <v-card-text>
      <v-select
          clearable
          outlined
          v-model="localSelectedStatus"
          :items="statusList"
          label="Select Status"
          :disabled="!userId"
      ></v-select>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="updateStatusHandler" :disabled="!userId">Update</v-btn>
    </v-card-actions>
    <v-alert type="info" v-if="!userId">Please log in to update your status.</v-alert>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useStatusStore } from '@/store/statusStore';
import { useUserStore } from '@/store/userStore';

export default {
  name: 'MediaStatus',
  props: {
    mediaType: {
      type: String,
      required: true,
    },
    mediaId: {
      type: String,
      required: true,
    },
    mediaTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localSelectedStatus: null,
    };
  },
  computed: {
    ...mapState(useStatusStore, ['statusList', 'selectedStatus']),
    ...mapState(useUserStore, ['userId']),
  },
  methods: {
    ...mapActions(useStatusStore, ['loadStatusList', 'loadUserStatus', 'updateStatus']),

    async fetchStatuses() {
      await this.loadStatusList(this.mediaType);
      await this.loadUserStatus(this.mediaType, this.mediaId);
    },

    async updateStatusHandler() {
      await this.updateStatus(this.mediaType, this.mediaId, this.mediaTitle, this.localSelectedStatus);
    }
  },
  async created() {
    if (this.userId) {
      await this.fetchStatuses();
      this.localSelectedStatus = this.selectedStatus;
    } else {
      this.localSelectedStatus = null;
    }
  },
};
</script>