import {
  TOOGLE_APP_LOADING,
  SET_SESSION,
  LOAD_CONTACT_LIST,
  FIND_SELECTED_USER
} from "./constants";

const initialState = {
  appLoading: false,
  session: { loggedIn: false, info: "" },
  contactList: [],
  selectedUser: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOOGLE_APP_LOADING:
      return {
        ...state,
        appLoading: action.payload
      };
    case SET_SESSION:
      return {
        ...state,
        session: action.payload
      };
    case LOAD_CONTACT_LIST:
      return {
        ...state,
        contactList: action.payload
      };
    case FIND_SELECTED_USER: {
      const selectedUser = state.contactList.find(
        user => user._id === action.payload
      );
      return {
        ...state,
        selectedUser
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
