const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Date } = require("mongoose");
const { indexLogger } = require("../utils/indexLogger");

const MODELNAME = "user";

const Schema = new mongoose.Schema({
  name: { type: String, trim: true, unique: true, required: true },

  email: { type: String, trim: true },

  avatar: { type: String, default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" },
  banner: { type: String, default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" },

  password: { type: String },

  last_login_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },

  costPerDay: { type: Number, default: 100 },
  sellPerDay: { type: Number, default: 200 },

  days_worked: { type: Number, default: 23 },

  description: { type: String },
  job_title: { type: String },

  organisation: { type: String, trim: true, required: true },
  status: { type: String, default: "active" },
  availability: { type: String, default: "available" },
  address: { type: String },
});

Schema.index({ name: 1, organisation: 1 }, { unique: true });

Schema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.name = this.name.toLowerCase().trim();
  }

  if (this.isModified("organisation") || this.isNew) {
    this.organisation = this.organisation.toLowerCase().trim();
  }

  if (this.isModified("password") || this.isNew) {
    const SALT_ROUND = 10;

    this.password = bcrypt.hashSync(this.password, SALT_ROUND);
  }

  return next();
});

Schema.methods.comparePassword = function (p) {
  return bcrypt.compare(p, this.password || "");
};
const OBJ = mongoose.model(MODELNAME, Schema);

OBJ.on("index", indexLogger(MODELNAME));

module.exports = OBJ;
