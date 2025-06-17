import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        {/* Ikona e librit */}
                        <Link to="/" className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m8-10.5v12a1.5 1.5 0 01-1.5 1.5H6a1.5 1.5 0 01-1.5-1.5v-12A1.5 1.5 0 016 5.25h12.5A1.5 1.5 0 0120 6.75z" />
                            </svg>
                            <span className="hidden sm:inline text-xl font-semibold text-indigo-600">Blogu i Librave</span>
                        </Link>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${currentPath === '/' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                            >
                                Dashboard
                            </Link>

                            {user ? (
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${currentPath === '/login' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${currentPath === '/register' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 pt-2 pb-4">
                    <Link
                        to="/"
                        className={`block border-l-4 py-2 pr-4 pl-3 text-base font-medium ${currentPath === '/' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
                    >
                        Dashboard
                    </Link>

                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className={`block border-l-4 py-2 pr-4 pl-3 text-base font-medium ${currentPath === '/login' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className={`block border-l-4 py-2 pr-4 pl-3 text-base font-medium ${currentPath === '/register' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
