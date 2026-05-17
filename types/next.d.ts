import { Metadata } from 'next';

declare module 'next' {
  interface PageProps {
    params: {
      [key: string]: string | string[]
    }
    searchParams?: { [key: string]: string | string[] | undefined }
  }
}

declare module 'next/types' {
  interface PageProps {
    params: {
      [key: string]: string | string[]
    }
    searchParams?: { [key: string]: string | string[] | undefined }
  }
} 