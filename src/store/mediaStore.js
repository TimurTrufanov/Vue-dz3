import {defineStore} from "pinia";
import axiosInstance from "@/services/axios.js";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "@/main.js";
import { useUserStore } from '@/store/userStore';

export const useMediaStore = defineStore('mediaStore', {
    state: () => ({
        currentPage: 1,
        totalPages: 1,
        mediaArray: [],
        currentSeasonArray: [],
        upcomingSeasonArray: [],
        limitPerPage: 24,
        filteredBy: "",
        currentMedia: null,
        averageRating: 0,
        ratingCount: 0,
        userRating: null,
    }),
    actions: {
        async fetchMedia(mediaType) {
            const sfw = await this.shouldIncludeSfw();
            try {
                const response = await axiosInstance.get(
                    `top/${mediaType}?filter=${this.filteredBy}&page=${this.currentPage}&limit=${this.limitPerPage}${sfw ? '&sfw' : ''}`
                );

                this.mediaArray = response.data.data;
                this.totalPages = response.data.pagination.last_visible_page;

                this.scrollToTop();
            } catch (error) {
                console.error(error);
            }
        },
        async fetchSingleMedia(mediaType, id) {
            try {
                const response = await axiosInstance.get(`${mediaType}/${id}`);
                this.currentMedia = response.data.data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        async fetchMainMedia(season) {
            const sfw = await this.shouldIncludeSfw();
            try {
                const response = await axiosInstance.get(
                    `seasons/${season}?limit=${this.limitPerPage}&page=${this.currentPage}${sfw ? '&sfw' : ''}`
                );

                if (season === 'now') {
                    this.currentSeasonArray = response.data.data;
                }
                if (season === 'upcoming') {
                    this.upcomingSeasonArray = response.data.data;
                }

                this.totalPages = response.data.pagination.last_visible_page;

                this.scrollToTop();
            } catch (error) {
                console.error(error);
            }
        },
        async fetchMediaSearch(mediaType, query) {
            const sfw = await this.shouldIncludeSfw();
            try {
                const response = await axiosInstance.get(
                    `${mediaType}?q=${query}&page=${this.currentPage}&limit=${this.limitPerPage}${sfw ? '&sfw' : ''}`
                );

                this.mediaArray = response.data.data;
                this.totalPages = response.data.pagination.last_visible_page;

                this.scrollToTop();
            } catch (error) {
                console.error(error);
            }
        },
        async fetchMediaRatings(mediaId) {
            const userStore = useUserStore();
            const q = query(collection(db, 'mediaRatings'), where('mediaId', '==', mediaId));
            const querySnapshot = await getDocs(q);

            const ratings = querySnapshot.docs.map(doc => doc.data().rating);
            if (ratings.length > 0) {
                const total = ratings.reduce((acc, curr) => acc + curr, 0);
                this.averageRating = (total / ratings.length).toFixed(1);
                this.ratingCount = ratings.length;
            } else {
                this.averageRating = 0;
                this.ratingCount = 0;
            }

            if (userStore.userId) {
                const userRatingDoc = querySnapshot.docs.find(doc => doc.data().userId === userStore.userId);
                if (userRatingDoc) {
                    this.userRating = userRatingDoc.data().rating;
                } else {
                    this.userRating = null;
                }
            }
        },
        async updateMediaRating(mediaId, newRating) {
            const userStore = useUserStore();
            if (!userStore.userId) return;

            this.userRating = newRating;

            const ratingDocRef = doc(db, 'mediaRatings', `${mediaId}_${userStore.userId}`);
            await setDoc(ratingDocRef, {
                mediaId: mediaId,
                userId: userStore.userId,
                rating: newRating
            });

            await this.fetchMediaRatings(mediaId);
        },
        shouldIncludeSfw() {
            const age = localStorage.getItem('userAge');
            return age ? age < 18 : true;
        },
        setFilter(newFilter) {
            this.filteredBy = newFilter;
        },
        setPage(page) {
            this.currentPage = page;
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        resetPage() {
            this.currentPage = 1;
        },
        resetSingleMedia() {
            this.currentMedia = null;
        },
    },
})
