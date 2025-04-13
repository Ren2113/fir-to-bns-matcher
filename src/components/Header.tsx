
import { FileText, Book, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-fir to-bns p-4 shadow-lg">
      <motion.div 
        className="container mx-auto flex items-center justify-between"
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
        <div className="flex items-center gap-3 text-white bg-white/10 px-4 py-2 rounded-full">
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
