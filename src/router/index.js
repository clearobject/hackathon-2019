/* eslint-disable */

import Vue from 'vue';
import Router from 'vue-router';

const routerOptions = [
	{ path: '/', component: 'Home' },
	{ path: '/signin', component: 'Signin' },
	{ path: '/signup', component: 'Signup' },
	{ path: '/signout', component: 'Signout' },
	{ path: '/settings', component: 'Settings' },
	{ path: '/home', component: 'Home' },
	{
		path: '/chat',
		component: 'Chat',
		name: 'Chat',
		props: true,
		beforeEnter: (to, from, next) => {
			if (to.params.name) {
				next();
			} else {
				next({ component: 'Signin' });
			}
		},
	},
];

const routes = routerOptions.map(route => {
	return {
		...route,
		component: () => import(`@/components/${route.component}.vue`),
	};
});

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes,
});
