import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		title: 'Beacon',
		userId: undefined,
		userData: undefined,
	},
	mutations: {
		setUser: (state, userId) => {
			console.log(userId);
			state.userId = userId;
		},
		unSetUser: (state) => {
			console.log('Unsetting user');
			state.userId = undefined;
			state.userData = undefined;
		},
		setUserData: (state, userData) => {
			state.userData = userData;
		},
	},
	actions: {
		setUserAction: ({ commit }, userId) => {
			console.log('Setting user ID in store');
			commit('setUser', userId);
		},
		setUserDataAction: ({ commit }, userData) => {
			console.log('Setting user data in store');
			commit('setUserData', userData);
		},
		unSetUserAction: ({
			commit,
		},) => {
			console.log('Unsetting user data in store');
			commit('unSetUser');
		},
	},
	getters: {
		isLoggedIn: (state) => !!state.userId,
	},
	plugins: [createPersistedState()],
});
