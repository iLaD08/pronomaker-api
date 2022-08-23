const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async () => {
  try {
    const siteUrl = "https://www.ruedesjoueurs.com/pronostics/foot.html";

    const { data } = await axios({
      method: "GET",
      url: siteUrl,
    });

    const $ = cheerio.load(data);

    const listDiv = $(
      "body > div.habillage > div:nth-child(8) > div.uk-grid.no-margin-small > div.uk-width-large-7-10.uk-width-medium-6-10.uk-width-small-1-1.content > section:nth-child(4) > ul > li > a > span"
    );

    const keys = [
      "time",
      "firstteam",
      "icons",
      "secondteam",
      "firstcote",
      "drawcote",
      "secondcote",
    ];

    var output = [];

    $(listDiv).each((idx, elm) => {
      let keyIdx = 0;
      matchObj = {};

      $(elm)
        .children()
        .each((cidx, celm) => {
          let value = $(celm).text();

          if (value) {
            $(celm).find("span > span").removeAttr("clear");
            matchObj[keys[keyIdx]] = value;

            keyIdx++;
          }
        });

      output.push(matchObj);
    });

    output.filter((elm) => {
      delete elm.icons;
    });

    output.forEach((obj, idx) => {
      obj.url = $(
        `body > div.habillage > div:nth-child(8) > div.uk-grid.no-margin-small > div.uk-width-large-7-10.uk-width-medium-6-10.uk-width-small-1-1.content > section:nth-child(4) > ul > li:nth-child(${
          idx + 1
        })`
      )
        .find("a")
        .attr("href");

      return obj;
    });

    return output;
  } catch (err) {
    return err;
  }
};
// $(this).find('br').length
