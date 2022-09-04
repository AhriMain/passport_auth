const { Schema, model, Types } = require("mongoose");

const refreshSchema = new Schema({
  user: Types.ObjectId,
  token: String,
});

module.exports = new model("Refresh", refreshSchema);
