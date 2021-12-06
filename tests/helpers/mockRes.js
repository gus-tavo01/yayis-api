const { getMockRes } = require('@jest-mock/express');
const httpResponse = require('../../common/httpResponse');
const httpVerbs = require('../../common/constants/httpVerbs');
const capitalize = require('../../common/utils/capitalize');

module.exports = () => {
  const { res } = getMockRes();

  httpVerbs.forEach((m) => {
    const c = capitalize(m);
    res[c] = httpResponse[m];
  });
  return res;
};
