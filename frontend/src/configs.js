const URI_USER_SVC = process.env.URI_USER_SVC || 'http://localhost:8000';

const PREFIX_USER_SVC = '/api/user';

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;

export const URL_USER_SVC_REG = URL_USER_SVC + '/register';
export const URL_USER_SVC_LOGIN = URL_USER_SVC + '/login';
export const URL_USER_SVC_LOGOUT = URL_USER_SVC + '/logout';

export const URL_USER_SVC_AUTH = URL_USER_SVC + '/auth';
export const URL_USER_SVC_DELETE = URL_USER_SVC + '/deleteAccount';
export const URL_USER_SVC_UPDATEPW = URL_USER_SVC + '/updatePassword';

export const URL_MATCH_SVC = process.env.URL_MATCH_SVC || 'http://localhost:8001';

export const URL_COLLAB_SVC = process.env.URL_MATCH_SVC || 'http://localhost:8002';

export const URL_QN_SVC = process.env.URI_USER_SVC || 'http://localhost:8003/api/question';
export const URL_QN_SVC_GETID = URL_QN_SVC + '/getQues/';
export const URL_QN_SVC_GETDIFF = URL_QN_SVC + '/getQuesForDifficulty/';
