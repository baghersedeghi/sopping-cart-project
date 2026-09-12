import { Link, NavLink } from 'react-router';
import { useSelector } from 'react-redux';

function Header() {
  const cartItems = useSelector((state) => state.cart.items);

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-indigo-600 transition-colors'
      : 'text-gray-500 hover:text-indigo-500 transition-colors';

  return (
    <header className="sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-indigo-600 sm:text-2xl"
        >
          WebPorg.io
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-3 text-sm font-medium sm:gap-5 sm:text-base">
              <li>
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className={linkClass}>
                  Products
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="hidden h-6 w-px bg-gray-200 sm:block" aria-hidden="true" />

          <Link
            to="/cart"
            aria-label={`Shopping cart with ${cartItems.length} items`}
            className="relative -mr-2 flex items-center p-2"
          >
            <i className="bi bi-bag text-xl text-gray-700 transition-colors hover:text-indigo-600 sm:text-2xl" />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-[10px] font-bold text-white sm:h-5 sm:w-5 sm:text-xs">
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
