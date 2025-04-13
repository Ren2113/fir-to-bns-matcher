
import { useState } from "react";
import Header from "@/components/Header";
import FirInput from "@/components/FirInput";
import ProcessingSteps, { ProcessingStatus } from "@/components/ProcessingSteps";
import ResultSections, { BnsMatch } from "@/components/ResultSections";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Index = () => {
  const [firText, setFirText] = useState("");
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>("idle");
  const [matches, setMatches] = useState<BnsMatch[]>([]);
  const { toast } = useToast();

  const handleFirSubmit = async (text: string) => {
    setFirText(text);
    setMatches([]);
    
    // Simulate the processing steps with timeouts
    // In a real application, you would call your API here
    
    setProcessingStatus("extracting");
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProcessingStatus("embedding");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessingStatus("matching");
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate getting results
    const mockResults: BnsMatch[] = [
      {
        sectionId: "bns-101",
        sectionTitle: "BNS Section 101: Criminal Complaints",
        sectionContent: "This section outlines the procedures for filing criminal complaints with the appropriate authorities. It includes information about the required format, the necessary signatories, and the timeline for processing such complaints.",
        matchScore: 0.89,
        matchedKeywords: ["criminal", "complaint", "authorities", "processing"]
      },
      {
        sectionId: "bns-204",
        sectionTitle: "BNS Section 204: Evidence Collection",
        sectionContent: "Details the proper methods for evidence collection at crime scenes, including documentation requirements, chain of custody procedures, and preservation techniques.",
        matchScore: 0.74,
        matchedKeywords: ["evidence", "collection", "documentation", "crime"]
      },
      {
        sectionId: "bns-315",
        sectionTitle: "BNS Section 315: Witness Statements",
        sectionContent: "Guidelines for recording witness statements, including format requirements, verification procedures, and recording of demographic information of witnesses.",
        matchScore: 0.67,
        matchedKeywords: ["witness", "statements", "verification", "recording"]
      },
      {
        sectionId: "bns-422",
        sectionTitle: "BNS Section 422: Preliminary Investigation",
        sectionContent: "Procedures for conducting preliminary investigations, including scene examination, interviewing relevant parties, and initial evidence assessment prior to formal investigation.",
        matchScore: 0.58,
        matchedKeywords: ["investigation", "examination", "evidence", "preliminary"]
      }
    ];
    
    setMatches(mockResults);
    setProcessingStatus("complete");
    
    toast({
      title: "Processing complete",
      description: "Found 4 matching BNS sections",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FirInput 
              onFirSubmit={handleFirSubmit} 
              isProcessing={processingStatus !== "idle" && processingStatus !== "complete"} 
            />
            
            {matches.length > 0 && (
              <div className="mt-6">
                <ResultSections matches={matches} />
              </div>
            )}
          </div>
          
          <div>
            {processingStatus !== "idle" && (
              <ProcessingSteps status={processingStatus} />
            )}
          </div>
        </div>
      </main>
      
      <motion.footer 
        className="bg-gradient-to-r from-fir to-bns text-white py-6 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="container mx-auto text-center">
          <p className="text-lg font-medium">FIR to BNS Matcher - Semantic Section Mapping Tool</p>
          <p className="mt-2 text-white/80 text-sm">Advanced text analysis and semantic matching</p>
          <p className="mt-4 text-white/60 text-xs">© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
