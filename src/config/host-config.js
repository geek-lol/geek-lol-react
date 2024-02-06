
const LOCAL_PORT = '8686'
const API_BASE_URL = 'http://localhost:' + LOCAL_PORT;

const USER = '/user';
const BOARD = '/board/bulletin'
const DETAIL='/detail'
const REPLY='/reply'
const SHORT = '/api/shorts'
const SHORT_VOTE = '/api/vote'
const BOARD_REPLY = '/api/shorts/reply'
const MODIFY='/modify'

export const USER_URL = API_BASE_URL + USER;
export const SHORT_URL = API_BASE_URL + SHORT;
export const SHORT_VOTE_URL = API_BASE_URL + SHORT_VOTE;
export const BOARD_URL = API_BASE_URL + BOARD;
export const DETAIL_URL = API_BASE_URL +BOARD+ DETAIL;
export const MODIFY_URL = API_BASE_URL +BOARD+ MODIFY;
export const REPLY_URL = API_BASE_URL +BOARD+ DETAIL+REPLY;
export const BOARD_REPLY_URL = API_BASE_URL + BOARD_REPLY;