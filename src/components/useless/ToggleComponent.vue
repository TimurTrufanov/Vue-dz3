<template>
  <v-btn @click="toggle">
    {{ modelValue ? 'On' : 'Off' }}
  </v-btn>
</template>

<script>
export default {
  name: "ToggleComponent",
  props: {
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue'],
  methods: {
    toggle() {
      this.$emit('update:modelValue', !this.modelValue);
    }
  }
};
</script>

<style scoped>

</style>