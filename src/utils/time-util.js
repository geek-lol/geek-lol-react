export const calculateTimeDifference = (startDateTime, endDateTime) => {
    const timeDifference = Math.abs(endDateTime - startDateTime);
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    if (daysDifference > 0) {
        return `${daysDifference}일 전`;
    } else if (hoursDifference > 0) {
        return `${hoursDifference}시간 전`;
    } else if (minutesDifference > 0) {
        return `${minutesDifference}분 전`;
    } else {
        return `${secondsDifference}초 전`;
    }
};
