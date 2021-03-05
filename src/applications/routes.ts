import express from 'express';

import { validations } from './validations';
import { validationMiddleware } from '../middlewares/validator';
import { submitCandidateDetails } from './controller';

const router = express.Router();

router.post(
  '/',
  validations.submitCandidateDetailsValidation,
  validationMiddleware,
  submitCandidateDetails,
);

export const applicationRouter = router;
