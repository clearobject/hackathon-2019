<template>
  <v-container>
    <v-layout text-center wrap>
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
        <v-btn text @click="createAccount()">Create Account</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  name: "CreateAccount",
  data() {
    return {
      email: "",
      password: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      showPw: false,
      errorText: ""
    };
  },
  methods: {
    createAccount() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.state.user.uid = user.uid;
        })
        .catch(error => {
          console.log("Error encoutered", error);
        });
    }
  }
};
</script>
