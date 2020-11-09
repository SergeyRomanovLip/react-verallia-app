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
  const newState = {
    layout: req.body.newState.layout,
    listOfAreas: req.body.newState.listOfAreas,
    listOfIncidents: req.body.newState.listOfIncidents,
    owner: req.user.userId,
  };
  try {
    let result = await IntMap.findOneAndUpdate(
      { owner: req.user.userId },
      newState,
      {
        new: true,
        upsert: true,
      }
    );
    result.save();
  } catch (e) {
    res.status().json(e);
  }
});

// router.post("/update", auth, async (req, res) => {
//   try {
//     const existingData = await IntMap.findOne({ owner: req.user.userId });
//     res.json(existingData);
//   } catch (e) {
//     res.status(500).json({ message: e });
//   }
// });

module.exports = router;
