<template>
  <UserItem />
</template>

<script>
import UserItem from '@/components/userInfo/UserItem';

export default {
	name: 'UserList',
	components: {
		UserItem,
	},
	data() {
		return {
			users: [
				{},
			],
		};
	},
	mounted() {
		this.getUsers();
	},
	methods: {
		getUsers() {
			console.log('Getting all users');
		},
	},
};
</script>

<style>

</style>
