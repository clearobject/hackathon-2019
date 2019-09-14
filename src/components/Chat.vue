<template>
  <div class="message container">
    <h2 class="text-primary text-center">{{ title }}</h2>
    <v-card>
      <div class="ma-10">
        <p v-if="messages.length == 0">There seems to be nothing here!</p>
        <div class="messages" v-chat-scroll="{always: true, smooth: true}">
          <div v-for="message in messages" :key="message.id">
            <span class="text-info">[{{ message.name }}]:</span>
            <span>{{message.message}}</span>
            <span class="text-secondary time">{{message.timestamp}}</span>
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
  props: ["name"],
  components: {
    CreateMessage
  },
  data() {
    return {
      messages: []
    };
  },
  created() {
    let ref = fb.collection("messages").orderBy("timestamp");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: moment(doc.data().timestamp).format("LTS")
          });
        }
      });
    });
  },
  computed: {
    title() {
      return this.$store.state.title;
    }
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