/* eslint-disable */

import Vue from 'vue';
import Router from 'vue-router';

const routerOptions = [
	{ path: '/', component: 'Home', name: 'Home' },
	{
	  path: '/signin',
	  component: 'Signin',
	  name: 'Signin'
	},
	{
	  path: '/signup',
	  component: 'Signup',
	  name: 'Signup'
	},
	{
	  path: '/signout',
	  component: 'Signout',
	  name: 'Signout'
	},
	{
	  path: '/settings',
	  component: 'Settings',
	  name: 'Settings'
	},
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
