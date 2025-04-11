import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Base style for all links
    const baseLinkStyle = 'block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 lg:p-0 dark:border-gray-700';

    // Normal state style
    const normalStyle = 'text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent';

    // Active state style
    const activeStyle = 'text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 dark:text-white lg:dark:text-white';

    return (
        <header className='z-10 sticky top-0'>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-[#283845]">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div className="flex items-center">
                        <img src={logo} className="mr-3 h-6 sm:h-9" alt="FutureVolt Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Future Volt</span>
                    </div>
                    <div className="md:hidden flex items-center lg:order-2">
                        <button
                            data-collapse-toggle="mobile-menu-2"
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2"
                            aria-expanded={isMenuOpen}
                            onClick={handleToggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className={`${isMenuOpen ? 'block' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                        <div className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `${baseLinkStyle} ${isActive ? activeStyle : normalStyle}`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/historicaldata"
                                className={({ isActive }) =>
                                    `${baseLinkStyle} ${isActive ? activeStyle : normalStyle}`
                                }
                            >
                                Historical Data
                            </NavLink>
                            <NavLink
                                to="/futuredata"
                                className={({ isActive }) =>
                                    `${baseLinkStyle} ${isActive ? activeStyle : normalStyle}`
                                }
                            >
                                Forecast Data
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;