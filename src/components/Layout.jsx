import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />

      {/* Background Wrapper */}
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-6 py-10">

        {/* Decorative Blobs */}
        <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-indigo-300 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-purple-300 rounded-full blur-3xl opacity-30"></div>

        {/* Page Content */}
        <div className="relative max-w-6xl mx-auto">
          {children}
        </div>

      </div>
    </>
  );
}

export default Layout;