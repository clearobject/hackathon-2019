<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex md12>
        <v-text-field v-model="username" />
        <v-text-field v-model="password" />
        <v-btn
          text
          @click="login()"
        >
          Login
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase';

export default {
	data: () => ({
		username: '',
		password: '',
	}),
	methods: {
		login() {
			console.log(this.username, this.password);
			firebase.auth().createUserWithEmailAndPassword(this.username, this.password).then(
				(user) => {
					console.log(user);
					console.log('Account has been created!!');
				}
			).catch(
				(error) => {
					console.log('Error encoutered', error);
				}
			);
		},
	},
};
</script>
