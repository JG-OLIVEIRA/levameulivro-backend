module.exports = (page, limit) => {
  let offset = 0;

  if (count && page) {
    offset = limit * page - limit;
  }

  return { offset };
};
