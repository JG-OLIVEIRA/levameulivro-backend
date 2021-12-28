module.exports = (page, limit) => {
  let offset = 0;

  if (limit && page) {
    offset = limit * page - limit;
  }

  return { offset };
};
