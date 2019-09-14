<template>
  <v-container fluid>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        class="text-xs-center"
        mt-5
      >
        <h1>Sign In</h1>
      </v-flex>
      <v-flex
        xs12
        sm6
        offset-sm3
        mt-3
      >
        <form>
          <v-layout column>
            <v-flex>
              <v-text-field
                v-model="email"
                name="email"
                label="Email"
                type="email"
                required
              />
            </v-flex>
            <v-flex>
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
            </v-flex>
            <v-flex
              class="text-xs-center"
              mt-5
            >
              <v-btn
                color="primary"
                @click="login()"
              >
                Sign In
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase';

export default {
	name: 'Signin',
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
