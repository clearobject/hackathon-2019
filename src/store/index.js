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
			state.userId = userId;
		},
		unSetUser: state => {
			state.userId = undefined;
			state.userData = undefined;
		},
		setUserData: (state, userData) => {
			state.userData = userData;
		},
	},
	actions: {
		setUserAction: ({ commit }, userId) => {
			commit('setUser', userId);
		},
		setUserDataAction: ({ commit }, userData) => {
			commit('setUserData', userData);
		},
		unSetUserAction: ({ commit }) => {
			commit('unSetUser');
		},
	},
	getters: {
		isLoggedIn: state => !!state.userId,
		getUserData: state => state.userData,
	},
	plugins: [createPersistedState()],
});
