# RPA Take Home Test

Rest API for submitting applications on behalf of applicants

## Content

- [Getting-Started](#getting-started)
- [Endpoints Documentation](#endpoints-documentation)
- [Comments](#comments)
- [Technologies](#technologies)

## Getting Started

This project requires node version 12.21.0 or higher.

1. Create a .env

Create `.env` file in the root folder and copy contents `.env.sample` to it.

2. Install dependencies

```bash
 $ yarn install
```

3. Run

- Development

```bash
$ yarn start:dev
```

- Production

```
$ yarn start:prod
```

## Endpoints Documentation

POST `frontier/forms/applications/`

### Request Payload

| Name        | Description                           |
| ----------- | ------------------------------------- |
| `firstname` | First name of applicant               |
| `lastname`  | Last name of application              |
| `email`     | Email of applicant                    |
| `phoneno`   | Contact of applicant                  |
| `location`  | Location of applicant                 |
| `resume`    | Valid url to applicant's resume       |
| `linkedin`  | Valid url to applicant's linkedin url |

### Response Types

| Status code | Message                           |
| ----------- | --------------------------------- |
| `200`       | Application submission successful |
| `400`       | Validation Errors                 |
| `424`       | Submission to external ATS failed |
| `500`       | Unexpected error! Try again       |

eg

```
curl --request POST \
  --url http://localhost:9100/forms/frontier/applications \
  --header 'Content-Type: application/json' \
  --data '{
	"firstname": "Test",
	"lastname": "Last",
	"phoneno": "+233249404034",
	"location": "Accra, Ghana",
	"resume": "https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx",
	"linkedin": "https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx",
	"email": "testlast@gmail.com"
}'
```

## Comments

The synchronous nature of the current implementation makes the client wait for a longer period to receive a response.

An asynchronous implementation will be to queue all application request.
On completion, client application (browser, api service) will be sent a
response using websockets or api callback.

## Technologies

1. Nodejs
2. Typescript
3. Puppeteer
4. Express
