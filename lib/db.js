/**
  Doing Create Date
*/
import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  // this is noSQL Database
  /**
    Flow.
    1. Create collection "User" if there is null (Rable in SQL)
    2. looking for uid in the document (Row in SQL)
    3. insert value into field (Columns in SQL)
    4. merge: true > to make sure that keeping the ID unique
   */
  return firestore
    .collection('users')
    .doc(uid)
    .set(
      {
        uid,
        ...data
      },
      { merge: true }
    );
}

export function createSite(data) {
  const site = firestore.collection('sites').doc(); // create a reference for the docs, mean got id first, then in "AddSiteModel" we can get the id to prevent create site, cannot click in the link.
  site.set(data);

  return site;
  // return firestore.collection('sites').add(data); this cannot get the id. it wil straight created.
}

export function createFeedback(data) {
  return firestore.collection('feedback').add(data);
}

export function deleteFeedback(id) {
  return firestore.collection('feedback').doc(id).delete();
}
