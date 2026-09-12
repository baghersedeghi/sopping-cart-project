import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice';

function ProductList() {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* تیتر صفحه: در موبایل کمی کوچکتر و در دسکتاپ بزرگتر */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8">
        Featured Products
      </h2>

      {/* گریدبندی حرفه‌ای برای صفحات مختلف */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            // کلاس group اضافه شده تا هاور کل کارت روی عکس تاثیر بگذارد
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 flex flex-col justify-between overflow-hidden transition-all duration-300"
          >
            {/* بخش عکس محصول */}
            <div className="relative overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                // افکت زوم شدن عکس هنگام هاور کردن
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 right-3 bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                {product.category}
              </span>
            </div>

            {/* بخش اطلاعات محصول */}
            <div className="p-5 flex flex-col flex-grow">
              {/* نام محصول با محدودیت ۲ خط برای جلوگیری از به هم ریختگی ارتفاع کارت‌ها */}
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]" title={product.name}>
                {product.name}
              </h3>

              {/* بخش امتیاز (ستاره‌ها) */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'fill-gray-200'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-500 ml-2">
                  ({product.rating})
                </span>
              </div>

              {/* بخش قیمت و دکمه (هل دادن به پایین با mt-auto) */}
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <span className="text-xl sm:text-2xl font-black text-indigo-600">
                  ${(product.price || 0).toFixed(2)}
                </span>

                {/* در موبایل آیکون نشان داده می‌شود و در کامپیوتر متن کامل */}
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 font-semibold text-sm sm:text-base flex items-center gap-2 shadow-sm"
                  onClick={() => dispatch(addItem(product))}
                >
                  <i className="bi bi-cart-plus text-lg sm:hidden"></i>
                  <span className="hidden sm:inline">Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;