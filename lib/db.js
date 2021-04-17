import firebase from "./firebase";

const firestore = firebase.firestore();

export const createUser = (uid, data) => {
  const user = firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
    .then(console.log("Created User!"));
  return user;
};

export const createMonkeySighting = (data) => {
  const sighting = firestore.collection("sightings").add(data);
  return sighting;
};
