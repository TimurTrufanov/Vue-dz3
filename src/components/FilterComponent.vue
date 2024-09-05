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
import {animeFilters, mangaFilters} from "@/constants/filters.js";
import {mapState} from "pinia";
import {useMediaStore} from "@/store/mediaStore.js";

export default {
  name: "FilterComponent",
  props: {
    mediaType: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(useMediaStore, ['filteredBy']),
    selectedFilter: {
      get() {
        return this.filteredBy;
      },
      set(value) {
        this.updateFilter(value);
      },
    },
    filterOptions() {
      return this.mediaType === 'anime' ? animeFilters : mangaFilters;
    }
  },
  methods: {
    updateFilter(selectedFilter) {
      this.$emit('filter-changed', selectedFilter);
    },
  },
}
</script>

<style scoped>

</style>