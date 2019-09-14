<template>
  <v-card>
    <v-card-title>{{ user.username }}</v-card-title>
  </v-card>
</template>

<script>
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
  }
};
</script>
