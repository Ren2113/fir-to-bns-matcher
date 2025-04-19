
import { FileText, Book, ChevronRight, Gavel, Scale } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-fir to-bns p-6 shadow-lg relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ 
          backgroundImage: 'url("/images/courthouse.jpg")',
          backgroundBlendMode: 'overlay'
        }}
      />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.2] bg-[length:20px_20px]"></div>
        {/* Law-themed background decorations */}
        <div className="absolute -right-20 bottom-0 transform rotate-12">
          <Scale className="w-64 h-64 text-white/10" />
        </div>
        <div className="absolute -left-16 top-0 transform -rotate-12">
          <Gavel className="w-48 h-48 text-white/10" />
        </div>
      </div>
      
      <motion.div 
        className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="p-3 bg-white/10 rounded-xl backdrop-blur-sm"
          >
            <FileText className="h-8 w-8 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">FIR to BNS Matcher</h1>
            <p className="text-white/80 text-sm">Advanced Document Analysis System</p>
          </div>
        </div>
        
        <motion.div 
          className="flex items-center gap-3 text-white bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <motion.div 
            whileHover={{ rotate: -15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <Book className="h-6 w-6" />
          </motion.div>
          <span className="text-sm md:text-base">Semantic Section Mapping</span>
          <ChevronRight className="h-5 w-5 text-white/70" />
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;
