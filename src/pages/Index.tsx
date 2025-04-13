
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import FirInput from "@/components/FirInput";
import ProcessingSteps from "@/components/ProcessingSteps";
import ResultSections, { BnsMatch } from "@/components/ResultSections";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { FileSearch, FileDigit, PanelLeftClose } from "lucide-react";
import { ProcessingStep, ProcessingStatus, processFirText, ProcessingResult } from "@/services/firProcessingService";
import { loadAndProcessBnsSections } from "@/services/bnsService";

const Index = () => {
  const [firText, setFirText] = useState("");
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({
    step: ProcessingStep.IDLE,
    progress: 0
  });
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const [matches, setMatches] = useState<BnsMatch[]>([]);
  const { toast } = useToast();

  // Preload BNS sections on component mount
  useEffect(() => {
    const preloadBnsSections = async () => {
      try {
        await loadAndProcessBnsSections();
        console.log("BNS sections preloaded successfully");
      } catch (error) {
        console.error("Failed to preload BNS sections:", error);
      }
    };

    preloadBnsSections();
  }, []);

  const handleFirSubmit = async (text: string) => {
    setFirText(text);
    setMatches([]);
    setProcessingResult(null);
    
    try {
      const result = await processFirText(text, setProcessingStatus);
      setProcessingResult(result);
      setMatches(result.matches);
      
      toast({
        title: "Processing complete",
        description: `Found ${result.matches.length} matching BNS sections`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error processing FIR:", error);
      toast({
        title: "Processing Error",
        description: error instanceof Error ? error.message : "An error occurred during processing",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <motion.div 
          className="absolute top-1/4 right-8 text-fir-light/10"
          animate={{ 
            y: [0, 20, 0], 
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
        >
          <FileSearch size={180} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/4 left-8 text-bns-light/10"
          animate={{ 
            y: [0, -20, 0], 
            rotate: [0, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 12,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <FileDigit size={160} />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/2 left-1/3 text-gray-200/30"
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 60,
            ease: "linear"
          }}
        >
          <PanelLeftClose size={120} />
        </motion.div>
      </div>
      
      <Header />
      
      <main className="container mx-auto py-8 px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FirInput 
              onFirSubmit={handleFirSubmit} 
              isProcessing={processingStatus.step !== ProcessingStep.IDLE && processingStatus.step !== ProcessingStep.COMPLETE && processingStatus.step !== ProcessingStep.ERROR} 
            />
            
            {processingResult && (
              <div className="mt-6">
                <motion.div 
                  className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="font-medium text-fir mb-2">Extracted Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {processingResult.keywords.map((keyword, index) => (
                      <motion.span 
                        key={keyword} 
                        className="px-3 py-1 bg-fir-light/10 text-fir rounded-full text-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {keyword}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                
                <ResultSections matches={matches} />
              </div>
            )}
          </div>
          
          <div>
            {processingStatus.step !== ProcessingStep.IDLE && (
              <ProcessingSteps 
                status={processingStatus.step} 
                message={processingStatus.message}
                progress={processingStatus.progress}
              />
            )}
          </div>
        </div>
      </main>
      
      <motion.footer 
        className="bg-gradient-to-r from-fir to-bns text-white py-6 mt-12 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.2] bg-[length:20px_20px]"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <p className="text-lg font-medium">FIR to BNS Matcher - Semantic Section Mapping Tool</p>
          <p className="mt-2 text-white/80 text-sm">Advanced text analysis and semantic matching</p>
          <p className="mt-4 text-white/60 text-xs">© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
