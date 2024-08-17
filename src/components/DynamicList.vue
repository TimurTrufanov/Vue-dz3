<template>
  <div class="my-4">
    <v-btn @click="generateItems" class="mb-2">Generate new list</v-btn>
    <v-list>
      <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :style="item.style">
        {{ item.text }}
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "DynamicList",
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.generateItems();
  },
  methods: {
    generateItems() {
      this.items = [];
      const itemCount = 10;

      for (let i = 0; i < itemCount; i++) {
        const randomColor = this.getRandomColor();
        const randomFontSize = this.getRandomFontSize();

        this.items.push({
          text: `${i + 1} element`,
          style: {
            backgroundColor: randomColor,
            fontSize: randomFontSize,
          },
        });
      }
    },
    getRandomColor() {
      const symbols = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += symbols[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    getRandomFontSize() {
      const minSize = 14;
      const maxSize = 30;
      return `${Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize}px`;
    },
  },
}
</script>

<style scoped>

</style>