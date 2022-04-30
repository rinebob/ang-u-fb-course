// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  // useEmulators: false,
  firebase: {
    apiKey: "AIzaSyBr80luI_4HGzjkJqspvVSmOVlCe9yOUgA",
    authDomain: "ang-u-fb-course.firebaseapp.com",
    projectId: "ang-u-fb-course",
    storageBucket: "ang-u-fb-course.appspot.com",
    messagingSenderId: "137200793159",
    appId: "1:137200793159:web:43efc52783ee87f008a362"
},
  api: {

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
