<template>
  <div class="custom-select">
    <select v-model="selectedValue" class="select-box">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  computed: {
    selectedValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
}
</script>

<style scoped>
.custom-select {
  width: 100%;
  max-width: 300px;
  margin: 20px 0;
}

.select-box {
  width: 100%;
  padding: 8px;
  border: 1px solid #999;
  border-radius: 4px;
}

.select-box:focus {
  border-color: #00f;
  outline: none;
}

.select-box option {
  color: #000;
}
</style>