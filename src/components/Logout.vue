<template>
  <div />
</template>
<script>
import router from '@/router/index.js';
import firebase from 'firebase';

export default {
	name: 'Logout',
	data: () => ({}),
	mounted() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				router.push({ name: 'Home' });
			})
			.catch(error => {
				console.log(error);
			});
	},
};
</script>
