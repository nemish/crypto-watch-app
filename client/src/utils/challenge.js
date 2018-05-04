const challengeTotal = challenge => {
    return challenge.answers.map(
        (answer, index) => {
            const question = challenge.questions[index];
            const key = Object.keys(answer).sort(getCompareFn(question, answer))[0];
            return {
                question,
                answer: answer[key],
                userId: key,
                index
            }
        }
    ).reduce((accum, current) => {
        const { userId } = current;
        if (accum[userId]) {
            accum[userId] += 1
        } else {
            accum[userId] = 1
        }
        return accum;
    }, {});
}


const getCompareFn = (question, answers) => (prev, next) => {
    const { result } = question;
    const prevAnswer = answers[prev];
    const nextAnswer = answers[next];
    return prevAnswer.option === result || (nextAnswer.option !== result && prevAnswer.elapsed < nextAnswer.elapsed);
}


const calcScore = (challenge, total, userId) => {
    if (challenge.playersCount == 1) {
        return 1;
    }
    return (total[userId] || 0) * challenge.playersCount;
}

module.exports = {
    challengeTotal,
    getCompareFn,
    calcScore
}

