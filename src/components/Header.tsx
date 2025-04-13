
import { FileText, Book, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-fir to-bns p-4 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.2] bg-[length:20px_20px]"></div>
        <svg className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4 text-white/10" width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          <path d="M9 14h6"></path>
          <path d="M9 18h6"></path>
          <path d="M9 10h6"></path>
        </svg>
      </div>
      
      <motion.div 
        className="container mx-auto flex items-center justify-between relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <FileText className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white">FIR to BNS Matcher</h1>
        </div>
        <div className="flex items-center gap-3 text-white bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
          <motion.div 
            whileHover={{ rotate: -15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <Book className="h-6 w-6" />
          </motion.div>
          <span className="text-sm md:text-base">Semantic Section Mapping</span>
          <ChevronRight className="h-5 w-5 text-white/70" />
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
