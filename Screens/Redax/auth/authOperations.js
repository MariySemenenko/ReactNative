import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from "../../Redax/config"
import { updateUser } from './sliseRegistration';

export const registerDB = ({ login, email, password }) => async (dispach) => {

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {displayName: login});
    const {displayName, uid} = auth.currentUser;
    dispach(updateUser({userId: uid, login: displayName, email}));
  } catch (error) {
    throw error;
  }
};

// або більш короткий запис цієї функції
// const registerDB = ({ email, password }) => 
//         createUserWithEmailAndPassword(auth, email, password);

const authStateChanged = async (onChange = () => {}) => {
        onAuthStateChanged((user) => {
                onChange(user);
        });
};

export const loginDB = ({ email, password }) => async (dispach) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
        return credentials.user;
  } catch (error) {
    throw error;
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