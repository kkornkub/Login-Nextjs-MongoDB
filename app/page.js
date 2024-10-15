'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
    });

    if (result.isConfirmed) {
      signOut(); // Perform sign out
      Swal.fire(
        'Logged Out!',
        'You have been logged out successfully.',
        'success'
      ).then(() => {
        router.push('/'); // Redirect to homepage or desired page
      });
    }
  };

  if (session) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome, {session.user.email}</h1>
        <p className="text-center mb-6">You are logged in as {session.user.name || session.user.email}</p>
        <button
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
      <p className="text-center mb-6">You are not logged in</p>
      <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
}
