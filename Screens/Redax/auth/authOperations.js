import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut,
} from 'firebase/auth';
import { auth } from "../../Redax/config"
import { updateUser, authSignOut, authStateChange } from './sliseRegistration';

//export const registerDB = ({ login, email, password }) => async (dispach) => {

export const authStateChanged = () => async (dispach) =>{
  onAuthStateChanged(auth, (user) => {
      if (user) {
          const {uid, displayName, email} = auth.currentUser;
          dispach(updateUser({userId: uid, login: displayName, email}));
      } 
      dispach(authStateChange({stateChange: true}))
    });
}


export const registerDB = ({ login, email, password, photoURL }) => async (dispach) => {
try {
  await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, {displayName: login, photoURL});
  // console.log("auth.currentUser", auth.currentUser)
  const {displayName, uid} = auth.currentUser;
  await dispach(updateUser({userId: uid, login: displayName, email, photoURL}));
} catch (error) {
  throw error;
}
};

export const loginDB = ({ email, password }) => async () => {
try {
  await signInWithEmailAndPassword(auth, email, password);
      return credentials.user;
} catch (error) {
  throw error;
}
};

export const authLogOut = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error", error.message);
  }
};

export const removeUserAvatar = (photoURL) => async (dispatch) => {
  try {
    await updateProfile(auth.currentUser, { photoURL });

    await dispatch(
      updateUserProfile({
        userId: auth.currentUser.uid,
        login: auth.currentUser.displayName,
        photoURL,
      })
    );
    console.log('user: ', user);
  } catch (error) {
    console.log('error: ', error, error.message);
  }
};


const updateUserProfile = async (update) => {

const user = auth.currentUser;

// якщо такий користувач знайдений
if (user) {

// оновлюємо його профайл
      try {
          await updateProfile(user, update);
      } catch(error) {
          throw error
      }
}
};