import {
  TOOGLE_APP_LOADING,
  LOAD_CONTACT_LIST,
  FIND_SELECTED_USER
} from "./constants";
import axios from "axios";

export const toggleAppLoading = status => ({
  type: TOOGLE_APP_LOADING,
  payload: status
});

export const loadContactList = () => async dispatch => {
  dispatch({
    type: TOOGLE_APP_LOADING,
    payload: true
  });
  try {
    const {
      data: { contacts }
    } = await axios.get(`/chat/contact-list`);

    dispatch({
      type: LOAD_CONTACT_LIST,
      payload: contacts
    });
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({
      type: TOOGLE_APP_LOADING,
      payload: false
    });
  }
};

export const findSelectedUser = userId => ({
  type: FIND_SELECTED_USER,
  payload: userId
});
