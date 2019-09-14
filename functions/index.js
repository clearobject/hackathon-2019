/* eslint-disable */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.onMessageCreate = functions.firestore
	.document('messages/{userId}')
	.onCreate((snap, context) => {
		const newValue = snap.data();
		const ref = admin
			.firestore()
			.collection('messages')
			.orderBy('timestamp');

		ref.onSnapshot(snapshot => {
			i = 0;
			size = snapshot.size;
			sizeToDelete = size - 10;
			snapshot.forEach(doc => {
				if (i < sizeToDelete) {
					doc.ref
						.delete()
						.then(() => {
							console.log('Document successfully deleted');
						})
						.catch(error => {
							console.log('Error removing document: ', error);
						});
				}
				i++;
			});
		});
	});
