const clientHostName = window.location.hostname;
console.log('client : ', clientHostName);

const LOCAL_PORT = '8686'
const API_BASE_URL = 'http://localhost:' + LOCAL_PORT;

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

export const USER_URL = backendHost + USER;
export const SHORT_URL = backendHost + SHORT;
export const FIND_USER_URL = backendHost + FIND;
export const RECENT_GAMES_URL = backendHost + RECENT_GAME;
export const CHAMPION_MASTERY_URL = backendHost + CHAMPION_MASTERY_TOP3;
export const RANKING_URL = backendHost + RANKING;
export const REALTIME_GAME_URL = backendHost + REALTIME_GAME;
export const ALL_CHAMPION_MASTERY_URL = backendHost + ALL_CHAMPION_MASTERY;