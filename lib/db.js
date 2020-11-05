/**
  Doing Create Date
*/
import firebase from './firebase';
import getStripe from './stripe';

const firestore = firebase.firestore();
// const app = firebase.app();

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
  const feedback = firestore.collection('feedback').doc();
  feedback.set(data);

  return feedback;
  // return firestore.collection('feedback').add(data);
}

export function deleteFeedback(id) {
  return firestore.collection('feedback').doc(id).delete();
}

export async function createCheckoutSession(uid) {
  /**
  Stripe Minimum Viable Saas
  */
  // https://github.com/jaredpalmer/minimum-viable-saas/blob/master/README_FB_STRIPE_POSTINSTALL.md
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_1Hk36TKawtkOEuGTQODX7NKo', // price Id from firestore
      success_url: window.location.origin,
      cancel_url: window.location.origin
    });
  console.log(checkoutSessionRef);
  // Wait for the CheckoutSession to get attached by the extension
  checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();
    console.log('sessionId: ', sessionId);
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}

export async function goToBillingortal(uid) {
  // const functionRef =
}
