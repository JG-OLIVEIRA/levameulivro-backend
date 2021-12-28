module.exports = (page, limit) => {
  let offset = 0;

  if (count && page) {
    offset = count * page - limit;
  }

  return { offset };
};
