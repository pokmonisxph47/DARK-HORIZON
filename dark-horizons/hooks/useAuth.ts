import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

// Default data every new player starts with
const DEFAULT_USER_DATA = {
  rank: "Noob",
  zenCoins: 0,
  pets: [] as string[],
  ores: {
    stone: 0,
    iron: 0,
    crystal: 0,
    mystic: 0,
    dark: 0,
  },
  balls: {
    basic: 0,
    iron: 0,
    crystal: 0,
    mystic: 0,
    dark: 0,
  },
};

// Register a brand new account
export async function registerUser(email: string, password: string, username: string) {
  // 1. Create account in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  // 2. Save their game data in Firestore
  await setDoc(doc(db, "users", uid), {
    uid,
    username,
    ...DEFAULT_USER_DATA,
    createdAt: new Date().toISOString(),
  });

  return userCredential.user;
}

// Login an existing account
export async function loginUser(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// Logout
export async function logoutUser() {
  await signOut(auth);
}

// Fetch game data for a user from Firestore
export async function getUserData(uid: string) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}
