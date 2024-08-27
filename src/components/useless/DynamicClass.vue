<template>
  <div>
    <v-text-field v-model="inputText" placeholder="Type 'red', 'green' or 'blue'" ></v-text-field>
    <span :class="dynamicClass" class="box">
      This text changes color based on your input.
    </span>
  </div>
</template>

<script>
export default {
  name: "DynamicClass",
  data() {
    return {
      inputText: ''
    };
  },
  computed: {
    dynamicClass() {
      return {
        red: this.inputText === 'red',
        green: this.inputText === 'green',
        blue: this.inputText === 'blue',
      };
    }
  }
};
</script>

<style scoped>
.red {
  color: red;
}

.green {
  color: green;
}

.blue {
  color: blue;
}
</style>