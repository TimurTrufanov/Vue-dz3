import { defineStore } from 'pinia';
import { collection, getDocs, doc, setDoc, query, where, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/main.js';
import { useUserStore } from '@/store/userStore';

export const useStatusStore = defineStore('statusStore', {
    state: () => ({
        statusList: [],
        selectedStatus: null,
        userStatuses: [],
        mediaTypes: [],
    }),
    actions: {
        async loadStatusList(mediaType) {
            const statusCollectionName = mediaType === 'anime' ? 'animeStatus' : 'mangaStatus';
            const statusQuery = query(collection(db, statusCollectionName), where('createdAt', '!=', null));
            const querySnapshot = await getDocs(statusQuery);

            this.statusList = querySnapshot.docs.map(doc => doc.data().name);
        },
        async loadUserStatus(mediaType, mediaId) {
            const userStore = useUserStore();
            const userStatusDocRef = doc(db, 'userStatuses', `${userStore.userId}_${mediaType}_${mediaId}`);
            const userStatusDoc = await getDoc(userStatusDocRef);

            if (userStatusDoc.exists()) {
                this.selectedStatus = userStatusDoc.data().status;
            } else {
                this.selectedStatus = null;
            }
        },
        async updateStatus(mediaType, mediaId, mediaTitle, status) {
            const userStore = useUserStore();
            const userStatusDocRef = doc(db, 'userStatuses', `${userStore.userId}_${mediaType}_${mediaId}`);
            const docData = {
                userId: userStore.userId,
                mediaType,
                mediaId,
                mediaTitle,
                status,
                updatedAt: serverTimestamp(),
            };

            const userStatusDoc = await getDoc(userStatusDocRef);
            if (userStatusDoc.exists()) {
                await updateDoc(userStatusDocRef, docData);
            } else {
                await setDoc(userStatusDocRef, docData);
            }
        },
        async loadUserStatuses(userId) {
            const q = query(collection(db, 'userStatuses'), where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            const statuses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.userStatuses = statuses;

            const uniqueMediaTypes = new Set(statuses.map(status => status.mediaType));
            this.mediaTypes = Array.from(uniqueMediaTypes);
        },
    },
});