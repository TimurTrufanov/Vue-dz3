<template>
  <div>
    <v-btn class="ma-2" @click="currentMethod">Click here</v-btn>
    <v-btn class="ma-2" @click="toggleMethod">Toggle method</v-btn>
    <p>{{ message}}</p>
  </div>
</template>

<script>
export default {
  name: "ToggleMethods",
  data() {
    return {
      message: 'result',
      useFirstMethod: true,
    };
  },
  computed: {
    currentMethod() {
      return this.useFirstMethod ? this.firstMethod : this.secondMethod;
    },
  },
  methods: {
    firstMethod() {
      this.message = 'Message from first method';
    },
    secondMethod() {
      this.message = 'Message from second method';
    },
    toggleMethod() {
      this.useFirstMethod = !this.useFirstMethod;
    },
  },
}
</script>

<style scoped>

</style>