//Generate Token using secret from process.env.JWT_SECRET
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const u = {
        name: user.name,
        _id: user._id,
        current_challenge_id: user.current_challenge_id,
        score: user.score,
        challengesCompleted: user.challengesCompleted
    };

    return jwt.sign(u, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    generateToken,
    getRandomInt
}