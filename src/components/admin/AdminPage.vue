<template>
  <v-container>
    <h2 class="text-center text-xl-h3 mb-6">Admin Page</h2>

    <v-form @submit.prevent="addListItem('anime')">
      <v-text-field
          v-model="animeListItem"
          label="Add anime status"
          outlined
          clearable
      ></v-text-field>
      <v-btn type="submit" color="primary">Add Anime List Item</v-btn>
    </v-form>

    <v-form @submit.prevent="addListItem('manga')" class="mt-5">
      <v-text-field
          v-model="mangaListItem"
          label="Add manga status"
          outlined
          clearable
      ></v-text-field>
      <v-btn type="submit" color="primary">Add Manga List Item</v-btn>
    </v-form>

    <v-divider class="my-5"></v-divider>

    <h2>Anime Status</h2>
    <v-data-table
        :headers="tableHeaders"
        :items="animeStatus"
        class="mt-3"
        :items-per-page="6"
        item-value="name"
    ></v-data-table>

    <v-divider class="my-5"></v-divider>

    <h2>Manga Status</h2>
    <v-data-table
        :headers="tableHeaders"
        :items="mangaStatus"
        class="mt-3"
        :items-per-page="6"
        item-value="name"
    ></v-data-table>
  </v-container>
</template>

<script>
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/main.js";

export default {
  name: "AdminPage",
  data() {
    return {
      animeListItem: '',
      mangaListItem: '',
      animeStatus: [],
      mangaStatus: [],
      tableHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'Created At', value: 'createdAt' }
      ]
    };
  },
  methods: {
    async addListItem(listType) {
      const listItem = listType === 'anime' ? this.animeListItem : this.mangaListItem;

      if (listItem.trim() === '') {
        return;
      }

      try {
        const collectionName = listType === 'anime' ? 'animeStatus' : 'mangaStatus';
        await addDoc(collection(db, collectionName), {
          name: listItem,
          createdAt: new Date()
        });

        if (listType === 'anime') {
          this.animeListItem = '';
          this.fetchAnimeStatus();
        } else {
          this.mangaListItem = '';
          this.fetchMangaStatus();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchAnimeStatus() {
      try {
        const q = query(collection(db, "animeStatus"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        this.animeStatus = querySnapshot.docs.map(doc => ({
          name: doc.data().name,
          createdAt: doc.data().createdAt.toDate().toLocaleString()
        }));
      } catch (error) {
        console.error(error);
      }
    },
    async fetchMangaStatus() {
      try {
        const q = query(collection(db, "mangaStatus"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        this.mangaStatus = querySnapshot.docs.map(doc => ({
          name: doc.data().name,
          createdAt: doc.data().createdAt.toDate().toLocaleString()
        }));
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {
    this.fetchAnimeStatus();
    this.fetchMangaStatus();
  }
}
</script>

<style scoped>

</style>