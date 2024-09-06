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
    <v-divider class="my-4"></v-divider>
    <h2>Slots</h2>
    <named-slot/>
    <h2>Modal component</h2>
    <modal-component>
      <template v-slot:content>
        <p>Custom modal content</p>
      </template>
    </modal-component>
    <v-divider class="my-4"></v-divider>
    <h2>Mixins</h2>
    <p>Check the console for lifecycle hooks</p>
    <v-btn @click="globalMethod">Click and check console</v-btn>
    <v-divider class="my-4"></v-divider>
    <directives-component/>
  </div>
</template>

<script>
import CounterComponent from "@/components/useless/CounterComponent.vue";
import ToggleComponent from "@/components/useless/ToggleComponent.vue";
import DynamicClass from "@/components/useless/DynamicClass.vue";
import CustomSelect from "@/components/useless/CustomSelect.vue";
import DirectivesComponent from "@/components/useless/DirectivesComponent.vue";
import NamedSlot from "@/components/useless/NamedSlot.vue";
import ModalComponent from "@/components/useless/ModalComponent.vue";
import lifecycleLoggerMixin from "@/mixins/lifecycleLoggerMixin.js";
export default {
  name: "AbstractExamples",
  mixins: [lifecycleLoggerMixin],
  components: {
    NamedSlot,
    DirectivesComponent,
    CounterComponent,
    ToggleComponent,
    DynamicClass,
    CustomSelect,
    ModalComponent,
  },
  data() {
    return {
      value: 0,
      toggleValue: false,
      selectedOption: '',
    }
  },
}
</script>

<style scoped>

</style>