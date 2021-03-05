declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    ATS_URL: string;
    IS_PUPPETEER_HEADLESS: string;
  }
}
