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

      <v-toolbar-title>
        <router-link :to="{name: 'Home'}" color="#ff">{{ title }}</router-link>
      </v-toolbar-title>
      <div class="flex-grow-1" />
      <v-btn color="accent" :to="{ name: 'Login' }" class="mx-4">
        <v-icon center>lock_open</v-icon>&nbsp;&nbsp;Log In
      </v-btn>
      <v-btn v-for="item in appBarItems" :key="item.title" icon :to="item.path">
        <v-icon :style="item.style">{{ item.icon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="10">
            <transition name="fade" mode="out-in">
              <router-view />
            </transition>
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
import firebase from "firebase";
import { mapActions } from "vuex";

export default {
  name: "App",
  data: () => ({
    primaryDrawer: {
      model: null,
      clipped: true,
      floating: false,
      mini: true
    },
    footer: {
      inset: true
    },
    appBarItems: [
      {
        title: "Profile",
        path: "/profile",
        icon: "account_circle",
        style: "font-size: 22pt"
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
    primary: "primary",
    accent: "accent",
    colors: ["primary", "accent", "warning lighten-2", "teal", "orange"]
  }),
  computed: {
    title() {
      return this.$store.state.title;
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("I'm in here", user);
      if (user) {
        this.setUserAction(user.uid);
        const docRef = firebase
          .firestore()
          .collection("users")
          .doc(user.uid);
        docRef
          .get()
          .then(doc => {
            if (!doc.exists) {
              throw new Error("Could not retrieve user information");
            } else {
              this.setUserDataAction(doc.data());
            }
          })
          .catch(err => {
            console.log("Error getting document", err);
          });
      } else {
        this.unSetUserAction();
        // No user is signed in.
      }
    });
  },
  methods: {
    ...mapActions(["setUserAction", "unSetUserAction", "setUserDataAction"])
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

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.v-toolbar__title a {
  text-decoration: none !important;
  color: #fff !important;
  font-size: 18pt !important;
  font-weight: 700 !important;
}
</style>
