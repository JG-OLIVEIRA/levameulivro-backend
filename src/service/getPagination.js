module.exports = (page, count) => {
  let offset = 0;

  if (count && page) {
    offset = count * page - count;
  }

  const limit = Number(count);

  return { limit, offset };
};
