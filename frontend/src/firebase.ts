// // // // Import the functions you need from the SDKs you need
// // // import { initializeApp } from "firebase/app";
// // // import { getAnalytics } from "firebase/analytics";
// // // // TODO: Add SDKs for Firebase products that you want to use
// // // // https://firebase.google.com/docs/web/setup#available-libraries

// // // // Your web app's Firebase configuration
// // // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // // const firebaseConfig = {
// // //   apiKey: "AIzaSyCH5iH4PpbZ_VT-hQpwOOp-GykxialWNHY",
// // //   authDomain: "hackoholics-b7796.firebaseapp.com",
// // //   projectId: "hackoholics-b7796",
// // //   storageBucket: "hackoholics-b7796.firebasestorage.app",
// // //   messagingSenderId: "525734084610",
// // //   appId: "1:525734084610:web:86799b53061d5d8a15271b",
// // //   measurementId: "G-1LNVNZSB5R"
// // // };

// // // // Initialize Firebase
// // // const app = initializeApp(firebaseConfig);
// // // const analytics = getAnalytics(app);



// // // Import Firebase core
// // import { initializeApp } from "firebase/app";

// // // Firebase services
// // import { getAuth } from "firebase/auth";
// // import { getFirestore } from "firebase/firestore";
// // import { getAnalytics } from "firebase/analytics";

// // // Firebase config
// // const firebaseConfig = {
// //   apiKey: "AIzaSyCH5iH4PpbZ_VT-hQpwOOp-GykxialWNHY",
// //   authDomain: "hackoholics-b7796.firebaseapp.com",
// //   projectId: "hackoholics-b7796",
// //   storageBucket: "hackoholics-b7796.firebasestorage.app",
// //   messagingSenderId: "525734084610",
// //   appId: "1:525734084610:web:86799b53061d5d8a15271b",
// //   measurementId: "G-1LNVNZSB5R"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);

// // // Initialize services
// // export const auth = getAuth(app);
// // export const db = getFirestore(app);
// // export const analytics = getAnalytics(app);




// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "hackoholics-b7796.firebaseapp.com",
//   projectId: "hackoholics-b7796",
//   storageBucket: "hackoholics-b7796.appspot.com",
//   messagingSenderId: "525734084610",
//   appId: "1:525734084610:web:86799b53061d5d8a15271b"
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCH5iH4PpbZ_VT-hQpwOOp-GykxialWNHY",
  authDomain: "hackoholics-b7796.firebaseapp.com",
  projectId: "hackoholics-b7796",
  storageBucket: "hackoholics-b7796.firebasestorage.app",
  messagingSenderId: "525734084610",
  appId: "1:525734084610:web:86799b53061d5d8a15271b",
  measurementId: "G-1LNVNZSB5R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);