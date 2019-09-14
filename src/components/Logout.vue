<template />
<script>
import firebase from 'firebase';

export default {
	name: 'Logout',
	data: () => ({}),
	methods: {
		login() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					this.$store.state.uid = null;
					this.$store.state.age = null;
					this.$store.state.department = null;
					this.$store.state.gender = null;
					this.$store.stat.yearsOfService = null;
					this.$store.state.zipCode = null;
				})
				.catch(function(error) {
					console.log(error);
				});
		},
	},
};
</script>
