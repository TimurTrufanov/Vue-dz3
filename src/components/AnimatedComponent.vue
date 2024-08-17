<template>
  <div>
    <v-btn @click="toggleStyles" class="mb-2">Start animation</v-btn>
    <div :class="['animated-component', { 'active': isActive }]"></div>
  </div>
</template>

<script>
export default {
  name: 'AnimatedComponent',
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleStyles() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
.animated-component {
  width: 100px;
  height: 100px;
  background-color: blue;
  position: relative;
  transition: all 0.5s ease-in-out;
}

.animated-component.active {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: yellow;
  transform: translateX(100px);
}
</style>