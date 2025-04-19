import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, ArrowRight, FileType, Scale, Gavel } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface FirInputProps {
  onFirSubmit: (text: string) => void;
  isProcessing: boolean;
}

const FirInput = ({ onFirSubmit, isProcessing }: FirInputProps) => {
  const [firText, setFirText] = useState("");
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (file.type !== "text/plain" && file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a .txt or .pdf file",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setFirText(text);
    };
    
    reader.readAsText(file);
  };
  
  const handleSubmit = () => {
    if (!firText.trim()) {
      toast({
        title: "Empty input",
        description: "Please enter or upload FIR text",
        variant: "destructive",
      });
      return;
    }
    
    onFirSubmit(firText);
  };
  
  return (
    <motion.div 
      className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none">
        <Scale size={200} />
      </div>
      <div className="absolute -top-12 -left-12 opacity-5 pointer-events-none rotate-45">
        <Gavel size={160} />
      </div>
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.2] bg-[length:20px_20px]"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <h2 className="text-xl font-semibold mb-6 text-fir flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="p-2 bg-fir/10 rounded-lg"
          >
            <FileText className="h-6 w-6" />
          </motion.div>
          FIR Input
          <span className="text-sm font-normal text-gray-500 ml-2">
            Enter or upload your FIR text below
          </span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex-grow relative z-10"
          >
            <Textarea
              placeholder="Enter FIR text here or upload a file..."
              className="min-h-[200px] mb-4 border-fir-light/30 focus:border-fir-light focus:ring-1 focus:ring-fir-light bg-white/50 backdrop-blur-sm"
              value={firText}
              onChange={(e) => setFirText(e.target.value)}
            />
            
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <div className="flex items-center">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".txt,.pdf"
                  onChange={handleFileUpload}
                />
                <motion.label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-md cursor-pointer transition-colors border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload File</span>
                </motion.label>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={handleSubmit}
                  disabled={isProcessing || !firText.trim()}
                  className="bg-fir hover:bg-fir-dark transition-all duration-300 gap-2"
                >
                  Process FIR Text
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="hidden md:flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg w-64 relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute inset-0 opacity-10"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Scale size={200} />
              </motion.div>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
              >
                <FileText className="h-16 w-16 text-fir mb-3" />
              </motion.div>
              <h3 className="text-sm font-medium text-gray-800">First Information Report</h3>
              <p className="text-xs text-gray-500 mt-1">Upload or paste your FIR text</p>
              
              <motion.div
                className="mt-4 p-2 bg-white/50 rounded-lg border border-gray-200"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 0 8px rgba(59, 130, 246, 0.1)",
                    "0 0 0 0 rgba(59, 130, 246, 0)"
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <p className="text-xs text-gray-600">Semantic Analysis Ready</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FirInput;
