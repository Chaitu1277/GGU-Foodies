import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX, HiUser, HiLogin, HiUserAdd } from 'react-icons/hi';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const [activeSection, setActiveSection] = useState('');

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    const scrollToSection = (sectionId) => {
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
                setActiveSection(sectionId);
            }
        }
    };

    const isActive = (path) => location.pathname === path;
    const isSectionActive = (id) => location.pathname === '/' && activeSection === id;

    useEffect(() => {
        // Reset section highlight when route changes
        setActiveSection('');
    }, [location.pathname]);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src="/ggu foodies.jpg"
                            alt="GGU Foodies Logo"
                            className="w-10 h-10 rounded-lg"
                        />
                        <span className="text-xl font-bold text-gray-800">GGU Foodies</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Home */}
                        <div className="relative">
                            {location.pathname === '/' ? (
                                <button
                                    onClick={() => scrollToSection('top')}
                                    className={`text-gray-700 hover:text-primary-600 font-medium ${isActive('/') && activeSection === '' ? 'text-primary-600' : ''}`}
                                >
                                    Home
                                    {isActive('/') && activeSection === '' && (
                                        <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-primary-600"></span>
                                    )}
                                </button>
                            ) : (
                                <Link
                                    to="/"
                                    className={`text-gray-700 hover:text-primary-600 font-medium ${isActive('/') ? 'text-primary-600' : ''}`}
                                >
                                    Home
                                </Link>
                            )}
                        </div>

                        {/* All Food Courts */}
                        <div className="relative">
                            {location.pathname === '/' ? (
                                <button
                                    onClick={() => scrollToSection('food-courts')}
                                    className={`text-gray-700 hover:text-primary-600 font-medium ${isSectionActive('food-courts') ? 'text-primary-600' : ''}`}
                                >
                                    All Food Courts
                                    {isSectionActive('food-courts') && (
                                        <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-primary-600"></span>
                                    )}
                                </button>
                            ) : (
                                <Link
                                    to="/#food-courts"
                                    className="text-gray-700 hover:text-primary-600 font-medium"
                                >
                                    All Food Courts
                                </Link>
                            )}
                        </div>

                        {/* About */}
                        <div className="relative">
                            <Link
                                to="/about"
                                className={`text-gray-700 hover:text-primary-600 font-medium ${isActive('/about') ? 'text-primary-600' : ''}`}
                            >
                                About
                                {isActive('/about') && (
                                    <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-primary-600"></span>
                                )}
                            </Link>
                        </div>

                        {/* Admin Panel */}
                        <div className="relative">
                            <Link
                                to="/admin-panel"
                                className={`text-gray-700 hover:text-primary-600 font-medium ${isActive('/admin-panel') ? 'text-primary-600' : ''}`}
                            >
                                Admin Panel
                                {isActive('/admin-panel') && (
                                    <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-primary-600"></span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Profile + Mobile Toggle */}
                    <div className="flex items-center space-x-4">
                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleProfile}
                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <HiUser className="w-6 h-6 text-gray-600" />
                            </button>
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                                    >
                                        <div className="py-2">
                                            <Link
                                                to="/login"
                                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <HiLogin className="w-5 h-5 mr-2" />
                                                Login
                                            </Link>
                                            <Link
                                                to="/signup"
                                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <HiUserAdd className="w-5 h-5 mr-2" />
                                                Sign Up
                                            </Link>
                                            <Link
                                                to="/profile"
                                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                <HiOutlineUserCircle className="w-5 h-5 mr-2" />
                                                Profile
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden bg-white border-t border-gray-100"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {location.pathname === '/' ? (
                                    <button
                                        onClick={() => scrollToSection('top')}
                                        className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                                    >
                                        Home
                                    </button>
                                ) : (
                                    <Link
                                        to="/"
                                        className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Home
                                    </Link>
                                )}

                                {location.pathname === '/' ? (
                                    <button
                                        onClick={() => scrollToSection('food-courts')}
                                        className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                                    >
                                        All Food Courts
                                    </button>
                                ) : (
                                    <Link
                                        to="/#food-courts"
                                        className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        All Food Courts
                                    </Link>
                                )}

                                <Link
                                    to="/about"
                                    className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                                    onClick={() => setIsOpen(false)}
                                >
                                    About
                                </Link>
                                <Link
                                    to="/admin-panel"
                                    className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Admin Panel
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
