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
                        // Schema
                        if ('content' in responses[response]) {
                            let content = responses[response].content;
                            Object.keys(content).forEach(key => {
                                        if ('schema' in content[key]) {
                                            const schema = new Schema(content[key].schema);
                                            line.push(key)
                                            line.push(transformDataTypes(schema));

                                            schemas = true
                                        }

                                        res.push(`|${line.map(el => ` ${el} `).join('|')}|`);

                                //以便添加下一个请求头
                                line=[]
                                line.push(response);
                                line.push(description);
                            });
                        } else if (schemas) {
                            line.push('');
                            res.push(`|${line.map(el => ` ${el} `).join('|')}|`);
                        }else{
                            res.push(`|${line.map(el => ` ${el} `).join('|')}|`);
                        }
                    }
  });

  if(res.length==0){
    console.log(responses)
    return "无额外响应内容";
  }

  res.unshift(`| ---- | ----------- |${schemas ? ' ------ |------ |' : ''}`);
  res.unshift(`| 状态码 | 描述 |${schemas ? ' 请求头 | 返回类型 |' : ''}`);

  return res.join('\n');
};