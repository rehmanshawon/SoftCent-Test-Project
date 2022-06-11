const Joi = require("joi");

const registrationValidation = (formData) => {
  const schema = Joi.object({
    userName: Joi.string().required().max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  });
  return schema.validate(formData);
};

const loginValidation = (formData) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  });
  return schema.validate(formData);
};

const createPartnerValidation = (formData) => {
  const schema = Joi.object({
    name: Joi.string().required().max(50),
    location: Joi.string().required().max(500),
    offerPercentage: Joi.number().required(),
    image: Joi.string().max(500),
  });
  return schema.validate(formData);
};

module.exports = {
  registrationValidation,
  loginValidation,
  createPartnerValidation,
};
