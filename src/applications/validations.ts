import { body } from 'express-validator';

export const validations = {
  submitCandidateDetailsValidation: [
    body('firstname').notEmpty().withMessage('Firstname is required'),
    body('lastname').notEmpty().withMessage('Lastname is required'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email should be valid'),
    body('phoneno')
      .notEmpty()
      .withMessage('Phone number is required')
      .isMobilePhone('any')
      .withMessage('Enter a valid phone number'),
    body('location').notEmpty().withMessage('Location is required'),
    body('resume')
      .notEmpty()
      .withMessage('Resume is required')
      .isURL()
      .withMessage('Resume should be a valid URL'),
    body('linkedin')
      .isURL()
      .withMessage('Linkedin/Github profile should be a valid URL'),
  ],
};
