import { TOOGLE_APP_LOADING, LOAD_CONTACT_LIST } from "./constants";

const initialState = {
  appLoading: false,
  contactList: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONTACT_LIST:
      return {
        ...state,
        contactList: action.payload
      };
    case TOOGLE_APP_LOADING:
      return {
        ...state,
        appLoading: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
