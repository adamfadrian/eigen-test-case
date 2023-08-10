import Link from 'next/link'
import React, { ReactNode, useCallback, useState } from 'react'
import useScroll from 'lib/hooks/use-scroll'
import { AnimatePresence, motion } from 'framer-motion'
import useUserData from '@/hooks/useUserData';
import { FADE_IN_ANIMATION_SETTINGS } from 'lib/constants';
import { useSignInModal } from '../sign-in-modal';
import { useSession, signIn, signOut } from "next-auth/react"
import { useDispatch, useSelector } from 'react-redux';
import { UserStorePayload, storeUser } from 'store/reducers/userSlice';
import LoadingDots from '../shared/icons/loading-dots';
import { getCurrentUserData } from 'store/reducers/user/userSelector';
// import UserDropdown from '../user-dropdown';

export default function Layout({
    children
}: {
    children: ReactNode
}) {

    const { SignInModal, setShowSignInModal } = useSignInModal();

    const user = useSelector(getCurrentUserData)
    const { session, status, currentUserData } = useUserData();
    const dispatch = useDispatch()
    const [signInClicked, setSignInClicked] = useState(false)
    // const { data: session, status } = useSession()
    const { email, image } = session?.user || {};
    // const { accessToken }: any = session
    console.log("Session:", currentUserData);
    console.log("email:", email);
    console.log("image:", image);
    // console.log("accessToken:", accessToken);

    console.log("Status:", status);

    console.log('user', user)
    const handleSignIn = useCallback(async () => {
        setSignInClicked(true);
        try {
            await signIn("google");
            dispatch(storeUser(session?.user as UserStorePayload));
        } catch (error) {
            console.error("Error signing in:", error);
        }
    }, [])

    const scrolled = useScroll(20)
    return (
        <>
            <SignInModal />
            <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-100 via-neutral-200 to-cyan-100"
                data-testid="gradient-bg" />
            <div
                className={`fixed top-0 w-full ${scrolled
                    ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
                    : "bg-white/0"
                    } z-30 transition-all`}
                data-testid="layout-header">
                <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
                    <Link href="/" className="flex items-center font-display text-2xl">
                        <p>
                            <span className="text-black ">Eigen</span>
                            <span className="text-indigo-600 ml-1">Articles</span>
                        </p>
                    </Link>

                    <div>
                       

                        <AnimatePresence>
                            {!session && status !== "loading" ? (
                                <motion.button
                                    className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                                    onClick={() => setShowSignInModal(true)}
                                    {...FADE_IN_ANIMATION_SETTINGS}
                                >
                                    Sign In
                                </motion.button>
                            ) : (
                                <>  
                                <div className='flex flex-col'>
                                    <div className='flex bg-red-500'>
                                        <img src={image ? image : ""} alt="test" />
                                        <h1>{email}</h1>
                                    </div>
                                    <button onClick={() => signOut()}>
                                        Logout
                                    </button>
                                </div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <main className="flex w-full py-36 justify-center">
                {children}
            </main>
        </>
    )
}
