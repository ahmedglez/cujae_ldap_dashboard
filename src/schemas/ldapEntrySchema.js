import Joi from 'joi'

const ldapEntrySchema = Joi.object({
  CI: Joi.string().required(),
  lastName: Joi.string().required(),
  name: Joi.string().required(),
  homeAddress: Joi.string().required(),
  middleName: Joi.string().required(),
  telephoneNumber: Joi.string().required(),
  sex: Joi.string().valid('M', 'F').required(),
  area: Joi.string().allow(null).required(),
  userStatus: Joi.string().required(),
  sedeMunicipio: Joi.string().required(),
  userType: Joi.string().required(),
  country: Joi.string().required(),
  UJC: Joi.string().required(),
  skinColor: Joi.string().required(),
  nameInstitution: Joi.string().required(),
  uid: Joi.string().required(),
  givenName: Joi.string().required(),
  cn: Joi.string().required(),
  sn: Joi.string().required(),
  displayName: Joi.string().required(),
  userPassword: Joi.string().required(),
  mail: Joi.array().items(Joi.string()).required(),
  maildrop: Joi.array().items(Joi.string()).required(),
  objectClass: Joi.array().items(Joi.string()).required()
})

const ldapStudentSchema = Joi.object({
  userInformation: Joi.string().required(),
  career: Joi.string().required(),
  studentClassGroup: Joi.string().required(),
  studentYear: Joi.string().required(),
  userCondition: Joi.string().required()
})

export { ldapEntrySchema }
