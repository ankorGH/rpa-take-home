import request, { Response } from 'supertest';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import app from '../../app';
import * as rpaService from '../../services/rpa';
import { ApplicationSubmissionResponseTypes } from '../../services/types';

describe('Application:Routes /forms/frontier/applications', () => {
  const baseURL = '/forms/frontier/applications';
  const applicationPayload = {
    firstname: 'Test',
    lastname: 'Lastname',
    phoneno: '+1 234 234 0000',
    email: 'testlast@gmail.com',
    location: 'London, UK',
    linkedin: 'linkedin.com/profile/me',
    resume:
      'https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx',
  };

  describe('POST /forms/frontier/applications', () => {
    it('Fails when payload doesnt conform to validation rules', async () => {
      const response: Response = await request(app).post(baseURL).send({});

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.message).toBe(ReasonPhrases.BAD_REQUEST);
      expect(response.body).toHaveProperty('errors');
      expect(Array.isArray(response.body.errors)).toBe(true);
    });

    it('Fails when application submission fails', async () => {
      jest.spyOn(rpaService, 'submitApplication').mockResolvedValueOnce({
        message: 'Application submission failed',
        type: ApplicationSubmissionResponseTypes.FAIL,
      });

      const response = await request(app)
        .post(baseURL)
        .send(applicationPayload);

      expect(response.status).toBe(StatusCodes.FAILED_DEPENDENCY);
      expect(response.body.message).toBe('Application submission failed');
    });

    it('Successful when application submission succeeds', async () => {
      jest.spyOn(rpaService, 'submitApplication').mockResolvedValueOnce({
        message: 'Application submission successful',
        type: ApplicationSubmissionResponseTypes.SUCCESS,
      });

      const response = await request(app)
        .post(baseURL)
        .send(applicationPayload);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.message).toBe('Application submission successful');
    });
  });
});
