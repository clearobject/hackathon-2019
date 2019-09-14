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
	name: 'ChatItem',
	props: {
		chat: {
			type: Object,
			default() {
				return { id: 1234, user_1: '', user_2: '' };
			},
			name: 'chat',
		},
	},
	data() {
		return {};
	},
	methods: {
		...mapGetters(['getUserData']),
		startChat() {
			const chatRoomRef = firebase.firestore().collection('chatrooms').doc(this.chat.id);
			router.push({ name: 'Chat', params: { chatRoomId: chatRoomRef.id } });
			// console.log(this.user.uid, firebase.auth().currentUser.uid);
			// const userOneRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
			// const userTwoRef = firebase.firestore().collection('users').doc(this.user.uid);
			// const chatRoomRef = firebase.firestore().collection('chatrooms').doc();
			// const chatRoomData = {
			// 	users: {},
			// 	userRefs: {},
			// };
			// chatRoomData['users'][userOneRef.id] = true;
			// chatRoomData['users'][userTwoRef.id] = true;
			// chatRoomData['userRefs'][userOneRef.id] = userOneRef;
			// chatRoomData['userRefs'][userTwoRef.id] = userTwoRef;
			// chatRoomRef.set(chatRoomData);
			// router.push({ name: 'Chat', params: { chatRoomId: chatRoomRef.id } });
		},
	},
};
</script>
