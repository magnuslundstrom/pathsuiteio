const mongoose = require('mongoose')

const validator = require('validator')

const camelCase = require('../utilFns/camelCase')

const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Please enter company name'],
      unique: true,
      trim: true,
    },
    companyEmail: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email')
        }
      },
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
)

CompanySchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'company',
})

CompanySchema.pre('save', function (next) {
  this.companyName = camelCase(this.companyName)
  next()
})

CompanySchema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    next({
      errors: {
        companyName: { message: 'Company already exists. Contact supervisor to get invited' },
      },
    })
  }
  next(error)
})

const Company = mongoose.model('Company', CompanySchema, 'companies')
module.exports = Company
