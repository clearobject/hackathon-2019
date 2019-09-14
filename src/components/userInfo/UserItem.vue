<template>
  <v-card>
    <v-card-title>{{ user.username }}</v-card-title>
    <v-card-actions>
      <v-btn @click="startChat">Start chat</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import router from "@/router/index.js";
import firebase from "firebase";

export default {
  name: "UserItem",
  props: {
    user: {
      type: Object,
      default() {
        return { username: "hello", uid: 1234 };
      },
      name: "user"
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapGetters(["getUserData"]),
    startChat() {
      const userOneRef = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const userTwoRef = firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid);
      const chatRoomRef = firebase
        .firestore()
        .collection("chatrooms")
        .doc();
      chatRoomRef.set({
        users: {
          user_1: userOneRef,
          user_2: userTwoRef
        }
      });
      router.push({ name: "Chat", params: { chatRoomId: chatRoomRef.id } });
    }
  }
};
</script>
