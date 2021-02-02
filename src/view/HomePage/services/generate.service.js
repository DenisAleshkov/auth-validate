import firebase from "firebase";

export const getTrainersFromFirebase = async () => {
  const snapshot = await firebase.firestore().collection("trainers").get();
  const trainers = snapshot.docs.map((item) => {
    return { ...item.data(), id: item.id };
  });
  return trainers;
};
