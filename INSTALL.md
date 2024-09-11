# Requirements

Node version 20.x.x (install at https://nodejs.org/en)

# Installation

1. Clone repo: `git clone git@github.com:RPI-ITWS/itws4500-team11.git <folder-name>`
2. Install dependencies: `cd <folder-name>/RPI-Events` and `npm i`
3. Recreate Mongo database: 
- Go to https://www.mongodb.com/lp/cloud/atlas/try4 and create a new database called `RPI-Events`
- Create a .env file in `<folder-name>` and put in `MONGODB=<connection-string>/RPI-Events`
4. Recreate Firebase app: 
- Go to https://console.firebase.google.com/ and create a new project called `rpi-events`
- Add authentication to the project and add the Email/Password and Google sign-in methods
- Create `.firebaseConfig.js` in `/RPI-Events/src/FireBase/` and put in the project's config (Overview -> Settings -> Scroll down)

Ex:
```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
...
};

// Initialize Firebase
- create a firebase project at https://firebase.google.com/?gad_source=1&gclid=CjwKCAjw26KxBhBDEiwAu6KXt5mvvRJXy3bhTjj5DkAHfSoVDAYWgsudNTG6rNUTFPZMACMuykySBRoCuIAQAvD_BwE&gclsrc=aw.ds
- enable Email/Password and Google for sign-in method under Authentication (under Build)
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```
- Create `.serviceAccountKey.json` for `/RPI-Events`
    a. get .serviceAccountKey.json is avilable at
    https://console.firebase.google.com/u/0/project/<project>/settings/serviceaccounts/adminsdk
    b. place it under /RPI-Events/

Ex:
```
{
  "type": ...,
  "project_id": ...,
  "private_key_id": ...,
  "private_key": ...,
  "client_email": ...,
  "client_id": ...,
  "auth_uri": ...,
  "token_uri": ...,
  "auth_provider_x509_cert_url": ...,
  "client_x509_cert_url": ...,
  "universe_domain": ...
}
```
- In `/.env`, add `FIREBASE_SERVICE_ACCOUNT=<client_email>` under `MONGODB=<connection string>/RPI-Events`
    a. client_email is accessible under .serviceAccountKey.json
5. Build application: In `/RPI-Events`, run `npm run build`
6. Start application in same directory: `node --env-file=../.env server`. Go to http://localhost:3000
