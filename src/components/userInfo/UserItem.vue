<template>
  <v-card>
    <v-card-title>{{ user.username }}</v-card-title>
    <v-card-actions>
      <v-btn @click="startChat">
        Start chat
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import router from '@/router/index.js';
import firebase from 'firebase';

export default {
	name: 'UserItem',
	props: {
		user: {
			type: Object,
			default() {
				return { username: 'hello', uid: 1234 };
			},
			name: 'user',
		},
	},
	data() {
		return {};
	},
	methods: {
		...mapGetters(['getUserData']),
		startChat() {
			console.log(this.user.uid, firebase.auth().currentUser.uid);
			const userOneRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
			const userTwoRef = firebase.firestore().collection('users').doc(this.user.uid);
			const chatRoomRef = firebase.firestore().collection('chatrooms').doc();
			const chatRoomData = {
				users: {},
				userRefs: {},
			};
			chatRoomData['users'][userOneRef.id] = true;
			chatRoomData['users'][userTwoRef.id] = true;
			chatRoomData['userRefs'][userOneRef.id] = userOneRef;
			chatRoomData['userRefs'][userTwoRef.id] = userTwoRef;
			chatRoomRef.set(chatRoomData);
			router.push({ name: 'Chat', params: { chatRoomId: chatRoomRef.id } });
		},
	},
};
</script>
