import { SET_TRAINING, GET_TRAINING } from "./../constants";

const initialState = {
  training: [],
};

const TrainingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRAINING: {
      return {
        training: action.payload,
      };
    }
    case SET_TRAINING: {
      return {
        training: [...state.training, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default TrainingReducer;
