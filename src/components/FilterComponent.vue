<template>
  <v-select
      label="Filtered by"
      :items="filterOptions"
      item-title="label"
      item-value="value"
      variant="underlined"
      v-model="selectedFilter"
  ></v-select>
</template>

<script>
export default {
  name: "FilterComponent",
  data() {
    return {
      selectedFilter: ''
    }
  },
  computed: {
    filterOptions() {
      return [
        {label: 'Score', value: ''},
        {label: 'Currently Airing', value: 'airing'},
        {label: 'Upcoming', value: 'upcoming'},
        {label: 'Popularity', value: 'bypopularity'},
        {label: 'Most favorite', value: 'favorite'},
      ];
    }
  },
  watch: {
    selectedFilter(newFilter) {
      this.updateFilter(newFilter);
    }
  },
  methods: {
    updateFilter(selectedFilter) {
      this.$emit('filter-changed', selectedFilter);
    }
  }
}
</script>

<style scoped>

</style>