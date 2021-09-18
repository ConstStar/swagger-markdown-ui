/**
 * Make camel case format
 */
module.exports = input =>
  input
    .replace(/\s+/g, '-')
    .replace(/^-*/gi, '')
    .replace(/-*$/gi, '');
