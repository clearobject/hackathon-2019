import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import 'vuetify/dist/vuetify.min.css';
import { store } from './store';

import VueChatScroll from 'vue-chat-scroll';

const firebaseConfig = {
	apiKey: 'AIzaSyCBmRdmokToa2AyEs26b9qvoVWUnGj2gh8',
	authDomain: 'clearobject-hackathon2019.firebaseapp.com',
	databaseURL: 'https://clearobject-hackathon2019.firebaseio.com',
	projectId: 'clearobject-hackathon2019',
	storageBucket: 'clearobject-hackathon2019.appspot.com',
	messagingSenderId: '147779918580',
	appId: '1:147779918580:web:0ec375615b7b189562dca1',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();

Vue.config.productionTip = false;

Vue.use(VueChatScroll);

new Vue({
	vuetify,
	router,
	store,
	render: h => h(App),
}).$mount('#app');
