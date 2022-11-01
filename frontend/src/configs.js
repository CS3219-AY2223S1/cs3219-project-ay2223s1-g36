const URI_USER_SVC = process.env.REACT_APP_URI_USER_SVC;

const PREFIX_USER_SVC = '/api/user';

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;

export const URL_USER_SVC_REG = URL_USER_SVC + '/register';
export const URL_USER_SVC_LOGIN = URL_USER_SVC + '/login';
export const URL_USER_SVC_LOGOUT = URL_USER_SVC + '/logout';

export const URL_USER_SVC_AUTH = URL_USER_SVC + '/auth';
export const URL_USER_SVC_DELETE = URL_USER_SVC + '/deleteAccount';
export const URL_USER_SVC_UPDATEPW = URL_USER_SVC + '/updatePassword';

export const URL_MATCH_SVC = process.env.REACT_APP_URL_MATCH_SVC;

export const URL_COLLAB_SVC = process.env.REACT_APP_URL_COLLAB_SVC;

export const URL_QN_SVC = process.env.REACT_APP_URL_QN_SVC;
export const URL_QN_SVC_GETID = URL_QN_SVC + '/getQues/';
export const URL_QN_SVC_GETDIFF = URL_QN_SVC + '/getQuesForDifficulty/';

export const URL_HIST_SVC = process.env.REACT_APP_URL_HIST_SVC;
export const URL_HIST_SVC_USER_HIST = URL_HIST_SVC + '/getUserHistory/';
export const URL_HIST_SVC_USER_SUBMISSION_COUNT = URL_HIST_SVC + '/getUserSubmissionCount/';
export const URL_HIST_SVC_GET_CODE = URL_HIST_SVC + '/getMatchCode/';
