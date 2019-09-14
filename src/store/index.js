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
	getters: {},
});
