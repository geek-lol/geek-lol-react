const clientHostName = window.location.hostname;
console.log('client : ', clientHostName);

const LOCAL_PORT = '8686';
const API_BASE_URL = 'http://localhost:' + LOCAL_PORT;

const LOCATION_URL = 'http://localhost:3000';

const S3URL = 'geeklol.site';
const DEPLOY_BACKEND = "http://13.209.200.203";

let backendHost;

if (clientHostName === "localhost") {
    backendHost = API_BASE_URL;
} else if (clientHostName === S3URL) {
    backendHost = DEPLOY_BACKEND;
}

console.log(backendHost);

const USER = '/user';
const SHORT = '/api/shorts';
const FIND = "/find";
const RECENT_GAME = "/recentGames";
const CHAMPION_MASTERY_TOP3 = "/championMastery";
const RANKING = "/ranking";
const REALTIME_GAME = "/realtimeGame";
const ALL_CHAMPION_MASTERY = "/all-champion-mastery";
const GOOGLE = '/auth/google';
const BOARD = '/board/bulletin';
const DETAIL = '/detail';
const REPLY = '/reply';
const SHORT_VOTE = '/api/vote';
const BOARD_REPLY = '/api/shorts/reply';
const MODIFY = '/modify';
const BOARD_VOTE = '/board/vote';
const LOAD_PROFILE = '/load-profile';
const TROLL_APPLY = '/troll/apply';
const TROLL_APPLY_REPLY = '/troll/apply/reply';
const TROLL_RULING_VOTE = '/troll/ruling/vote';
const TROLL_APPLY_VOTE = '/troll/apply/vote';
const TROLL_RULING_BOARD = '/troll/ruling/board';
const TROLL_APPLY_DETAIL = '/board/RequestDetail';
const TROLL_RULING_DETAIL = '/board/SelectDetail';
const ADMIN = '/admin';
const TROLL_RULING_REPLY = '/troll/ruling/reply';

export const USER_URL = backendHost + USER;
export const SHORT_URL = backendHost + SHORT;
export const FIND_USER_URL = backendHost + FIND;
export const RECENT_GAMES_URL = backendHost + RECENT_GAME;
export const CHAMPION_MASTERY_URL = backendHost + CHAMPION_MASTERY_TOP3;
export const RANKING_URL = backendHost + RANKING;
export const REALTIME_GAME_URL = backendHost + REALTIME_GAME;
export const ALL_CHAMPION_MASTERY_URL = backendHost + ALL_CHAMPION_MASTERY;
export const GOOGLE_URL = backendHost + GOOGLE;
export const SHORT_VOTE_URL = backendHost + SHORT_VOTE;
export const BOARD_URL = backendHost + BOARD;
export const DETAIL_URL = backendHost + BOARD + DETAIL;
export const MODIFY_URL = backendHost + BOARD + MODIFY;
export const REPLY_URL = backendHost + BOARD + DETAIL + REPLY;
export const BOARD_REPLY_URL = backendHost + BOARD_REPLY;
export const BOARD_VOTE_URL = backendHost + BOARD_VOTE;
export const LOAD_PROFILE_URL = backendHost + BOARD + LOAD_PROFILE;
export const TROLL_APPLY_URL = backendHost + TROLL_APPLY;
export const TROLL_APPLY_REPLY_URL = backendHost + TROLL_APPLY_REPLY;
export const TROLL_RULING_VOTE_URL = backendHost + TROLL_RULING_VOTE;
export const TROLL_APPLY_VOTE_URL = backendHost + TROLL_APPLY_VOTE;
export const TROLL_RULING_BOARD_URL = backendHost + TROLL_RULING_BOARD;
export const TROLL_RULING_DETAIL_URL = LOCATION_URL + TROLL_RULING_DETAIL;
export const TROLL_APPLY_DETAIL_URL = LOCATION_URL + TROLL_APPLY_DETAIL;
export const ADMIN_URL = backendHost + ADMIN;
export const TROLL_RULING_REPLY_URL = backendHost + TROLL_RULING_REPLY;