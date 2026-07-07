import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7PWT2mFxWkpKwuN6gvtfmrn4nnoilxA8",
  authDomain: "packerspro-shrey.firebaseapp.com",
  projectId: "packerspro-shrey",
  storageBucket: "packerspro-shrey.firebasestorage.app",
  messagingSenderId: "232308768783",
  appId: "1:232308768783:web:6e49698f72ef13d378a37a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);