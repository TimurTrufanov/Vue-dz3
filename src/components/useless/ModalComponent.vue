<template>
  <div>
    <v-btn @click="dialog = true" color="primary">Open Modal</v-btn>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <slot name="header">
            <h3>Default modal header</h3>
          </slot>
        </v-card-title>

        <v-card-text>
          <slot name="content">
            <p>Default modal content</p>
          </slot>
        </v-card-text>

        <v-card-actions>
          <slot name="footer">
            <v-btn color="primary" @click="dialog = false">Close</v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalComponent',
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style scoped>

</style>