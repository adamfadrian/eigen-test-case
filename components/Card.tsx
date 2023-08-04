import { ReactNode } from "react";
import Image from "next/image";

export default function Card({
    title,
    description,
    demo,
    large,
}: {
    title: string;
    description: string;
    demo: string;
    large?: boolean;
}) {
    return (
        <div
            className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md ${large ? "md:col-span-2" : ""
                }`}
        >
            <div className="flex h-60 items-center justify-center ">
                <Image src={demo} alt={title} width={200} height={200} className="w-[200px] h-[200px] rounded-lg" priority />
            </div>
            <div className="mx-auto max-w-md text-center ">
                <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
                    <span>{title}</span>
                </h2>
                <div className="prose-sm -mt-2 leading-normal text-gray-500 md:prose">
                    {description}
                </div>
            </div>
        </div>
    );
}
