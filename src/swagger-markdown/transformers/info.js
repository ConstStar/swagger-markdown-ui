const transformContact = require('./contact');
const transformLicense = require('./license');

/**
 * http://swagger.io/specification/#infoObject
 * Prepare page header
 * Leave description with no changes
 * @param {Object} info
 * @returns {String}
 */
module.exports = info => {
    const res = [];
    if (info !== null && typeof info === 'object') {
        if ('title' in info) {
            res.push(`# ${info.title}`);
        }

        if ('description' in info) {
            res.push(`${info.description}\n`);
        }

        if ('version' in info) {
            res.push(`***版本: ${info.version}***\n`);
        }

        if ('termsOfService' in info) {
            res.push(`### 服务条款\n${info.termsOfService}\n`);
        }

        if ('contact' in info) {
            res.push(transformContact(info.contact));
        }

        if ('license' in info) {
            res.push(transformLicense(info.license));
        }

        res.push("\n\n")
    }
    return res.length ? res.join('\n') : null;
};