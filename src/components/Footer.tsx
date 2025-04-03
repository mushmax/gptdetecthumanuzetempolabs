
import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn("w-full py-6 px-4 md:px-8", className)}>
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} FAZEGPT
        </p>
        <div className="flex items-center gap-6">
          <Link to="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Shield className="h-3.5 w-3.5" />
            Legal Disclaimer
          </Link>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
