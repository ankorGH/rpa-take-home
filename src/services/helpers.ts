import fs from 'fs';
import request from 'request';

import { DownloadFileResponse } from './types';

export const downloadFile = (
  url: string,
  destination: string,
): Promise<DownloadFileResponse> =>
  new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    const response = request.get(url);

    response.on('response', () => {
      response.pipe(file);
    });

    file.on('finish', () => {
      file.close();

      resolve({
        destination,
        message: 'file downloaded successfully',
      });
    });

    response.on('error', async (err) => {
      await fs.promises.unlink(destination);

      reject({
        message: err.message,
      });
    });

    file.on('error', async (err) => {
      await fs.promises.unlink(destination);

      reject({
        message: err.message,
      });
    });
  });
