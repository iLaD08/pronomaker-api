const axios = require("axios");
const cheerio = require("cheerio");
const translate = require("translate");

module.exports = async (link) => {
  try {
    const siteUrl = `https://www.ruedesjoueurs.com/pronostic/${link}`;

    const { data } = await axios({
      method: "GET",
      url: siteUrl,
    });

    const $ = cheerio.load(data);
    var transText = `${$("#ViewPay_Article > p:nth-child(6)").text()} ${$(
      "#ViewPay_Article > div.margin-top > p:nth-child(4)"
    ).text()}`;
    var output = {};

    const translated_string = await translate(transText, {
      from: "fr",
      to: "en",
    });

    output.french = transText;
    output.english = translated_string;

    return output;
  } catch (err) {
    return err;
  }
};
// $(this).find('br').length
