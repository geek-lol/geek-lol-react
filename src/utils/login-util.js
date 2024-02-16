
export const TOKEN = 'ACCESS_TOKEN';
export const USERNAME = 'USER_NAME';
export const ROLE = 'ROLE';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const ID = 'USER_ID';

// 로그인 여부를 확인하는 함수
export const isLogin = () => !!localStorage.getItem(TOKEN);

// 로그인한 사용자의 데이터를 반환하는 함수
export const getCurrentLoginUser = () => {
    return {
        token: localStorage.getItem(TOKEN),
        username: localStorage.getItem(USERNAME),
        autologin: localStorage.getItem(AUTO_LOGIN),
        role: localStorage.getItem(ROLE),
        userId:localStorage.getItem(ID)
    };
};