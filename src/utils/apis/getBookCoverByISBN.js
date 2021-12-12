const axios = require("axios");

const api = axios.create({ baseURL: "https://openlibrary.org/api/books" });

module.exports = async (ISBN) => {
  const { data } = await api.get(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${ISBN}&format=json`
  );

  return data[`ISBN:${ISBN}`]["thumbnail_url"];
};
