const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  layout: { type: String, required: true },
  listOfAreas: { type: Schema.Types.Mixed, required: true },
  listOfIncidents: { type: Schema.Types.Mixed, required: true },
  wrapper: { type: Schema.Types.Mixed, required: true },
});

module.exports = model("IntMap", schema);
