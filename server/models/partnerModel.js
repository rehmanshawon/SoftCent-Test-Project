const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Unnamed",
    },
    location: {
      type: String,
      required: true,
    },
    offerPercentage: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Partner = mongoose.model("Partner", partnerSchema);
module.exports = Partner;
