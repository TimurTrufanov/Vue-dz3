<template>
  <div>
    <v-btn @click="saveClickTime" class="mb-2">Click here</v-btn>
    <v-list v-if="clickTimes.length > 0">
      <v-list-item v-for="(time, index) in clickTimes" :key="index">Current time: {{ time }}</v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "CurrentTime",
  data() {
    return {
      clickTimes: []
    };
  },
  methods: {
    saveClickTime() {
      const currentTime = new Date().toLocaleTimeString();
      this.clickTimes.push(currentTime);
    }
  }
}
</script>

<style scoped>

</style>