
import { firebaseConfig } from './firebase-config';

export const environment = {
  production: true,
  useEmulators: false,
  firebase: firebaseConfig,
  api: {
    createUser: ' https://us-central1-ang-u-fb-course.cloudfunctions.net/createUser',
  }
};
