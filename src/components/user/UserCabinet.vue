<template>
  <div>
    <div class="progress-container" v-if="isLoading">
      <v-progress-circular indeterminate :size="128" :width="12"></v-progress-circular>
    </div>
    <div v-else>
      <h2>User cabinet</h2>
      <p>User ID: {{ id }}</p>
    </div>
  </div>
</template>

<script>
import {auth} from "@/main.js";
import {onAuthStateChanged} from "firebase/auth";

export default {
  name: "UserCabinet",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    currentUserId() {
      return this.$route.params.id;
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.checkAccess(user.uid);
      } else {
        this.redirectToNotFound();
      }
    });
  },
  methods: {
    checkAccess(userId) {
      if (userId !== this.currentUserId) {
        this.redirectToNotFound();
      } else {
        this.isLoading = false;
      }
    },
    redirectToNotFound() {
      this.$router.push({name: 'not-found'});
    }
  }
}
</script>

<style scoped>
.progress-container {
  display: flex;
  justify-content: center;
}
</style>