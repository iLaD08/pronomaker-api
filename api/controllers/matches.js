const getMatches = require("../utils/getMatches");
const getDescription = require("../utils/getDescription");

exports.matchesRoute = async (req, res) => {
  try {
    const statsData = await getMatches();

    return res.status(200).json(statsData);
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
};

exports.descriptionRoute = async (req, res) => {
  const link = req.params.link;

  try {
    const descriptionData = await getDescription(link);

    return res.status(200).json(descriptionData);
  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
};
