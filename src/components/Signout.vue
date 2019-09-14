<template>
  <v-btn @click="logout">Logout</v-btn>
</template>
<script>
import firebase from "firebase";

export default {
  name: "Signout",
  data: () => ({}),
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
