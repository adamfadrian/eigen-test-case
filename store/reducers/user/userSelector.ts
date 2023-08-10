import { RootState } from "store/rootReducer";

export const getCurrentUserData = ({ user }: RootState) => {
  return user.currentUser;
};
