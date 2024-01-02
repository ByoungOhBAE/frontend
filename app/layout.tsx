// Layout.tsx
'use client';

import React, { ReactNode } from 'react';

import { useRouter } from 'next/navigation';
import { TransitionGroup, Transition } from 'react-transition-group';
import { Inter } from 'next/font/google';
import './globals.css';

interface IProps {
  children: ReactNode;
}

const TIMEOUT = 150;
const getTransitionStyles = {
  entering: {
    position: 'absolute',
    opacity: 0
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0
  }
};

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: IProps) => {
  const router = useRouter();

  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className='relative h-[100%]'>
          
          <TransitionGroup style={{ position: 'relative' }}>
            <Transition
              key={router.pathname}
              timeout={{
                enter: TIMEOUT,
                exit: TIMEOUT
              }}
            >
              {(status) => (
                <div
                  style={{
                    ...getTransitionStyles[status]
                  }}
                >
                  <main>
                    <div className='h-[100%] w-[100%] p-[2em]'>{children}</div>
                  </main>
                </div>
              )}
            </Transition>
          </TransitionGroup>
        </div>
      </body>
    </html>
  );
};

export default Layout;
