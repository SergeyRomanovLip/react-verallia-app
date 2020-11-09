const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  intMap: {
    layout: { type: String, required: true, unique: false },
    listOfAreas: { type: Schema.Types.Mixed, required: true, unique: false },
    listOfIncidents: {
      type: Schema.Types.Mixed,
      required: true,
      unique: false,
    },
    owner: { type: Types.ObjectId, ref: "User" },
    created: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = model("IntMap", schema);
