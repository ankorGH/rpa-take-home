import dotenv from 'dotenv';

dotenv.config();

export const Config = {
  PORT: process.env.PORT || 9100,
  ATS_URL: process.env.ATS_URL || 'https://frontier.jobs/jobs/190562',
  IS_PUPPETEER_HEADLESS: process.env.IS_PUPPETEER_HEADLESS === 'true',
};
