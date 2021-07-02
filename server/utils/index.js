const uuid = require('uuid');

const createUniqueName = () => {
    return uuid.v4();
}

module.exports = {
    createUniqueName
}