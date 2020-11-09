const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const IntMap = require("../models/IntMap");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.get("/getState", auth, async (req, res) => {
  try {
    const existingData = await IntMap.findOne({ owner: req.user.userId });
    res.json(existingData);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.post("/update", auth, async (req, res) => {
  try {
    const intMap = new IntMap({
      intMap: {
        layout: req.body.newState.layout,
        listOfAreas: req.body.newState.listOfAreas,
        listOfIncidents: req.body.newState.listOfIncidents,
        owner: req.user.userId,
      },
    });
    intMap.save(function (err, intMap) {
      if (err) return console.error(err);
    });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

module.exports = router;
