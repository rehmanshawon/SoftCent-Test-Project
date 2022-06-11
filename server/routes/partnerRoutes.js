const express = require("express");
const asyncHandler = require("express-async-handler");
const Partner = require("../models/partnerModel");
const { createPartnerValidation } = require("../validation/validate");
var mongoose = require("mongoose");

const router = express.Router();

router.post(
  "/create",
  asyncHandler(async (req, res, next) => {
    const { error } = createPartnerValidation(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      next(err);
    }
    const { name, location, offerPercentage, image } = req.body;
    Partner.create({
      name,
      location,
      offerPercentage,
      image,
    })
      .then((partner) => {
        res.json({
          _id: partner._id,
          name: partner.name,
          location: partner.location,
          offerPercentage: partner.offerPercentage,
          image: partner.image,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  })
);

router.get(
  "/partners",
  asyncHandler(async (req, res, next) => {
    Partner.find({})
      .then(function (partners) {
        res.json(partners);
      })
      .catch((err) => {
        res.send(err);
      });
  })
);

router.get(
  "/partner/:id",
  asyncHandler(async (req, res, next) => {
    var id = req.params.id;
    Partner.findById(id)
      .then(function (partner) {
        res.json(partner);
      })
      .catch((err) => {
        res.send(err);
      });
  })
);

router.delete(
  "/delete/:id",
  asyncHandler(async (req, res, next) => {
    var id = req.params.id;
    Partner.deleteOne({ _id: id })
      .then(function (partner) {
        res.json({ message: "deleted", _id: id });
      })
      .catch((err) => {
        res.send(err);
      });
  })
);

router.put(
  "/update/:id",
  asyncHandler(async (req, res, next) => {
    const { name, location, offerPercentage, image } = req.body;
    var id = req.params.id;
    Partner.findByIdAndUpdate(id, {
      name,
      location,
      offerPercentage,
      image,
    })
      .then(function (partner) {
        res.json({ message: "updated", _id: partner._id });
      })
      .catch((err) => {
        res.send(err);
      });
  })
);

module.exports = router;
