
const LOCAL_PORT = '8686'
const API_BASE_URL = 'http://localhost:' + LOCAL_PORT;

const USER = '/user';
const SHORT = '/api/shorts'
const BOARD = '/board/bulletin'
const DETAIL='/detail'
const REPLY='/reply'

export const USER_URL = API_BASE_URL + USER;
export const SHORT_URL = API_BASE_URL + SHORT;
export const BOARD_URL = API_BASE_URL + BOARD;
export const DETAIL_URL = API_BASE_URL +BOARD+ DETAIL;
export const REPLY_URL = API_BASE_URL +BOARD+ DETAIL+REPLY;
