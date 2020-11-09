const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  layout: { type: String, required: true },
  listOfAreas: { type: Object, default: true },
  listOfIncidents: { type: Object, default: true },
  owner: { type: Types.ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("IntMap", schema);
