const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  user: {},
  log: { type: Schema.Types.Mixed, required: true },
});

module.exports = model("IntMap", schema);
