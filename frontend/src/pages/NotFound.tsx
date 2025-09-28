import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-300 text-white">
      <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="mb-8 text-lg text-indigo-100">Sorry, the page you are looking for does not exist.</p>
      <Link to="/dashboard" className="px-6 py-2 rounded-md bg-white text-indigo-600 font-bold shadow-md hover:bg-indigo-100 transition">Go Dashboard</Link>
    </div>
  );
};

export default NotFound;
