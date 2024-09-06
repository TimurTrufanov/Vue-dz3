<template>
  <div>
    <v-card class="pa-4 mb-4">
      <v-row v-if="userId" align="start">
        <v-avatar class="ml-2 mt-2" size="40" v-if="userProfilePicture">
          <v-img :src="userProfilePicture" alt="User Avatar" />
        </v-avatar>
        <v-textarea
            auto-grow
            append-inner-icon="mdi-comment"
            v-model="newComment"
            label="Write a comment"
            class="ml-4"
            rows="1"
            @click:append-inner="addComment"
        ></v-textarea>
      </v-row>
      <v-alert v-else type="info" text="You need to be logged in to comment!"></v-alert>
    </v-card>
    <v-card v-for="comment in comments" :key="comment.id" class="mb-4">
      <v-row class="pa-2">
        <v-col class="d-flex justify-space-between">
          <div class="d-flex">
            <v-avatar class="mx-2" size="40" v-if="comment.userProfilePicture">
              <v-img :src="comment.userProfilePicture" alt="User Avatar" />
            </v-avatar>
            <div>
              <strong>{{ comment.username }}</strong>
              <span class="text-muted ml-2">{{ formatDate(comment.createdAt) }}</span>
              <p>{{ comment.text }}</p>
              <v-btn
                  :disabled="!userId"
                  variant="text"
                  :color="comment.likes.includes(userId) ? 'success' : ''"
                  @click="likeComment(comment.id)"
              >
                <v-icon size="small" class="mr-1">mdi-thumb-up</v-icon>
                {{ comment.likes ? comment.likes.length : 0 }}
              </v-btn>
            </div>
          </div>
          <v-btn
              icon="mdi-delete"
              variant="text"
              v-if="userId === comment.userId || isAdmin"
              @click="deleteComment(comment.id)"
          ></v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from "@/store/userStore";
import { db } from "@/main.js";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { format } from 'date-fns';

const props = defineProps({
  mediaId: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
  },
});

const userStore = useUserStore();

const comments = ref([]);
const newComment = ref("");

const userId = computed(() => userStore.userId);
const profilePictureUrl = computed(() => userStore.profilePictureUrl);
const isAdmin = computed(() => userStore.isAdmin);
const userProfilePicture = computed(() => profilePictureUrl.value);

const getCommentsCollection = () => {
  return collection(db, "comments", `${props.mediaType}_${props.mediaId}`, "commentItems");
};

const fetchComments = async () => {
  const commentsCollection = getCommentsCollection();
  onSnapshot(commentsCollection, async (snapshot) => {
    comments.value = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();
          const userProfileInfo = await userStore.getUserProfileInfo(data.userId);
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
            username: userProfileInfo.username,
            userProfilePicture: userProfileInfo.profilePictureUrl,
          };
        })
    ).then(comments => comments.sort((a, b) => b.createdAt - a.createdAt));
  });
};

const formatDate = (date) => {
  return format(new Date(date), 'dd MMM yyyy, HH:mm');
};

const addComment = async () => {
  if (newComment.value.trim()) {
    const comment = {
      text: newComment.value,
      userId: userId.value,
      createdAt: new Date(),
      likes: [],
    };
    const commentsCollection = getCommentsCollection();
    await addDoc(commentsCollection, comment);
    newComment.value = "";
  }
};

const deleteComment = async (commentId) => {
  const commentDoc = doc(db, "comments", `${props.mediaType}_${props.mediaId}`, "commentItems", commentId);
  await deleteDoc(commentDoc);
};

const likeComment = async (commentId) => {
  const commentDoc = doc(db, "comments", `${props.mediaType}_${props.mediaId}`, "commentItems", commentId);
  const comment = comments.value.find(c => c.id === commentId);
  if (!comment.likes.includes(userId.value)) {
    comment.likes.push(userId.value);
  } else {
    comment.likes = comment.likes.filter(id => id !== userId.value);
  }
  await updateDoc(commentDoc, { likes: comment.likes });
};

onMounted(async () => {
  await fetchComments();
});
</script>