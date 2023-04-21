const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",

  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  //doctor
  FETCH_ALL_DOCTOR_SUCCESS: "FETCH_ALL_DOCTOR_SUCCESS",
  FETCH_ALL_DOCTOR_FAILDED: "FETCH_ALL_DOCTOR_FAILDED",

  SAVE_DETAIL_DOCTOR_SUCCESS: "SAVE_DETAIL_DOCTOR_SUCCESS",
  SAVE_DETAIL_DOCTOR_FAILDED: "SAVE_DETAIL_DOCTOR_FAILDED",

  //schedule doctor
  FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: "FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS",
  FETCH_ALLCODE_SCHEDULE_TIME_FAILDED: "FETCH_ALLCODE_SCHEDULE_TIME_FAILDED",
});

export default actionTypes;
