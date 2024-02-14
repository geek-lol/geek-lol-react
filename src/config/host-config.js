
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
const BOARD_VOTE='/board/vote'
const LOAD_PROFILE='/load-profile'
const TROLL_APPLY='/troll/apply'
const TROLL_APPLY_REPLY='/troll/apply/reply'
const TROLL_RULING_VOTE='/troll/ruling/vote';
const TROLL_APPLY_VOTE='/troll/apply/vote'
const TROLL_RULING_BOARD='/troll/ruling/board'

export const USER_URL = API_BASE_URL + USER;
export const SHORT_URL = API_BASE_URL + SHORT;
export const SHORT_VOTE_URL = API_BASE_URL + SHORT_VOTE;
export const BOARD_URL = API_BASE_URL + BOARD;
export const DETAIL_URL = API_BASE_URL +BOARD+ DETAIL;
export const MODIFY_URL = API_BASE_URL +BOARD+ MODIFY;
export const REPLY_URL = API_BASE_URL +BOARD+ DETAIL+REPLY;
export const BOARD_REPLY_URL = API_BASE_URL + BOARD_REPLY;
export const BOARD_VOTE_URL = API_BASE_URL + BOARD_VOTE;
export const LOAD_PROFILE_URL = API_BASE_URL + BOARD +LOAD_PROFILE;
export const TROLL_APPLY_URL = API_BASE_URL +TROLL_APPLY;
export const TROLL_APPLY_REPLY_URL = API_BASE_URL +TROLL_APPLY_REPLY;
export const TROLL_RULING_VOTE_URL = API_BASE_URL +TROLL_RULING_VOTE;
export const TROLL_APPLY_VOTE_URL = API_BASE_URL +TROLL_APPLY_VOTE;
export const TROLL_RULING_BOARD_URL=API_BASE_URL+TROLL_RULING_BOARD


