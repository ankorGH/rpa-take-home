export enum ApplicationSubmissionResponseTypes {
  SUCCESS = 'success',
  FAIL = 'fail',
}

export interface ApplicationSubmissionResponse {
  message: string;
  type: ApplicationSubmissionResponseTypes;
}

export interface DownloadFileResponse {
  message: string;
  destination?: string;
}
