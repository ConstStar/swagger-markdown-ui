const transformPath = require('./path');
const transformResponses = require('./pathResponses');
const transformResponsesPublic = require('./pathResponsesPublic');
/**
 * Allowed methods
 * @type {string[]}
 */

module.exports = paths => {
    let tags = {};
    let responsesPublic = {}

    let isFrist = true;
    Object.keys(paths).forEach(
        (path) => {
            let data = paths[path];
            if (path && data) {
                Object.keys(data).map(method => {
                    let pathInfo = data[method];
                    if ('responses' in pathInfo) {
                        responsesPublic = transformResponsesPublic(pathInfo.responses, responsesPublic, isFrist)
                        isFrist = false
                    }
                });
            }
        });

    Object.keys(paths).forEach(
        (path) =>
        (tags = transformPath(path, paths[path], {}, tags, responsesPublic))
    );


    let res = [];

    res.push(`## 通用响应内容\n ${transformResponses(responsesPublic, {})}`);
    res.push('\n\n')

    res.push("## 接口列表")
    Object.keys(tags).map((key) => {
        res.push(`### ${key}\n `);
        res = res.concat(tags[key]);
    });

    return res.join("\n");
}