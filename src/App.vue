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
        <v-app-bar-nav-icon />
        <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
        <div class="flex-grow-1" />
        <v-btn
          v-for="item in items"
          :key="item.title"
          icon
          :to="item.path"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-app-bar>

      <v-sheet
        class="overflow-y-auto"
      >
        <v-container class="my-5">
          <router-view />
        </v-container>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
export default {
	data: () => ({
		items: [
			{ title: 'Home', path: '/home', icon: 'home' },
			{ title: 'Sign Up', path: '/signup', icon: 'face' },
			{ title: 'Sign In', path: '/signin', icon: 'lock_open' },
		],
		elevateOnScroll: false,
		hideOnScroll: false,
		color: 'primary',
		colors: ['primary', 'accent', 'warning lighten-2', 'teal', 'orange'],
	}),
	computed: {
		appTitle() {
			return this.$store.state.appTitle;
		},
	},
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
