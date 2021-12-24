require("dotenv").config();
const axios = require("axios");

const api = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes",
});

module.exports = async (ISBN) => {
  const { data } = await api.get(`?q=isbn:${ISBN}&${process.env.API_KEY}`);

  return data["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"];
};
