<template>
  <div>
    <v-btn @click="decrement">-</v-btn>
    <span class="px-3">{{ modelValue }}</span>
    <v-btn @click="increment">+</v-btn>
  </div>
</template>

<script>
export default {
  name: "CounterComponent",
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    increment() {
      this.$emit('update:modelValue', this.modelValue + 1);
    },
    decrement() {
      this.$emit('update:modelValue', this.modelValue - 1);
    }
  },
};
</script>

<style scoped>
</style>