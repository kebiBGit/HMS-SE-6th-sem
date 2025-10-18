import { Link } from "react-router-dom";
import { Hotel, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Hotel className="h-8 w-8 text-accent" />
              <span className="text-xl font-serif font-bold">Himalayan Haven</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Experience luxury and comfort in the heart of the city.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-accent transition-colors">Rooms</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span>+977-9812345678</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span>info@himalayanhaven.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Mustang-4, Nepal</span>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cancellation" className="hover:text-accent transition-colors">Cancellation Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Himalayan Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
