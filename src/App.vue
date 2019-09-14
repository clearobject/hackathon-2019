<template>
  <v-app>
    <v-app-bar app>
      <v-layout row>
        <v-toolbar-title class="headline text-uppercase">
          <span>Beacon</span>
        </v-toolbar-title>
        <div class="flex-grow-1" />
        <v-toolbar-items>
          <v-btn
            text
            @click="router.push('login')"
          >
            Login
          </v-btn>
        </v-toolbar-items>
        <v-spacer />
      </v-layout>
    </v-app-bar>

    <v-content>
      <!-- TODO: Remove this login and replace with routerview -->
      <Login />
      <CreateAccount />
    </v-content>
  </v-app>
</template>

<script>
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

export default {
	name: 'App',
	components: {
		Login,
		CreateAccount,
	},
};
</script>
