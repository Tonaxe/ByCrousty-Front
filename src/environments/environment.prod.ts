export const environment = {
  production: true,
  // In production, prefer the same origin or an HTTPS backend. Using an empty
  // string makes the app call the same origin (relative URLs) which avoids
  // mixed-content issues when the site is served over HTTPS.
  // Use the production domain explicitly so production builds point to the
  // HTTPS API instead of the public IP.
  apiUrl: 'https://bycrousty.achraf.es'
};
