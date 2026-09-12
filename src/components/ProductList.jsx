import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice';

function ProductList() {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  return (
    <section className="container mx-auto px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
          Featured Products
        </h2>
        <p className="mt-2 text-gray-500">Browse our latest products and add your favorites to the cart.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute right-3 top-3 rounded-full bg-indigo-600/90 px-3 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur-sm">
                {product.category}
              </span>
            </div>

            <div className="flex flex-grow flex-col p-5">
              <h3
                className="mb-2 min-h-[3.5rem] text-lg font-bold text-gray-800 line-clamp-2"
                title={product.name}
              >
                {product.name}
              </h3>

              <div className="mb-4 flex items-center" aria-label={`Rating: ${product.rating} out of 5`}>
                <div className="flex text-yellow-400" aria-hidden="true">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        index < Math.floor(product.rating || 0)
                          ? 'fill-current'
                          : 'fill-gray-200'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">({product.rating})</span>
              </div>

              <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-100 pt-4">
                <span className="text-xl font-black text-indigo-600 sm:text-2xl">
                  ${(product.price || 0).toFixed(2)}
                </span>

                <button
                  type="button"
                  onClick={() => dispatch(addItem(product))}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 active:bg-indigo-800 sm:text-base"
                >
                  <i className="bi bi-cart-plus text-lg sm:hidden" aria-hidden="true" />
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sr-only sm:hidden">Add to cart</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductList;
