import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets"
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
)

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/about' },
        { name: 'About', path: '/' },
    ];


    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { openSignIn } = useClerk()
    const location = useLocation()

    const { user, navigate, isOwner, setShowHotelReg } = useAppContext()

    useEffect(() => {

        if (location.pathname !== '/') {
            setIsScrolled(true)
            return
        } else {
            setIsScrolled(false)
        }
        setIsScrolled(prev => location.pathname !== '/' ? true : prev)

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (


        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-12 lg:px-20 xl:px-28 transition-all duration-300 z-50 ${isScrolled ? "bg-white/80 shadow-sm text-gray-700 backdrop-blur-md py-2.5" : "py-5"}`}>


            {/* Logo */}
            <Link to='/'>
                <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <a
                        key={i}
                        href={link.path}
                        className={`transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${isScrolled ? "text-gray-700" : "text-white"}`}
                    >
                        {link.name}
                    </a>
                ))}
                {user && (
                    <button onClick={() => isOwner ? navigate('/owner') : setShowHotelReg(true)} className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
                        {isOwner ? 'Dashboard' : 'List Your Hotel'}
                    </button>

                )
                }
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4 group">
                <img
                    src={assets.searchIcon}
                    className={`h-6 transition-transform duration-300 transform hover:scale-110 hover:rotate-6 ${isScrolled ? 'invert' : ''}`}

                />
                {user ?
                    (<UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate('/my-bookings')} />
                        </UserButton.MenuItems>
                    </UserButton>)
                    :
                    (<button onClick={openSignIn}
                        className="bg-[#253237] text-white px-6 py-2 rounded-md ml-4 transition duration-300 hover:scale-105 hover:shadow-md"

                    >
                        Login
                    </button>)
                }



            </div>


            {/* Mobile Menu Button */}

            <div className="flex items-center gap-3 md:hidden">
                {user && <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate('/my-bookings')} />
                    </UserButton.MenuItems>
                </UserButton>}
                <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} className={`${isScrolled && 'invert'}h-4`} />
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeIcon} alt="closeMenu" className="h-6.5" />
                </button>

                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </a>
                ))}
                {user &&
                    <button onClick={() => isOwner ? navigate('/owner') : setShowHotelReg(true)} className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                        {isOwner ? 'Dashboard' : 'List Your Hotel'}
                    </button>}

                {!user && <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                    Login
                </button>}
            </div>
        </nav>

    );
}

export default Navbar