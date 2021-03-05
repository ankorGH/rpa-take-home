import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { Config } from '../config';
import { submitApplication } from '../services/rpa';
import { ApplicationPayload } from './types';
import { ApplicationSubmissionResponseTypes } from '../services/types';

export const submitCandidateDetails = async (req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    email,
    phoneno,
    location,
    linkedin,
    resume,
  } = req.body as ApplicationPayload;

  try {
    const applicationResponse = await submitApplication(Config.ATS_URL, {
      firstname,
      lastname,
      email,
      phoneno,
      location,
      linkedin,
      resume,
    });

    const statusCode =
      applicationResponse.type === ApplicationSubmissionResponseTypes.SUCCESS
        ? StatusCodes.OK
        : StatusCodes.FAILED_DEPENDENCY;

    return res.status(statusCode).json({
      message: applicationResponse.message,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Unexpected error! Try again',
    });
  }
};
