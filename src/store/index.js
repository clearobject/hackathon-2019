import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		title: 'Beacon',
		uid: '',
		age: '',
		department: '',
		gender: '',
		yearsOfService: '',
		zipCode: '',
	},
	mutations: {},
	actions: {},
	getters: {
		title: state => state.title,
		uid: state => state.uid,
		age: state => state.age,
		department: state => state.department,
		gender: state => state.gender,
		yearsOfService: state => state.yearsOfService,
		zipCode: state => state.zipCode,
	},
});
