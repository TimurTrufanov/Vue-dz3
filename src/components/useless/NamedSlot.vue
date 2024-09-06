<template>
  <div>
    <h2>Named Slot</h2>
    <slots-component>
      <template v-slot:header>
        <h3>Custom Header Content</h3>
      </template>

      <template v-slot:content>
        <p>This is the custom content passed from the parent component.</p>
      </template>

      <template v-slot:footer>
        <v-btn color="primary" @click="submit">Custom Submit</v-btn>
        <v-btn color="secondary" @click="cancel">Cancel</v-btn>
      </template>
    </slots-component>
    <v-divider class="my-4"></v-divider>
    <h2>Default Slot</h2>
    <slots-component />
  </div>
</template>

<script>
import SlotsComponent from './SlotsComponent.vue';

export default {
  name: 'ParentComponent',
  components: {
    SlotsComponent,
  },
  methods: {
    submit() {
      alert('Submitted!');
    },
    cancel() {
      alert('Cancelled!');
    },
  },
};
</script>