import React from 'react';
import Image from 'next/image';

const ImageWrapper = ({ src, alt }: { src: string, alt: string }) => {
    return (
        <Image src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: '240px', }}
        priority />
    );
};

export default ImageWrapper;
