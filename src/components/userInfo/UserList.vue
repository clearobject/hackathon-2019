<template>
  <div>
    <UserItem
      v-for="user in users"
      :key="user.uid"
      :user="user"
    />
  </div>
</template>

<script>
import firebase from 'firebase';
import UserItem from '@/components/userInfo/UserItem';

export default {
	name: 'UserList',
	components: {
		UserItem,
	},
	data() {
		return {
			users: [],
		};
	},
	mounted() {
		this.getUsers();
	},
	methods: {
		getUsers() {
			console.log('Getting all users');
			const usersRef = firebase.firestore().collection('users');
			usersRef.get().then((snapshot) => {
				snapshot.forEach((doc) => {
					const docData = doc.data();
					docData.uid = doc.id;
					this.users.push(docData);
				});
			}).catch((error) => {
				console.log('Encountered an error');
				throw new Error(error);
			});
		},
	},
};
</script>

<style>

</style>
