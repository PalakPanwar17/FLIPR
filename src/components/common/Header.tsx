import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary">
            ProjectHub
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-6 xl:flex">
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("clients")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Clients
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </button>
            <Link
              to="/admin"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="flex flex-col gap-4 border-t py-4 xl:hidden">
            <button
              onClick={() => scrollToSection("projects")}
              className="text-left text-sm font-medium transition-colors hover:text-primary"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("clients")}
              className="text-left text-sm font-medium transition-colors hover:text-primary"
            >
              Clients
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </button>
            <Link
              to="/admin"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
