
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, PercentCircle, Link2, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export interface BnsMatch {
  sectionId: string;
  sectionTitle: string;
  sectionContent: string;
  matchScore: number;
  matchedKeywords: string[];
}

interface ResultSectionsProps {
  matches: BnsMatch[];
}

const ResultSections = ({ matches }: ResultSectionsProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  
  const toggleExpand = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  if (matches.length === 0) {
    return null;
  }

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-bns flex items-center gap-2">
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <Link2 className="h-5 w-5" />
        </motion.div>
        Matching BNS Sections
      </h2>
      
      <Tabs defaultValue="sections">
        <TabsList className="mb-4 bg-gray-100">
          <TabsTrigger value="sections" className="data-[state=active]:bg-bns data-[state=active]:text-white">By Relevance</TabsTrigger>
          <TabsTrigger value="keywords" className="data-[state=active]:bg-bns data-[state=active]:text-white">By Keywords</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sections" className="space-y-4">
          {matches.map((match, index) => (
            <motion.div 
              key={match.sectionId}
              className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                index === 0 ? 'border-bns border-2' : 'border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center p-4 bg-gray-50">
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <FileText className={`h-5 w-5 ${index === 0 ? 'text-bns' : 'text-gray-600'}`} />
                  </motion.div>
                  <h3 className="font-medium text-gray-800">
                    {match.sectionTitle}
                    {index === 0 && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                      >
                        <Badge className="ml-2 bg-bns">Best Match</Badge>
                      </motion.div>
                    )}
                  </h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <PercentCircle className="h-4 w-4 text-bns" />
                    <motion.span 
                      className="font-medium text-bns"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {(match.matchScore * 100).toFixed(0)}%
                    </motion.span>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleExpand(match.sectionId)}
                      className="flex items-center gap-1"
                    >
                      {expandedSections.includes(match.sectionId) ? (
                        <>
                          <span>Collapse</span>
                          <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <span>Expand</span>
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedSections.includes(match.sectionId) && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-gray-200">
                      <p className="text-gray-700 whitespace-pre-line">
                        {match.sectionContent}
                      </p>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-2">Matched Keywords:</h4>
                        <div className="flex flex-wrap gap-2">
                          {match.matchedKeywords.map((keyword, kidx) => (
                            <motion.div
                              key={keyword}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 + kidx * 0.05 }}
                            >
                              <Badge variant="outline" className="bg-gray-100 hover:bg-gray-200 transition-colors">
                                {keyword}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </TabsContent>
        
        <TabsContent value="keywords">
          <motion.div 
            className="border rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-4">Keywords Found in FIR</h3>
              
              <div className="space-y-4">
                {/* Get all unique keywords across all matches */}
                {Array.from(new Set(matches.flatMap(m => m.matchedKeywords))).map((keyword, idx) => (
                  <motion.div 
                    key={keyword} 
                    className="border-b border-gray-200 pb-3 last:border-0 last:pb-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <h4 className="font-medium text-bns mb-2">"{keyword}"</h4>
                    <div className="space-y-2">
                      {matches
                        .filter(m => m.matchedKeywords.includes(keyword))
                        .map((match, midx) => (
                          <motion.div 
                            key={`${keyword}-${match.sectionId}`} 
                            className="pl-4 border-l-2 border-bns-light"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + midx * 0.05 }}
                          >
                            <p className="text-sm text-gray-600">{match.sectionTitle}</p>
                          </motion.div>
                        ))
                      }
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ResultSections;
