// src/components/ClientSideImage.tsx
'use client';

import React from 'react';
import Image, { ImageProps } from 'next/image';

interface ClientSideImageProps extends ImageProps {
  alt: string; // Make alt prop required
}

const ClientSideImage: React.FC<ClientSideImageProps> = (props) => {
  const { onError, alt, ...rest } = props;

  return (
    <Image
      alt={alt}
      {...rest}
      onError={(e) => {
        if (onError) {
          onError(e);
        } else {
          e.currentTarget.src = '/images/placeholder.jpg';
          console.error('Failed to load image:', props.src);
        }
      }}
    />
  );
};

export default ClientSideImage;