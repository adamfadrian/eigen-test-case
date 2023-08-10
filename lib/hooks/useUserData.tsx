import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserData } from "store/reducers/user/userSelector";
import { resetUser, storeUser } from "store/reducers/userSlice";

export default function useUserData() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const currentUserData = useSelector(getCurrentUserData);

  useEffect(() => {
    // Need to sync between data local user
    if (!currentUserData && session?.user) {
      // @ts-ignore
      const userPayload = session?.user as UserStorePayload;
      dispatch(storeUser(userPayload));
    }
    if (!session?.user && currentUserData?.email) {
      dispatch(resetUser());
    }
  }, [currentUserData, dispatch, session]);

  return { session, status, currentUserData };
}
