<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
            label="Number of rows"
            v-model="rows"
            type="number"
            :rules="[rowRules]"
            :min="minRows"
            :max="maxRows"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            label="Number of columns"
            v-model="columns"
            type="number"
            :rules="[columnRules]"
            :min="minColumns"
            :max="maxColumns"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-table v-if="validTable">
      <thead>
      <tr>
        <th v-for="col in +columns" :key="col">Col {{ col }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in +rows" :key="row">
        <td v-for="col in +columns" :key="`${row}-${col}`">
          {{ row }} - {{ col }}
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
export default {
  name: "DynamicTable",
  data() {
    return {
      rows: 2,
      columns: 2,
      minRows: 1,
      maxRows: 100,
      minColumns: 1,
      maxColumns: 20
    };
  },
  computed: {
    validTable() {
      return this.rows >= this.minRows && this.rows <= this.maxRows && this.columns >= this.minColumns && this.columns <= this.maxColumns;
    },
    rowRules() {
      return (v) => {
        if (v < this.minRows) return `Min number of rows is ${this.minRows}`;
        if (v > this.maxRows) return `Max number of rows is ${this.maxRows}`;
        return true;
      };
    },
    columnRules() {
      return (v) => {
        if (v < this.minColumns) return `Min number of columns is ${this.minColumns}`;
        if (v > this.maxColumns) return `Max number of columns is ${this.maxColumns}`;
        return true;
      };
    }
  }
}
</script>

<style scoped>

</style>