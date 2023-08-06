import Link from 'next/link'
import React, { ReactNode } from 'react'
import useScroll from '@/hooks/use-scroll'

export default function Layout({ children }: { children: ReactNode }) {
    const scrolled = useScroll(20)
    return (
        <div>
            <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-100 to-cyan-100"
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
                            <span className="text-black mr-1">Eigen</span>
                            <span className="text-indigo-600">Articles</span>
                        </p>
                    </Link>
                </div>
            </div>
            <main className="flex w-full flex-col items-center justify-center py-20">
                {children}
            </main>
        </div>
    )
}
