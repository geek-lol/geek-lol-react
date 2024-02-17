export const viewGameMode = (queueId) => {
    switch (queueId) {
        case 420:
            return '솔로랭크';
        case 440:
            return '자유랭크';
        case 450:
            return '칼바람 나락';
        case 490:
            return '일반게임';
        default:
            return '몰라요';
    }
}

