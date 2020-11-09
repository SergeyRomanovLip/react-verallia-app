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
    const newState = {
      layout: req.body.newState.layout,
      listOfAreas: req.body.newState.listOfAreas,
      listOfIncidents: req.body.newState.listOfIncidents,
      owner: req.user.userId,
    };
    let result = await IntMap.findOneAndUpdate(
      { owner: req.user.userId },
      newState,
      {
        new: true,
        upsert: true,
      },
      function (err, result) {
        if (err) return res.status(500).json(err);
        return res.status().json(intMap);
      }
    );
    result.save();
  } catch (e) {
    res.status().json(e);
  }
});

module.exports = router;
