import { createSelector } from "reselect";

const getState = state => state;

const getAppLoading = createSelector(getState, state => state.appLoading);

export { getAppLoading };
