const express = require("express");
const router = express.Router();

const { matchesRoute, descriptionRoute } = require("../controllers/matches");

router.get("/", (req, res) => {
  res.status(200).json({
    message: `This is /market page to get data visit /market/list or /market/stats`,
  });
});

router.get("/list", matchesRoute);
router.get("/get/:link", descriptionRoute);

module.exports = router;
