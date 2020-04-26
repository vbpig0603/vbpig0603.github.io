// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyCUuU-SCX9YPCst9SKucYGWU4TtwRNELFc",
  authDomain: "fcm-test-6ee3f.firebaseapp.com",
  databaseURL: "https://fcm-test-6ee3f.firebaseio.com",
  projectId: "fcm-test-6ee3f",
  storageBucket: "fcm-test-6ee3f.appspot.com",
  messagingSenderId: "512961993326",
  appId: "1:512961993326:web:d4de6e3444a66ec5ee247f",
  measurementId: "G-2ZR3YG24M1"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();