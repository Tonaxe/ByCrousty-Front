// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Base URL of your backend API. For a secure site served over HTTPS use the same
  // origin or a relative path so the browser won't block mixed content. Using an
  // empty string makes requests go to the web origin (e.g. https://bycrousty.achraf.es).
  // Example: ''  (results in '/api/v1/...') or 'https://bycrousty.achraf.es'
  // Use the production domain explicitly to ensure the app calls the HTTPS API
  // and avoid mixed-content issues. If you prefer relative calls, set this to
  // an empty string ('') so requests go to the same origin as the frontend.
  apiUrl: 'https://bycrousty.achraf.es'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
