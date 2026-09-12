import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart, removeItem, decrementItemQuantity, incrementItemQuantity } from "../redux/cartSlice";
import { Link } from "react-router"; // مطمئن شوید از react-router-dom ایمپورت می‌کنید

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);

    // --- حالت سبد خرید خالی ---
    if (cartItems.length === 0) {
        return (
            <div className="container flex flex-col items-center justify-center min-h-[50vh] mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
                <i className="bi bi-bag-x text-7xl sm:text-9xl text-gray-300 mb-6"></i>
                <p className="text-gray-500 font-medium text-lg mb-6">Your cart is currently empty.</p>

                <Link
                    to={'/products'}
                    className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md"
                >
                    <span className="text-lg">Start Shopping</span>
                    <i className="bi bi-arrow-right text-xl"></i>
                </Link>
            </div>
        );
    }

    // --- حالت سبد خرید پر ---
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Shopping Cart</h2>

            {/* باکس جدول با قابلیت اسکرول افقی در موبایل */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto mb-8">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-sm sm:text-base">Product</th>
                            <th className="p-4 font-semibold text-sm sm:text-base">Price</th>
                            <th className="p-4 font-semibold text-center text-sm sm:text-base">Quantity</th>
                            <th className="p-4 font-semibold text-sm sm:text-base">Total</th>
                            <th className="p-4 font-semibold text-center text-sm sm:text-base">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {cartItems.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                                {/* ستون مشخصات محصول */}
                                <td className="p-4">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-base sm:text-lg text-gray-800 line-clamp-1">
                                                {item.name}
                                            </span>
                                            <p className="text-gray-500 text-xs sm:text-sm mt-0.5 line-clamp-1 hidden sm:block">
                                                Brief product description here.
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* ستون قیمت واحد */}
                                <td className="p-4 text-gray-700 font-medium whitespace-nowrap text-sm sm:text-base">
                                    ${(item.price || 0).toFixed(2)}
                                </td>

                                {/* ستون تعداد */}
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                                        <button
                                            disabled={item.quantity <= 1}
                                            className="disabled:opacity-50 disabled:cursor-not-allowed w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-md transition-colors"
                                            onClick={() => dispatch(decrementItemQuantity(item.id))}
                                        >
                                            <i className="bi bi-dash text-base sm:text-lg font-bold"></i>
                                        </button>

                                        <span className="w-6 text-center font-semibold text-gray-800 text-sm sm:text-base">
                                            {item.quantity}
                                        </span>

                                        <button
                                            disabled={item.quantity >= 10}
                                            className="disabled:opacity-50 disabled:cursor-not-allowed w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-500 hover:text-white rounded-md transition-colors"
                                            onClick={() => dispatch(incrementItemQuantity(item.id))}
                                        >
                                            <i className="bi bi-plus text-base sm:text-lg font-bold"></i>
                                        </button>
                                    </div>
                                </td>

                                {/* ستون قیمت کل این محصول */}
                                <td className="p-4 text-gray-700 font-medium whitespace-nowrap text-sm sm:text-base">
                                    ${(item.totalPrice || 0).toFixed(2)}
                                </td>

                                {/* ستون عملیات (حذف) */}
                                <td className="p-4 text-center">
                                    <button
                                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors duration-200 font-medium text-xs sm:text-sm"
                                        onClick={() => dispatch(removeItem(item.id))}
                                    >
                                        <span className="hidden sm:inline">Remove</span>
                                        <i className="bi bi-trash sm:hidden text-lg"></i> {/* در موبایل فقط آیکون سطل زباله نشان داده می‌شود */}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* بخش پایین: دکمه حذف کل سبد و فاکتور نهایی */}
            <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-start gap-6">

                {/* دکمه خالی کردن سبد (در موبایل تمام عرض، در دسکتاپ به اندازه محتوا) */}
                {cartItems.length > 0 && (
                    <button
                        className="w-full md:w-auto bg-red-50 hover:bg-red-500 text-red-500 hover:text-white border border-red-200 hover:border-transparent font-semibold py-2.5 px-6 rounded-lg transition-all"
                        onClick={() => dispatch(clearCart())}
                    >
                        <i className="bi bi-trash mr-2"></i>
                        Clear Entire Cart
                    </button>
                )}

                {/* باکس فاکتور نهایی */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6 w-full md:max-w-sm shadow-sm">
                    <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Order Summary</h3>

                    <div className="flex justify-between items-center text-lg sm:text-xl font-extrabold text-gray-800 mb-6">
                        <span>Total:</span>
                        <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-lg transition-colors shadow-md hover:shadow-lg flex justify-center items-center gap-2">
                        <span>Proceed to Checkout</span>
                        <i className="bi bi-shield-lock"></i>
                    </button>
                </div>

            </div>
        </div>
    );
}