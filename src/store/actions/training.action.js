import { SET_TRAINING, GET_TRAINING } from "./../constants";
import { getTrainingCollectionFromFirebase } from "./../services/firebase.service";

export const setTraining = (payload) => ({ type: SET_TRAINING, payload });
export const setTrainingAction = (payload) => ({ type: GET_TRAINING, payload });

export const addTraining = (id, data) => (dispatch) => {
  getTrainingCollectionFromFirebase(id)
    .add(data)
    .then((res) => {
      dispatch(setTraining({ id: res.id, ...data }));
    });
};

export const getTraining = (id) => (dispatch) => {
  getTrainingCollectionFromFirebase(id)
    .get()
    .then((result) => {
      const training = [];
      result.docs.forEach((item) => {
        training.push({ id: item.id, ...item.data() });
      });
      dispatch(setTrainingAction(training));
    });
};
