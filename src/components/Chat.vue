<template>
  <div class="message container">
    <h2 class="text-primary text-center">{{ title }}</h2>
    <div class="ma-10">
      <v-col v-if="messages.length == 0">
        <v-card color="primary" dark>
          <v-card-text class="white--text">
            <div
              class="headline"
              style="font-weight: 700; text-align: center; font-size: 16pt"
            >This is the beginning of a new conversation. Start a chat!</div>
          </v-card-text>
        </v-card>
      </v-col>
      <div v-chat-scroll="{always: true, smooth: true}" class="messages">
        <div v-for="message in messages" :key="message.id">
          <v-col>
            <v-card color="accent" dark>
              <v-card-text class="white--text">
                <div
                  class="headline"
                  style="font-weight: 700; font-size: 14pt"
                >{{ message.username }}</div>
                <div style="font-weight: 500; font-size: 12pt">{{ message.message }}</div>
                <div
                  style="font-weight: 300; font-size: 10pt"
                  class="text-secondary time"
                >{{ message.timestamp }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </div>
      </div>
    </div>
    <div class="card-action">
      <CreateMessage :chat-room-id="chatRoomId" />
    </div>
  </div>
</template>

<script>
import CreateMessage from "@/components/CreateMessage";
import firebase from "firebase";
import moment from "moment";

export default {
  name: "Chat",
  components: {
    CreateMessage
  },
  props: {
    chatRoomId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      messages: []
    };
  },
  computed: {
    title() {
      return this.$store.state.title;
    }
  },
  created() {
    console.log(this.chatRoomId);
    const ref = firebase
      .firestore()
      .collection("chatrooms")
      .doc(this.chatRoomId)
      .collection("messages")
      .orderBy("timestamp");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          const doc = change.doc;
          this.messages.push({
            id: doc.id,
            uid: doc.data().uid,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: moment(doc.data().timestamp).format("LTS")
          });
        }
      });
    });
  }
};
</script>

<style>
.message h2 {
  font-size: 22pt;
}

.messages {
  overflow: auto;
}
</style>
