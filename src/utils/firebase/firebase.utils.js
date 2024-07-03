import {initializeApp} from "firebase/app";
import {getAuth,
		GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD7P4AlSfehHpjhrRoZyOlbwtBtcy4I2xg",
  authDomain: "personal-blog-426f7.firebaseapp.com",
  projectId: "personal-blog-426f7",
  storageBucket: "personal-blog-426f7.appspot.com",
  messagingSenderId: "659256743236",
  appId: "1:659256743236:web:397be4fc34d59ce7937311"
};

const firebaseApp = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();

//------------------------------------DATABASE---------------------------------------------------//

export const database = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth,additionalInformation ={}) => {
  if(!userAuth) return;
  const userDocRef = doc(database,"users",userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if(!userSnapShot.exists()) {
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log("error creating the user",error.message);
    }
  }
  return userDocRef;
};
//------------------------------------EMAIL AND PASSWORD---------------------------------------------------//

export const createAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth,email,password)
};

export const SignInAuthUserWithEmailAndPassword = async (email,password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth,email,password)
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);