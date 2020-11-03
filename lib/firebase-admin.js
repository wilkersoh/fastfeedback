import admin from 'firebase-admin';

/**
  下面的 key 是for enter firebase server side的 key
  然后 用firebase-admin package (client side is nodejs) 去connection firebase service side
  api/sites > import this script
  Where to get those key > project > setting > Service accounts (Firebase Admin SDK)
*/
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }),
    databaseURL: 'https://fast-feedback-demo-ca061.firebaseio.com'
  });
}

const auth = admin.auth();
const db = admin.firestore();

export { auth, db };
