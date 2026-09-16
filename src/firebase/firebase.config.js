import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyBu8To2RL8PllziNnDpsvuiM0Ov-MB1oyU",
//   authDomain: "cafe-boss-restaurant.firebaseapp.com",
//   projectId: "cafe-boss-restaurant",
//   storageBucket: "cafe-boss-restaurant.firebasestorage.app",
//   messagingSenderId: "486368762147",
//   appId: "1:486368762147:web:63325016c1dce07d789496",
//   measurementId: "G-FFB7P5JR69"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);