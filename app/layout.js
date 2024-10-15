'use client';
import "./globals.css";

import { SessionProvider } from 'next-auth/react'; // นำเข้า SessionProvider
import { useSession, signOut } from 'next-auth/react';
import Swal from 'sweetalert2';
import Head from 'next/head'; // เพิ่มการนำเข้า Head

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <SessionProvider>
        <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}

function Navbar() {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    Swal.fire({
      title: 'Logged Out!',
      text: 'You have been logged out successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      signOut();
    });
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-bold">MyApp</h1>
        <div className="flex space-x-4">
          {status === 'loading' ? (
            <p className="text-white">Loading...</p>
          ) : session ? (
            <>
              <span className="text-white">{session.user.name || session.user.email}</span>
              <button
                className="text-white hover:text-gray-300"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                className="text-white hover:text-gray-300"
                onClick={() => window.location.href = '/auth/signin'}
              >
                Sign In
              </button>
              <button
                className="text-white hover:text-gray-300"
                onClick={() => window.location.href = '/auth/signup'}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
