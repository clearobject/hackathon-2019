<template>
  <v-app id="inspire">
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        dark
        :color="color"
        :elevate-on-scroll="elevateOnScroll"
        :hide-on-scroll="hideOnScroll"
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <div class="flex-grow-1" />
        <v-btn v-for="item in items" :key="item.title" icon :to="item.path">
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-app-bar>

      <v-sheet class="overflow-y-auto">
        <v-container fluid>
          <v-flex>
            <router-view />
          </v-flex>
        </v-container>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Home", path: "/home", icon: "home" },
      { title: "Sign Up", path: "/signup", icon: "face" },
      { title: "Sign In", path: "/signin", icon: "lock_open" },
      { title: "Settings", path: "/settings", icon: "more_vert" }
    ],
    elevateOnScroll: false,
    hideOnScroll: false,
    color: "primary",
    colors: ["primary", "accent", "warning lighten-2", "teal", "orange"]
  }),
  computed: {
    title() {
      return this.$store.state.title;
    }
  }
};
</script>

<style lang="css">
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900%7CMaterial+Icons");

::-webkit-scrollbar {
  display: none;
  color: #0000;
  background-color: #0000;
}
</style>
