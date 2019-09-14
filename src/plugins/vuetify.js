import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: 'mdiSvg',
	},
	theme: {
		dark: true,
		themes: {
			dark: {
				primary: '#3F51B5',
				secondary: '#303F9F',
				accent: '#EC407A',
				error: '#FF003C',
				info: '#2196F3',
				success: '#29C0B1',
				warning: '#EAB009',
			},
			light: {
				primary: '#1976D2',
				secondary: '#424242',
				accent: '#82B1FF',
				error: '#FF5252',
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FFC107',
			},
		},
	},
});
