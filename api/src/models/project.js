const mongoose = require("mongoose");
const { indexLogger } = require("../utils/indexLogger");

const MODELNAME = "project";

const Schema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
  website: { type: String },

  links: { type: [{ label: { type: String }, url: { type: String } }] },
  lead: { type: String },

  type: { type: String, enum: ["prospection", "startup-project", "startup-invest", "admin"] },

  paymentCycle: { type: String, enum: ["MONTHLY", "ONE_TIME"], default: "MONTHLY" },

  organisation: { type: String, trim: true },
  logo: { type: String, default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" },
  background: { type: String, default: "" },
  objective: { type: String },
  budget_max_monthly: { type: Number },
  created_at: { type: Date, default: Date.now },
  last_updated_at: { type: Date, default: Date.now },
  status: { type: String },
});

const OBJ = mongoose.model(MODELNAME, Schema);

OBJ.on("index", indexLogger(MODELNAME));

module.exports = OBJ;
