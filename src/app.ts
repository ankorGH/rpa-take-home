import express from 'express';

import { applicationRouter } from './applications';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/forms/frontier/applications', applicationRouter);

export default app;
