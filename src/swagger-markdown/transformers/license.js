/**
 * http://swagger.io/specification/#licenseObject
 * License object transformer
 */
module.exports = license => {
    const res = [];
    if ('url' in license || 'name' in license) {
        res.push('**许可证:** ');
        if ('url' in license && 'name' in license) {
            res.push(`[${license.name}](${license.url})`);
        } else {
            res.push(license.name || license.url);
        }
        res.push('\n');
    }
    return res.length > 0 ? res.join('') : null;
};