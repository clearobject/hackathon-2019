<template>
  <div v-if="isLoggedIn">
    I'm logged in
  </div>
  <v-layout
    v-else
    column
    justify-center
  >
    <v-flex>
      <div class="display-3">
        Please login
      </div>
    </v-flex>
    <v-flex>
      <v-btn @click="redirectToLogin">
        Go To Login
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import router from '@/router/index.js';
import { mapGetters } from 'vuex';
export default {
	name: 'Home',
	computed: mapGetters(['isLoggedIn']),
	methods: {
		redirectToLogin() {
			router.push('Signin');
		},
	},
};
</script>
