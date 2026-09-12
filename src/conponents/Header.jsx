import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router'; // معمولاً react-router-dom استفاده می‌شود

function Header() {
  const carts = useSelector((state) => state.cart.items);

  return (
    <>
      {/* 
        sticky top-0 z-50: باعث می‌شود هدر همیشه بالای صفحه بچسبد 
        shadow-sm: یک سایه ملایم برای تفکیک هدر از محتوای سایت
      */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* بخش لوگو */}
          {/* در موبایل کمی کوچکتر (text-xl) و در تبلت به بالا بزرگتر (sm:text-2xl) */}
          <Link to="/" className="font-extrabold text-xl sm:text-2xl text-indigo-600 tracking-tight">
            webporg.io
          </Link>

          {/* بخش لینک‌ها و سبد خرید */}
          <div className="flex items-center gap-4 sm:gap-6">

            {/* منوی دسترسی */}
            <nav>
              <ul className="flex items-center gap-3 sm:gap-5 text-sm sm:text-base font-medium">
                <li>
                  <NavLink
                    to={'/'}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-indigo-600 transition-colors'
                        : 'text-gray-500 hover:text-indigo-500 transition-colors'
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/products'}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-indigo-600 transition-colors'
                        : 'text-gray-500 hover:text-indigo-500 transition-colors'
                    }
                  >
                    Products
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* خط جداکننده (فقط در تبلت به بالا نمایش داده می‌شود) */}
            <div className="hidden sm:block h-6 w-px bg-gray-200"></div>

            {/* بخش آیکون سبد خرید و نشانگر عدد */}
            <Link to={'/cart'} className="relative flex items-center p-2 -mr-2">
              <i className="bi bi-bag text-xl sm:text-2xl text-gray-700 hover:text-indigo-600 transition-colors"></i>

              {/* نشانگر عدد سبد خرید (Badge) */}
              <span className="absolute top-0 right-0 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] sm:text-xs font-bold text-white shadow-sm border-2 border-white">
                {carts.length}
              </span>
            </Link>

          </div>
        </div>
      </header>
    </>
  );
}

export default Header;