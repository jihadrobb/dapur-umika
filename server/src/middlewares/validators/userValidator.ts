import { body, CustomValidator } from 'express-validator'
import { User } from '../../models'
import bcrypt from 'bcrypt'

export default class UserValidator {
  static checkRegister() {
    return [
      body('username')
        .notEmpty()
        .withMessage('Email should not be empty')
        .bail()
        .custom(userAlreadyExist),
      body('password')
        .notEmpty()
        .withMessage('Password should not be empty')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Password should be min 5 characters')
    ]
  }

  static checkLogin() {
    return [
      body('username')
        .notEmpty()
        .withMessage('Email should not be empty')
        .bail()
        .custom(isUsernameRegistered),
      body('password')
        .notEmpty()
        .withMessage('Password should not be empty')
        .bail()
        .custom(isPasswordWrong)
    ]
  }

  static checkEditUser() {
    return [
      body('username')
        .notEmpty()
        .withMessage('Username should not be empty')
        .bail()
        .isEmail()
        .withMessage('Invalid Email')
    ]
  }

  static checkChangePassword() {
    return [
      body('oldPassword')
        .notEmpty()
        .withMessage('Password should not be empty')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Password should be min 5 characters'),
      body('newPassword')
        .notEmpty()
        .withMessage('Password should not be empty')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Password should be min 5 characters')
    ]
  }
}

const userAlreadyExist: CustomValidator = (value) => {
  return User.findOne({ where: { username: value } }).then((user) => {
    if (user) {
      return Promise.reject('Username is already taken')
    }
  })
}

const isUsernameRegistered: CustomValidator = (value) => {
  return User.findOne({ where: { username: value } }).then((user) => {
    if (!user) {
      return Promise.reject('You are not registered')
    }
  })
}

const isPasswordWrong: CustomValidator = (value, { req }) => {
  return User.findOne({ where: { username: req.body.username } }).then(
    (user) => {
      if (user && !bcrypt.compareSync(value, user.getDataValue('password'))) {
        return Promise.reject('Wrong Password')
      }
    }
  )
}
