
import React from "react";

const Header: React.FC = () => {
  return <header className="w-full pt-6 pb-4 px-4 md:px-8">
      <div className="max-w-screen-xl w-full mx-auto">
        {/* Top navigation with logo on left and banner centered */}
        <div className="flex items-center mb-8 relative">
          <a href="/" className="hover:opacity-90 transition-opacity" aria-label="FazeGPT Homepage">
            <div className="relative h-12 w-auto md:h-16">
              <div className="absolute inset-0 bg-primary/10 blur-md rounded-2xl opacity-70"></div>
              <img src="/lovable-uploads/893c5005-8d5a-409a-b51b-d9a78b40d751.png" alt="FazeGPT Logo" className="h-full w-auto relative z-10 animate-pulse-slow rounded-full" />
            </div>
          </a>
          
          {/* Banner centered in the header with decorative frame */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="https://fazegpt.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
              <div className="relative p-0.25 md:p-0.5 rounded-lg">
                {/* Decorative frame - now with dark navy blue, teal, and enhanced green gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a2463] via-[#0EA5E9] to-[#2E8B57] rounded-lg border border-white/20 shadow-sm"></div>
                
                {/* Banner image with glow effect */}
                <div className="relative h-12 w-auto md:h-16 p-1 md:p-1.5">
                  <div className="absolute inset-0 bg-primary/10 blur-md rounded-xl opacity-70"></div>
                  <img src="/lovable-uploads/c453ddb0-aad9-4f4f-89a0-5764f5b858d0.png" alt="Header Image" className="h-full w-auto relative z-10 animate-pulse-slow" />
                </div>
              </div>
            </a>
          </div>
        </div>
        
        {/* Main heading content - centered */}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 animate-slide-down">
            Most effective AI Generated Content<br />
            <span className="ml-9">Detector and Humanizer</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-center text-balance animate-fade-in opacity-90">Our powerful AI detection tool analyzes text with precise accuracy to determine if it was written by a human or generated by AI like ChatGPT or Gemini.</p>
        </div>
      </div>
    </header>;
};

export default Header;
