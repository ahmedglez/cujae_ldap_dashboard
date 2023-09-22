const passwordValidator = require('password-validator')

const passwordSchema = new passwordValidator()

passwordSchema
  .is()
  .min(8)
  .is()
  .max(100) // You can adjust the maximum length as needed
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .symbols(1) // Must have at least 1 special symbol
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123', '123', 'admin', 'admin1234', '1234']) // Blacklist these values
  .is()
  .not()
  .oneOf(['AnotherWeakPassword', '12345678', 'qwerty']) // Add more weak passwords here

function getPasswordRequirements() {
  const requirements = [
    {
      id: 'min',
      error: 'At least 8 characters long'
    },
    {
      id: 'max',
      error: ` At most 100 characters long `
    },
    {
      id: 'uppercase',
      error: 'Must contain at least one uppercase letter'
    },
    {
      id: 'lowercase',
      error: 'Must contain at least one lowercase letter'
    },
    {
      id: 'digits',
      error: 'Must contain at least 2 digits'
    },
    {
      id: 'symbols',
      error: 'Must contain at least 1 special symbol'
    },
    {
      id: 'spaces',
      error: 'Should not contain spaces'
    },
    {
      id: 'common',
      error: 'Cannot be a common password'
    }
  ]

  return requirements
}

module.exports = {
  passwordSchema,
  getPasswordRequirements
}
