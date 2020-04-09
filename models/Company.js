const mongoose = require('mongoose')
const validator = require('validator')

const CompanySchema = new mongoose.Schema({
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
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  paths: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Path',
    },
  ],
  logo: {
    type: Buffer,
  },
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
