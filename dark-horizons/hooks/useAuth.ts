import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { PlayerData } from "@/types/player";

const DEFAULT_PLAYER_DATA: Omit<PlayerData, "uid" | "username" | "createdAt"> = {
  rank: "Noob",
  zenCoins: 0,
  pets: [],
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
    exotic: 0,
  },
  totalOresMined: 0,
  totalPetsCaught: 0,
  totalRolls: 0,
};

export async function registerUser(email: string, password: string, username: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  await setDoc(doc(db, "users", uid), {
    uid,
    username,
    ...DEFAULT_PLAYER_DATA,
    createdAt: serverTimestamp(),
  });

  return userCredential.user;
}

export async function loginUser(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export async function getUserData(uid: string): Promise<PlayerData | null> {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as PlayerData;
  }
  return null;
}
