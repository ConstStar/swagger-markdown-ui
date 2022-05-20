const Schema = require('../models/schema');
const transformDataTypes = require('./dataTypes');

/**
 * Build responses table
 * @param {object} responses
 * @returns {null|string}
 */
module.exports = (responses, responsesPublic) => {

        const res = [];
        let schemas = false

        Object.keys(responses).forEach(response => {
                    if (!(response in responsesPublic)) {

                        let line = [];
                        // Response
                        line.push(response);

                        let description = '';
                        // Description
                        if ('description' in responses[response]) {
                            description = responses[response].description.replace(/[\r\n]/g, ' ');
                            line.push(description);
                        } else {
                            line.push('');
                        }

                        let content = responses[response];

                        if ('schema' in content) {
                            const schema = new Schema(content.schema);
                            line.push(transformDataTypes(schema));

                            schemas = true
                        } else if (schemas) {
                            line.push('');
                        }

                        res.push(`|${line.map(el => ` ${el} `).join('|')}|`);
                    }
  });

  if(res.length==0){
    console.log(responses)
    return "无额外响应内容";
  }

  res.unshift(`| ---- | ----------- |${schemas ? ' ------ |' : ''}`);
  res.unshift(`| 状态码 | 描述 |${schemas ? ' 返回类型 |' : ''}`);

  return res.join('\n');
};