import { Link, Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 p-4 text-center">
        <nav className="space-x-4">
          <Link className="text-white text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-white" to="/">Home</Link>
          <Link className="text-white text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-white" to="/">Salom</Link>
          <Link className="text-white text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-white" to="/">Alekm</Link>
          <Link className="text-white text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-white" to="/">Hello</Link>
          <Link className="text-white text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-white" to="/">Contact</Link>
        </nav>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gray-200 flex justify-around items-center p-6 text-center">
        <ul className="space-y-4">
          <li>
            <Link className="font-bold text-5xl hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Test</Link>
          </li>
        
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Contact</Link>
          </li>
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Home</Link>
          </li>
        </ul>
        <ul className="space-y-4">
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Home</Link>
          </li>
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Salom</Link>
          </li>
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Alekm</Link>
          </li>
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Hello</Link>
          </li>
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Contact</Link>
          </li>
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Home</Link>
          </li>
        </ul>
        <ul className="space-y-4">
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Home</Link>
          </li>
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Never</Link>
          </li>
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Alekm</Link>
          </li>
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Hello</Link>
          </li>
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Contact</Link>
          </li>
          <li>
            <Link className="text-gray-800 text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-gray-800" to="/">Home</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Layout;
