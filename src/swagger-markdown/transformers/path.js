const inArray = require('../lib/inArray');
const transformResponses = require('./pathResponses');
const transformParameters = require('./pathParameters');
const security = require('./security');

/**
 * Allowed methods
 * @type {string[]}
 */
const ALLOWED_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options'];

module.exports = (path, data, parameters, tags, responsesPublic) => {
    let pathParameters = null;

    if (path && data) {
        // // Make path as a header
        // res.push(`### ${path}\n`);

        // Check if parameter for path are in the place
        if ('parameters' in data) {
            pathParameters = data.parameters;
        }

        // Go further method by methods
        Object.keys(data).map(method => {
            if (inArray(method, ALLOWED_METHODS)) {
                // Set method as a subheader
                // res.push(`#### ${method.toUpperCase()}`);
                const pathInfo = data[method];

                if (tags[pathInfo.tags] == undefined)
                    tags[pathInfo.tags] = []

                // Set summary
                if ('summary' in pathInfo) {
                    tags[pathInfo.tags].push(`#### ${pathInfo.summary}\n`);
                }
                tags[pathInfo.tags].push(`${method.toUpperCase()}: ${path}\n`);

                // Set description
                if ('description' in pathInfo) {
                    tags[pathInfo.tags].push(`##### 描述:\n\n${pathInfo.description}\n`);
                }

                // Build parameters
                if ('parameters' in pathInfo || pathParameters) {
                    tags[pathInfo.tags].push(`${transformParameters(pathInfo.parameters, pathParameters, parameters)}\n`);
                }

                // Build responses
                if ('responses' in pathInfo) {
                    tags[pathInfo.tags].push(`##### 响应\n${transformResponses(pathInfo.responses,responsesPublic)}\n`);
                }

                // Build security
                if ('security' in pathInfo) {
                    tags[pathInfo.tags].push(`${security(pathInfo.security)}\n`);
                }

                tags[pathInfo.tags].push("\n")
            }

        });
    }
    return tags;
};