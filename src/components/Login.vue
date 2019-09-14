<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5 style="text-align: center;">
        <h1>Login</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-layout column>
          <v-flex>
            <v-text-field v-model="email" name="email" label="Email" type="email" required />
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
          <v-flex sm-3>
            <div v-show="errorText != undefined" class="red--text">{{ errorText }}</div>
          </v-flex>
          <v-flex class="text-xs-center" mt-5 style="margin: auto;">
            <v-btn color="primary" type="submit">Sign In</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 6 || "Min 6 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    showPw: false,
    errorText: ""
  }),
  mounted() {
    window.addEventListener("keyup", event => {
      if (event.keyCode === 13) {
        this.login();
      }
    });
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(credentials => {
          console.log(credentials);
          this.$store.state.uid = credentials.user.uid;
          this.$store.state.age = credentials.user.age;
          this.$store.state.department = credentials.user.department;
          this.$store.state.gender = credentials.user.gender;
          this.$store.state.yearsOfService = credentials.user.yearsOfService;
          this.$store.state.zipCode = credentials.user.zipCode;
        })
        .catch(error => {
          console.log("Error encoutered", error);
          if (error.code == "auth/user-not-found") {
            this.errorText = "No account found for the email address entered.";
          } else {
            this.errorText = error.message;
          }
        });
    }
  }
};
</script>
