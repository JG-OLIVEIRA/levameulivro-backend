module.exports = (page, count) => {
  let offset = 0;
  let limit = 10;

  if (count && page) {
    offset = count * page - count;
    limit = Number(count);
  }

  return { limit, offset };
};
