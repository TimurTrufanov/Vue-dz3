<template>
  <v-card>
    <v-card-title>
      <slot name="header">
        Default Header
      </slot>
    </v-card-title>

    <v-card-text>
      <slot name="content">
        Default Content
      </slot>
    </v-card-text>

    <v-card-actions>
      <slot name="footer">
        <v-btn color="primary" @click="printDefault">Default Action</v-btn>
      </slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SlotsComponent',
  methods: {
    printDefault() {
      alert('Default Text');
    },
  }
};
</script>

<style scoped>

</style>