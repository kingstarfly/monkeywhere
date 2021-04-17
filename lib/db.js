import firebase from "./firebase";

const firestore = firebase.firestore();

export const createUser = async (data) => {
  const { uid } = data;
  const user = await firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
  return user;
};

export const createMonkeySighting = async (data) => {
  const sighting = await firestore.collection("sightings").add(data);
  return await sighting;
};

export const getMonkeySightings = async () => {
  const snapshot = await firestore.collection("sightings").get();
  const sightings = [];
  snapshot.forEach((doc) => {
    sightings.push({ id: doc.id, ...doc.data() });
  });

  return sightings;
};
