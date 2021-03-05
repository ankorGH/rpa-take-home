import path from 'path';
import puppeteer, { Page } from 'puppeteer';

import {
  ApplicationSubmissionResponse,
  ApplicationSubmissionResponseTypes,
} from './types';
import { Config } from '../config';
import { downloadFile } from './helpers';
import { ApplicationPayload } from '../applications/types';

const launchForm = async (URL: string) => {
  const browser = await puppeteer.launch({
    headless: Config.IS_PUPPETEER_HEADLESS,
  });
  const page = await browser.newPage();
  page.goto(URL);

  return page;
};

const navigateToNextFormPage = async (page: Page, name: string) => {
  const [applyButton] = await page.$x(`//a[contains(., '${name}')]`);
  if (applyButton) {
    await applyButton.click();
  }
};

const typeDetail = async (page: Page, name: string, value: string) => {
  await page.type(`input[name=\'${name}\']`, value, {
    delay: 30,
  });
};

export const submitApplication = async (
  url: string,
  payload: ApplicationPayload,
): Promise<ApplicationSubmissionResponse> => {
  try {
    const page = await launchForm(url);
    await page.waitForNavigation({
      waitUntil: 'networkidle0',
    });

    await navigateToNextFormPage(page, 'Apply Now');
    await page.waitForNavigation({
      waitUntil: 'networkidle0',
    });

    await typeDetail(page, 'fullname', payload.firstname);
    await typeDetail(page, 'lastname', payload.lastname);
    await typeDetail(page, 'email', payload.email);
    await typeDetail(page, 'phoneno', payload.phoneno);

    await typeDetail(page, 'location', payload.location);
    await page.waitForSelector("div[role='option']");
    const location = await page.$("div[role='option']");
    await location?.click({ delay: 1000 });

    await typeDetail(page, 'linkedin', payload?.linkedin || '');
    await navigateToNextFormPage(page, 'Next');

    const filePath = path.join(
      __dirname,
      '../../Downloads',
      `application.rpa.${Date.now()}${path.extname(payload.resume)}`,
    );
    await downloadFile(payload.resume, filePath);

    const uploadFileInput = await page.$('input[type=file]');
    uploadFileInput?.uploadFile(filePath);
    await page.waitForTimeout(2000);

    await navigateToNextFormPage(page, 'Review & send');
    await page.waitForNavigation({
      waitUntil: 'networkidle0',
    });

    await navigateToNextFormPage(page, 'Send');
    await page.waitForSelector('h1');

    return {
      message: 'Application submission successful',
      type: ApplicationSubmissionResponseTypes.SUCCESS,
    };
  } catch (error) {
    return {
      message: 'Application submission failed',
      type: ApplicationSubmissionResponseTypes.FAIL,
    };
  }
};
