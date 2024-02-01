export const longToDate = (val) => {
    const now = new Date();
    const date = new Date(val);
    const timeDiff = now - date;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return `${seconds}초 전`;
    } else if (minutes === 1) {
        return `방금 전`;
    } else if (minutes < 60) {
        return `${minutes}분 전`;
    } else if (hours === 1) {
        return `한시간 전`;
    } else if (hours < 24) {
        return `${hours}시간 전`;
    } else if (days === 1) {
        return `어제`;
    } else if (days < 30) {
        return `${days}일 전`;
    } else if (months === 1) {
        return `한 달전`;
    } else if (months < 12) {
        return `${months}달 전`;
    } else if (years === 1) {
        return `1년 전`;
    } else {
        return `${years}년 전`;
    }
};

export const gameTimeFunc = (t) => {
    const date = new Date(t);
    const year = date.getFullYear();
    const month = "0" + (date.getMonth() + 1);
    const day = "0" + date.getDate();
    const hour = "0" + date.getHours();
    const minute = "0" + date.getMinutes();
    const second = "0" + date.getSeconds();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
}

export const secondsToMinutesAndSeconds = (seconds) => {
    const minutes = padZero(Math.floor(seconds / 60));
    const remainingSeconds = padZero(seconds % 60);

    return `${minutes}:${remainingSeconds}`;
}

export const padZero = (value) => {
    return value < 10 ? `0${value}` : value.toString();
}