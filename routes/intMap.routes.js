const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const IntMap = require("../models/IntMap");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/update", auth, async (req, res) => {
  console.log(req.body.newState.layout);
  try {
    const intMap = new IntMap({
      layout: req.body.newState.layout,
      listOfAreas: req.body.newState.listOfAreas,
      listOfIncidents: req.body.newState.listOfIncidents,
      wrapper: req.body.newState.wrapper,
    });
    await intMap.save();
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
