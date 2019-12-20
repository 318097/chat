import { createSelector } from "reselect";

const getState = state => state;

const getAppLoading = createSelector(getState, state => state.appLoading);

const getSession = createSelector(getState, state => state.session);

export { getAppLoading, getSession };
