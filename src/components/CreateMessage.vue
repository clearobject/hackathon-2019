<template>
  <div class="container pt-4 pb-4">
    <form @submit.prevent="createMessage">
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-text-field
          v-model="newMessage"
          input="text"
          name="message"
          class="form-control pa-0 ma-0"
          label="Enter a message ..."
          fluid
        />
        <p
          v-if="errorText"
          class="text-danger"
          style="color: #ff003c"
        >
          {{ errorText }}
        </p>
      </v-col>

      <v-flex style="margin: auto;">
        <v-btn
          color="primary"
          class="btn btn-primary"
          type="submit"
          name="action"
          style="width: 100%"
        >
          Submit
        </v-btn>
      </v-flex>
    </form>
  </div>
</template>

<script>
import fb from '@/main';

export default {
	name: 'CreateMessage',
	// props: ["name"],
	data() {
		return {
			newMessage: null,
			errorText: null,
			uid: this.$store.state.uid,
		};
	},
	methods: {
		createMessage() {
			if (this.newMessage) {
				fb.collection('messages')
					.add({
						uid: this.uid,
						message: this.newMessage,
						timestamp: Date.now(),
					})
					.catch(err => {
						console.log(err);
					});
				this.newMessage = null;
				this.errorText = null;
			} else {
				this.errorText = 'A message must be entered!';
			}
		},
	},
};
</script>