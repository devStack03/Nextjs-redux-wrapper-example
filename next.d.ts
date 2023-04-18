import type { ReactElement, ReactNode } from 'react';
import type {
  NextComponentType,
  NextPageContext
} from 'next/dist/shared/lib/utils';
import { Store } from '@reduxjs/toolkit';

declare module 'next' {
  export declare type NextPage<P = {}, IP = P> = NextComponentType<
    NextPageContext,
    IP,
    P
  > & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

declare module 'next/app' {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextComponentType;
  };
}

