<template>
  <div>
    <div>Active Chats</div>
    <v-divider />
    <ChatItem
      v-for="chat in activeChats"
      :key="activeChats[chat].id"
    />
    <div>
      <div>Message Someone New</div>
      <UserItem
        v-for="user in users"
        :key="user.uid"
        :user="user"
      />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';
import UserItem from '@/components/userInfo/UserItem';
import ChatItem from '@/components/ChatItem';

export default {
	name: 'UserList',
	components: {
		UserItem,
		ChatItem,
	},
	data() {
		return {
			users: [],
			activeChats: [],
			existingChatUsers: [],
		};
	},
	mounted() {
		this.getUsers();
	},
	methods: {
		...mapGetters(['getUserId']),
		getUsers() {
			const chatRoomsRef = firebase.firestore().collection('chatrooms');
			const chatRoomsWithUser = chatRoomsRef
				.where('users.' + this.getUserId(), '==', true);
			chatRoomsWithUser.get().then((snapshot) => {
				if (snapshot.empty) {
					console.log('No matching documents.');
					return;
				}

				snapshot.forEach(doc => {
					const chatData = doc.data();
					chatData['id'] = doc.id;
					this.activeChats.push(chatData);
				});

			});
			console.log(this.activeChats);
			const usersRef = firebase.firestore().collection('users');
			usersRef
				.get()
				.then((snapshot) => {
					snapshot.forEach((doc) => {
						if (doc.id !== this.getUserId()) {
							const docData = doc.data();
							docData.uid = doc.id;
							let flag = false;
							for (const chat in this.activeChats) {
								if (doc.id in this.activeChats[chat].users) {
									flag = true;
									break;
								}
							}
							if (!flag) {
								this.users.push(docData);
							}

						}
					});
				})
				.catch(error => {
					console.log('Encountered an error');
					throw new Error(error);
				});
		},
	},
};
</script>
