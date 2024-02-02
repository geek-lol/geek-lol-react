
const LOCAL_PORT = '8686'
const API_BASE_URL = 'http://localhost:' + LOCAL_PORT;

const USER = '/user';
const BOARD = '/board/bulletin'
const SHORT = '/api/shorts'
const BOARD_REPLY = '/api/shorts/reply'

export const USER_URL = API_BASE_URL + USER;
export const SHORT_URL = API_BASE_URL + SHORT;
export const BOARD_URL = API_BASE_URL + BOARD;
export const BOARD_REPLY_URL = API_BASE_URL + BOARD_REPLY;
