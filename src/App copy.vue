<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
      flat
      collapse
    >
      <v-col style="text-align: center;">
        <v-btn v-for="item in sideBarItems" :key="item.title" icon :to="item.path">
          <v-icon :style="item.style">{{ item.icon }}</v-icon>
        </v-btn>
      </v-col>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="primaryDrawer.clipped" app color="primary">
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <div class="flex-grow-1" />
      <v-btn color="accent">
        <v-icon center path="/register">{{ lock_open }}</v-icon>Register
      </v-btn>
      <v-btn color="accent">
        <v-icon center path="/login">{{ lock_open }}</v-icon>Log In
      </v-btn>
      <v-btn v-for="item in appBarItems" :key="item.title" icon :to="item.path">
        <v-icon :style="item.style">{{ item.icon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="10">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer :inset="footer.inset" app>
      <span class="px-4">&copy; ClearObject {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    primaryDrawer: {
      model: null,
      clipped: true,
      floating: false,
      mini: true
    },
    footer: {
      inset: false
    },
    appBarItems: [
      {
        title: "Profile",
        path: "/profile",
        icon: "account_circle",
        style: "font-size: 22pt"
      },
      {
        title: "Settings",
        path: "/settings",
        icon: "more_vert",
        style: "font-size: 22pt;"
      }
    ],
    sideBarItems: [
      {
        title: "Chat",
        path: "/chat",
        icon: "chat",
        style: "font-size: 26pt;"
      }
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
