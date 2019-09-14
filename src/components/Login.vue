<template>
  <v-layout
    text-center
    wrap
    fill-height
  >
    <v-flex md12>
      <v-text-field
        v-model="email"
        :rules="[rules.required]"
        name="input-password"
        label="Email"
      />
      <v-text-field
        v-model="password"
        :append-icon="showPw ? 'visibility' : 'visibility_off'"
        :rules="[rules.required, rules.min]"
        :type="showPw ? 'text' : 'password'"
        name="input-password"
        label="Password"
        hint="At least 6 characters"
        @click:append="showPw = !showPw"
      />
      <div
        v-if="errorText != undefined"
        class="red--text"
      >
        {{ errorText }}
      </div>
      <v-btn
        text
        @click="login()"
      >
        Login
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase';

export default {
	data: () => ({
		email: '',
		password: '',
		rules: {
			required: (value) => !!value || 'Required.',
			min: (v) => v.length >= 6 || 'Min 6 characters',
			emailMatch: () => ('The email and password you entered don\'t match'),
		},
		showPw: false,
		errorText: '',
	}),
	methods: {
		login() {
			console.log(this.email, this.password);
			firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
				(result) => {
					console.log(result);
					console.log('Login successful');
				}
			).catch(
				(error) => {
					// TODO: Handle the errors smoothly
					console.log('Error encoutered', error);
					this.errorText = error.message;
				}
			);
		},
	},
};
</script>
