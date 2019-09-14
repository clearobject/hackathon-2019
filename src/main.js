import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import vuetify from './plugins/vuetify';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCBmRdmokToa2AyEs26b9qvoVWUnGj2gh8',
	authDomain: 'clearobject-hackathon2019.firebaseapp.com',
	databaseURL: 'https://clearobject-hackathon2019.firebaseio.com',
	projectId: 'clearobject-hackathon2019',
	storageBucket: 'clearobject-hackathon2019.appspot.com',
	messagingSenderId: '147779918580',
	appId: '1:147779918580:web:0ec375615b7b189562dca1',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


Vue.config.productionTip = false;

new Vue({
	vuetify,
	render: h => h(App),
}).$mount('#app');
