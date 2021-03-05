import { Express } from 'express';
import path from 'path';
import fs from 'fs';

import app from './app';
import { Config } from './config';

const setupServer = async (expressApp: Express): Promise<void> => {
  const downloadsFolderPath = path.join(__dirname, '../Downloads');

  try {
    fs.accessSync(downloadsFolderPath, fs.constants.F_OK);
  } catch (err) {
    fs.mkdirSync(downloadsFolderPath);
  }

  expressApp.listen(Config.PORT, () => {
    console.log(`Listening on port: ${Config.PORT}`);
  });
};

setupServer(app);
