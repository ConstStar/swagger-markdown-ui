module.exports = (responses, responsesPublic, isFrist) => {

    let keys = Object.keys(responsesPublic);

    if (isFrist) {
        Object.keys(responses).forEach(key => {
            responsesPublic[key] = responses[key]
        });
    } else {
        keys.forEach(key => {
            if (JSON.stringify(responses[key]) != JSON.stringify(responsesPublic[key])) {
                delete responsesPublic[key];
            }
        })
    }

    return responsesPublic;
};