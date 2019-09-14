<template>
  <v-container fluid>
    <v-avatar :color="color" :tile="true" :size="256">
      <img v-bind:src="'https://api.adorable.io/avatars/285/' + uid + '.png'" alt="avatar" />
    </v-avatar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  data: () => ({
    uid: ""
  }),
  computed() {
    this.uid = mapGetters.getCurrentUser().uid;
  }
};
</script>
