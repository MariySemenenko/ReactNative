import { useSelector } from 'react-redux';
import { selectAuthState } from '../Redax/auth/authSelectors';

export const useAuth = () => {
  const authState = useSelector(selectAuthState);

  return { authState };
};