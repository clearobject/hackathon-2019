<template>
  <v-col>
    <v-card style="width: 66%; margin: auto;" color="accent" dark>
      <v-card-text class="white--text">
        <div class="headline mb-2">{{ user.username }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="startChat">START CHAT</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
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
      console.log(this.user.uid, firebase.auth().currentUser.uid);
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
      const chatRoomData = {
        users: {},
        userRefs: {}
      };
      chatRoomData["users"][userOneRef.id] = true;
      chatRoomData["users"][userTwoRef.id] = true;
      chatRoomData["userRefs"][userOneRef.id] = userOneRef;
      chatRoomData["userRefs"][userTwoRef.id] = userTwoRef;
      chatRoomRef.set(chatRoomData);
      router.push({ name: "Chat", params: { chatRoomId: chatRoomRef.id } });
    }
  }
};
</script>
