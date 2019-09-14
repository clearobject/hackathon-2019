<template>
  <div class="message container">
    <h2 class="text-primary text-center">{{ title }}</h2>
    <v-card>
      <div class="ma-10">
        <p v-if="messages.length == 0">There seems to be nothing here!</p>
        <div v-chat-scroll="{always: true, smooth: true}" class="messages">
          <div v-for="message in messages" :key="message.id">
            <span class="text-info">[{{ message.uid }}]:</span>
            <span>{{ message.message }}</span>
            <span class="text-secondary time">{{ message.timestamp }}</span>
          </div>
        </div>
      </div>
      <div class="card-action">
        <CreateMessage :name="name" />
      </div>
    </v-card>
  </div>
</template>

<script>
import CreateMessage from "@/components/CreateMessage";
import fb from "@/main";
import moment from "moment";

export default {
  name: "Chat",
  components: {
    CreateMessage
  },
  props: ["name"],
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
    const ref = fb.collection("messages").orderBy("timestamp");
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