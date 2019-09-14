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
        style="text-align: center;"
      >
        <h1>Register</h1>
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
                :rules="[rules.required]"
                name="input-email"
                label="Email"
              />
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="username"
                :rules="[rules.required]"
                name="input-username"
                label="Username"
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
            <v-flex>
              <v-select
                v-model="departmentSelect"
                :items="departments"
                :rules="[rules.required]"
                name="input-department"
                label="Department"
              />
            </v-flex>
            <v-flex>
              <v-select
                v-model="yearsOfServiceSelect"
                :items="yearsOfService"
                :rules="[rules.required]"
                name="input-years-of-service"
                label="Years of Service"
              />
            </v-flex>
            <v-flex>
              <v-select
                v-model="ageSelect"
                :items="age"
                :rules="[rules.required]"
                name="input-age"
                label="Age"
              />
            </v-flex>
            <v-flex>
              <v-select
                v-model="genderSelect"
                :items="gender"
                :rules="[rules.required]"
                name="input-gender"
                label="Gender"
              />
            </v-flex>
            <div class="font-italic font-weight-medium">
              What's been on your mind?
            </div>
            <div class="font-italic font-weight-medium">
              What can you help others with?
            </div>
            <v-flex>
              <v-checkbox
                v-model="experiences"
                label="Child Crimes"
                value="Child Crimes"
              />
              <v-checkbox
                v-model="experiences"
                label="Suicide Bystander"
                value="Suicide Bystander"
              />
              <v-checkbox
                v-model="experiences"
                label="Sex Crimes"
                value="Sex Crimes"
              />
              <v-checkbox
                v-model="experiences"
                label="Motor Vehicle Accidents"
                value="Motor Vehicle Accidents"
              />
              <v-checkbox
                v-model="experiences"
                label="Death of a Loved One"
                value="Death of a Loved One"
              />
              <v-checkbox
                v-model="experiences"
                label="Divorce"
                value="Divorce"
              />
              <v-checkbox
                v-model="experiences"
                label="Death of a Coworker"
                value="Death of a Coworker"
              />
              <v-checkbox
                v-model="experiences"
                label="Retiree"
                value="Retiree"
              />
              <v-checkbox
                v-model="experiences"
                label="Physical Disability"
                value="Physical Disability"
              />
              <v-checkbox
                v-model="experiences"
                label="Intellectual Impairment"
                value="Intellectual Impairment"
              />
              <v-checkbox
                v-model="experiences"
                label="Health Decline"
                value="Health Decline"
              />
              <v-checkbox
                v-model="experiences"
                label="Substance Abuse"
                value="Substance Abuse"
              />
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="zipCode"
                :rules="[rules.numberOnly]"
                name="input-zipcode"
                label="Zipcode (optional)"
              />
            </v-flex>
            <v-flex style="margin: auto;">
              <v-btn
                color="primary"
                @click="createAccount()"
              >
                Create Account
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
import router from '@/router/index.js';

export default {
	name: 'Register',
	data: () => ({
		email: '',
		username: '',
		password: '',
		departmentSelect: '',
		departments: ['Medical', 'Police', 'Firefighter'],
		yearsOfServiceSelect: '',
		yearsOfService: ['0-3', '3-6', '6-10', '10-20', '20+'],
		ageSelect: '',
		age: ['20-30', '30-40', '40-50', '50+'],
		genderSelect: '',
		gender: ['Male', 'Female', 'Other / Prefer not to say'],
		experiences: [],
		zipCode: undefined,
		rules: {
			required: value => !!value || 'Required.',
			min: v => v.length >= 6 || 'Min 6 characters',
			emailMatch: () => 'The email and password you entered don\'t match',
			numberOnly: v =>
				/^([0-9]*$)|(undefined)/g.test(v) || 'Zipcode can only be numbers',
		},
		showPw: false,
		errorText: '',
	}),
	methods: {
		createAccount() {
			console.log(this.email, this.password);
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.email, this.password)
				.then(credentials => {
					const uid = credentials.user.uid;
					const dataSet = {
						username: this.username,
						department: this.departmentSelect,
						yearsOfService: this.yearsOfServiceSelect,
						age: this.ageSelect,
						gender: this.genderSelect,
						experiences: this.experiences,
					};
					if (this.zipCode) {
						dataSet['zipCode'] = this.zipCode;
					}
					firebase
						.firestore()
						.collection('users')
						.doc(uid)
						.set(dataSet);

					console.log('User creation is successful');
					router.push({ name: 'Home' });
				})
				.catch(error => {
					// wrong-password
					console.log('Error encoutered', error);
				});
		},
	},
};
</script>
