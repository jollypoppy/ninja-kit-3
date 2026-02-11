'use client';

//IMPORTING HOOKS AND DEPS
import { useState, useEffect } from 'react';
import { useAppContext } from '@/app/context/AppContext';
import { useRouter } from 'next/navigation';

//IMPORTING HELPER COMPONENTS
import MobileHeader from '@/app/components/MobileHeader';
import DesktopHeader from '@/app/components/DesktopHeader';
import Sidebar from '@/app/components/Sidebar';

const Profile = () => {
  const { token } = useAppContext();
  const router = useRouter();

  const [pageWidth, setPageWidth] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    setPageWidth(window.innerWidth);

    const handleResize = () => setPageWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!token) {
    return (
      <>
        {pageWidth < 760 ? (
          <MobileHeader setIsSidebarOpen={setIsSidebarOpen} />
        ) : (
          <DesktopHeader />
        )}

        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <section className="mt-30 p-5 md:p-10 lg:p-15 xl:p-20 flex flex-col gap-10">
          <div>
            <h1 className="text-center text-xl font-semibold text-gray-700">
              {' '}
              You are not logged in, please click the buttons below to login or
              register{' '}
            </h1>
          </div>

          <div>
            <span className="flex gap-5 justify-center">
              <button
                onClick={() => {
                  router.push('/login');
                }}
                className="text-white bg-black rounded-lg py-3 px-5 w-60 text-center font-semibold  cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => {
                  router.push('/sign-up');
                }}
                className="text-white bg-black rounded-lg py-3 px-5  w-60 text-center font-semibold cursor-pointer"
              >
                Sign up
              </button>
            </span>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {pageWidth < 760 ? (
        <MobileHeader setIsSidebarOpen={setIsSidebarOpen} />
      ) : (
        <DesktopHeader />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
};

export default Profile;
