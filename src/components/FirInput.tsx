
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, ArrowRight, FileType } from "lucide-react";
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
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Decorative elements */}
      <div className="absolute -right-8 -bottom-10 opacity-5 pointer-events-none">
        <FileType size={180} />
      </div>
      <div className="absolute -top-2 -left-2 w-16 h-16 bg-fir-light/10 rounded-full blur-xl"></div>
      
      <h2 className="text-xl font-semibold mb-4 text-fir flex items-center gap-2 relative z-10">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <FileText className="h-5 w-5" />
        </motion.div>
        FIR Input
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
            className="min-h-[200px] mb-4 border-fir-light/30 focus:border-fir-light focus:ring-1 focus:ring-fir-light"
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
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Upload className="h-4 w-4" />
                <span>Upload File</span>
              </motion.label>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
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
          className="hidden md:flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg w-48 relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute top-0 left-0 w-full opacity-10" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(300,300)">
                <path d="M125.6,-116.6C152.9,-74.7,157.3,-20.9,146.7,32.2C136.1,85.3,110.6,137.7,65.8,163.1C21.1,188.6,-42.8,187,-91.8,159.6C-140.8,132.1,-174.9,78.8,-179.8,23.7C-184.7,-31.4,-160.4,-88.2,-121.8,-128.9C-83.1,-169.6,-30.2,-194.3,10.7,-202.5C51.6,-210.7,98.3,-158.5,125.6,-116.6Z" fill="#3b82f6" />
              </g>
            </svg>
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
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FirInput;
