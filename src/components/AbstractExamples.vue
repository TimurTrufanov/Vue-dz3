<template>
  <div>
    <h2>Counter</h2>
    <counter-component v-model="value" />
    <p>value is {{ value }}</p>
    <v-divider class="my-4"></v-divider>
    <h2>Toggle</h2>
    <toggle-component v-model="toggleValue" />
    <p>Current State: {{ toggleValue ? 'Enabled' : 'Disabled' }}</p>
    <v-divider class="my-4"></v-divider>
    <h2>Dynamic classes</h2>
    <dynamic-class />
    <v-divider class="my-4"></v-divider>
    <h2>Custom select</h2>
    <custom-select :options="['Option 1', 'Option 2', 'Option 3']" v-model="selectedOption" />
    <p>Selected: {{ selectedOption }}</p>
  </div>
</template>

<script>
import CounterComponent from "@/components/useless/CounterComponent.vue";
import ToggleComponent from "@/components/useless/ToggleComponent.vue";
import DynamicClass from "@/components/useless/DynamicClass.vue";
import CustomSelect from "@/components/useless/CustomSelect.vue";
export default {
  name: "AbstractExamples",
  components: {
    CounterComponent,
    ToggleComponent,
    DynamicClass,
    CustomSelect
  },
  data() {
    return {
      value: 0,
      toggleValue: false,
      selectedOption: '',
    }
  }
}
</script>

<style scoped>

</style>