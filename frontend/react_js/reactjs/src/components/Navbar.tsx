import { MenuIcon, XIcon } from "lucide-react";
import { use, useState } from "react";
import { motion } from "motion/react";
import { navlinks } from "../data/navlinks";
import type { INavLink } from "../types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/AI_Thumbnail_logo.svg";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <motion.nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <Link to='/'>
                    <img className="h-8.5 w-auto" src={logo} alt="logo" width={130} height={34} />
                
                </Link>

                <div className="hidden md:flex items-center gap-8 transition duration-500">
                    <Link to='/' className="hover:text-orange-400 transition">Home</Link>
                    <Link to='/generate' className="hover:text-orange-400 transition">Generate</Link>
                    <Link to='/my-generations' className="hover:text-orange-400 transition">My Collections</Link>
                    <Link to='#' className="hover:text-orange-400 transition">Contact</Link>
                    
                </div>

                <button onClick={()=> navigate('/login')} className="hidden md:block px-6 py-2.5 bg-orange-600 hover:bg-orange-700 active:scale-95 transition-all rounded-full">
                    Get Started
                </button>
                <button onClick={() => setIsOpen(true)} className="md:hidden">
                    <MenuIcon size={26} className="active:scale-90 transition" />
                </button>
            </motion.nav>

            <div className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <Link onClick={() => setIsOpen(false)} to='/'>Home</Link>
                <Link onClick={() => setIsOpen(false)} to='/generate'>Generate</Link>
                <Link onClick={() => setIsOpen(false)} to='/my-generations'>My Generations</Link>
                <Link onClick={() => setIsOpen(false)} to='#'>Contact</Link>
                <Link onClick={() => setIsOpen(false)} to='/login'>Login</Link>
                <button onClick={() => setIsOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-orange-600 hover:bg-orange-700 transition text-white rounded-md flex">
                    <XIcon />
                </button>
            </div>
        </>
    );
}