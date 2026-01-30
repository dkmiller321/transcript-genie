import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
];

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-plum-500 to-goldenrod-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-r from-plum-500 to-goldenrod-500 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold gradient-text">TranscriptFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  location.pathname === link.href
                    ? "text-foreground bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link to="/pricing">
              <Button 
                variant="outline" 
                className="rounded-full border-goldenrod-500/30 hover:border-goldenrod-500/60 hover:bg-goldenrod-500/10"
              >
                Get Pro
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 glass-strong border-l border-white/10">
                <nav className="flex flex-col gap-2 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                        location.pathname === link.href
                          ? "text-foreground bg-white/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to="/pricing"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 px-4 py-3 rounded-xl text-base font-semibold gradient-primary text-white text-center"
                  >
                    Get Pro
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Backdrop blur bar */}
      <div className="absolute inset-0 -z-10 bg-background/60 backdrop-blur-xl border-b border-white/5" />
    </header>
  );
};

export default Header;
