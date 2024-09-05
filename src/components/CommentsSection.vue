<template>
  <div>
    <v-card class="pa-4 mb-4">
      <v-row v-if="userId" align="start">
        <v-avatar class="ml-2 mt-2" size="40" v-if="userProfilePicture">
          <v-img :src="userProfilePicture" alt="User Avatar"/>
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
              <v-img :src="comment.userProfilePicture" alt="User Avatar"/>
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
                <v-icon size="small" class="mr-1"  >mdi-thumb-up</v-icon>
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

<script>
import {mapActions, mapState} from 'pinia';
import {useUserStore} from "@/store/userStore";
import {db} from "@/main.js";
import {collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc} from "firebase/firestore";
import {format} from 'date-fns';

export default {
  name: "CommentsSection",
  props: {
    mediaId: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      newComment: "",
    };
  },
  computed: {
    ...mapState(useUserStore, ['userId', 'profilePictureUrl', 'username', 'isAdmin']),
    userProfilePicture() {
      return this.profilePictureUrl;
    },
  },
  methods: {
    ...mapActions(useUserStore, ['getUserProfilePicture']),
    getCommentsCollection() {
      return collection(db, "comments", `${this.mediaType}_${this.mediaId}`, "commentItems");
    },
    async fetchComments() {
      const commentsCollection = this.getCommentsCollection();
      onSnapshot(commentsCollection, async (snapshot) => {
        this.comments = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
                userProfilePicture: await this.getUserProfilePicture(data.userId),
              };
            })
        ).then(comments => comments.sort((a, b) => b.createdAt - a.createdAt));
      });
    },
    formatDate(date) {
      return format(new Date(date), 'dd MMM yyyy, HH:mm');
    },
    async addComment() {
      if (this.newComment.trim()) {
        const comment = {
          text: this.newComment,
          userId: this.userId,
          username: this.username,
          userProfilePicture: this.userProfilePicture,
          createdAt: new Date(),
          likes: [],
        };
        const commentsCollection = this.getCommentsCollection();
        await addDoc(commentsCollection, comment);
        this.newComment = "";
      }
    },
    async deleteComment(commentId) {
      const commentDoc = doc(db, "comments", `${this.mediaType}_${this.mediaId}`, "commentItems", commentId);
      await deleteDoc(commentDoc);
    },
    async likeComment(commentId) {
      const commentDoc = doc(db, "comments", `${this.mediaType}_${this.mediaId}`, "commentItems", commentId);
      const comment = this.comments.find(c => c.id === commentId);
      if (!comment.likes.includes(this.userId)) {
        comment.likes.push(this.userId);
      } else {
        comment.likes = comment.likes.filter(id => id !== this.userId);
      }
      await updateDoc(commentDoc, {likes: comment.likes});
    },
  },
  async mounted() {
    await this.fetchComments();
  },
};
</script>