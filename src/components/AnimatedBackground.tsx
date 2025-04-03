
import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        "fixed inset-0 z-[-1] overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
      
      {/* Animated blurred circles */}
      <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-blue-100/30 blur-[100px] animate-float opacity-60"></div>
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-blue-50/30 blur-[120px] animate-float opacity-50" style={{ animationDelay: "-2s" }}></div>
      <div className="absolute top-[40%] left-[25%] w-[200px] h-[200px] rounded-full bg-sky-100/20 blur-[80px] animate-float opacity-40" style={{ animationDelay: "-4s" }}></div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmMWY1ZjkiIGQ9Ik0zNiAxOGgtMTJ2MTJoMTJ6Ii8+PHBhdGggc3Ryb2tlPSIjZTJlOGYwIiBzdHJva2Utb3BhY2l0eT0iLjUiIGQ9Ik0zMCAwdjYwbS0zMC0zMGg2MCIvPjwvZz48L3N2Zz4=')] opacity-[0.03]"></div>
    </div>
  );
};

export default AnimatedBackground;
