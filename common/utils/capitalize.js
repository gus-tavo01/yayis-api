module.exports = (str) => {
  const [c] = str;
  return str.replace(c, c.toUpperCase());
};
