<template>
  <div v-if="isLoggedIn()">
    <v-layout column wrap>
      <UserList />
    </v-layout>
  </div>
  <v-layout v-else column justify-center>
    <v-flex>
      <div class="display-3 my-6" style="text-align: center;">Please login</div>
    </v-flex>
    <v-flex style="margin: auto;">
      <v-btn
        @click="redirectToLogin"
        color="accent"
        style="font-size: 16pt; text-align: center;"
      >Go To Login</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import router from "@/router/index.js";
import { mapGetters } from "vuex";

import UserList from "@/components/userInfo/UserList";

export default {
  name: "Home",
  components: {
    UserList
  },
  methods: {
    ...mapGetters(["isLoggedIn"]),
    redirectToLogin() {
      router.push("Login");
    }
  }
};
</script>
