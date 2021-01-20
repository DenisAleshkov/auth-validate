import firebase from "firebase";
import { SET_TRAINING, GET_TRAINING } from "./../constants";

export const setTraining = (payload) => ({ type: SET_TRAINING, payload });
export const setTrainingAction = (payload) => ({ type: GET_TRAINING, payload });

export const addTraining = (id, data) => (dispatch) => {
  const db = firebase
    .firestore()
    .collection("trainers")
    .doc(id)
    .collection("training");
  db.add(data).then((res) => {
    dispatch(setTraining({ id: res.id, ...data }));
  });
};

export const getTraining = (id) => (dispatch) => {
  const db = firebase
    .firestore()
    .collection("trainers")
    .doc(id)
    .collection("training");
  db.get().then((result) => {
    const training = [];
    result.docs.forEach((item) => {
      training.push({ id: item.id, ...item.data() });
    });
    dispatch(setTrainingAction(training));
  });
};
