
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-nexloop-primary to-nexloop-secondary"></div>
              <span className="font-bold text-xl">NexLoop</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-nexloop-primary transition-colors">Home</Link>
              <a href="/#courses" className="text-gray-700 hover:text-nexloop-primary transition-colors">Courses</a>
              <a href="/#testimonials" className="text-gray-700 hover:text-nexloop-primary transition-colors">Testimonials</a>
              <Link to="/about" className="text-gray-700 hover:text-nexloop-primary transition-colors">About</Link>
            </nav>
            
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 animate-slide-up">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-nexloop-primary transition-colors py-2">Home</Link>
              <a href="/#courses" className="text-gray-700 hover:text-nexloop-primary transition-colors py-2">Courses</a>
              <a href="/#testimonials" className="text-gray-700 hover:text-nexloop-primary transition-colors py-2">Testimonials</a>
              <Link to="/about" className="text-gray-700 hover:text-nexloop-primary transition-colors py-2">About</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
