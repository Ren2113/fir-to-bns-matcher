
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, PercentCircle, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-bns flex items-center gap-2">
        <Link2 className="h-5 w-5" />
        Matching BNS Sections
      </h2>
      
      <Tabs defaultValue="sections">
        <TabsList className="mb-4">
          <TabsTrigger value="sections">By Relevance</TabsTrigger>
          <TabsTrigger value="keywords">By Keywords</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sections" className="space-y-4">
          {matches.map((match, index) => (
            <div 
              key={match.sectionId}
              className={`border rounded-lg overflow-hidden ${
                index === 0 ? 'border-bns border-2' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-center p-4 bg-gray-50">
                <div className="flex items-center gap-2">
                  <FileText className={`h-5 w-5 ${index === 0 ? 'text-bns' : 'text-gray-600'}`} />
                  <h3 className="font-medium text-gray-800">
                    {match.sectionTitle}
                    {index === 0 && (
                      <Badge className="ml-2 bg-bns">Best Match</Badge>
                    )}
                  </h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <PercentCircle className="h-4 w-4 text-bns" />
                    <span className="font-medium text-bns">
                      {(match.matchScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleExpand(match.sectionId)}
                  >
                    {expandedSections.includes(match.sectionId) ? 'Collapse' : 'Expand'}
                  </Button>
                </div>
              </div>
              
              {expandedSections.includes(match.sectionId) && (
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700 whitespace-pre-line">
                    {match.sectionContent}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-2">Matched Keywords:</h4>
                    <div className="flex flex-wrap gap-2">
                      {match.matchedKeywords.map(keyword => (
                        <Badge key={keyword} variant="outline" className="bg-gray-100">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="keywords">
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-4">Keywords Found in FIR</h3>
              
              <div className="space-y-4">
                {/* Get all unique keywords across all matches */}
                {Array.from(new Set(matches.flatMap(m => m.matchedKeywords))).map(keyword => (
                  <div key={keyword} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                    <h4 className="font-medium text-bns mb-2">"{keyword}"</h4>
                    <div className="space-y-2">
                      {matches
                        .filter(m => m.matchedKeywords.includes(keyword))
                        .map(match => (
                          <div key={`${keyword}-${match.sectionId}`} className="pl-4 border-l-2 border-bns-light">
                            <p className="text-sm text-gray-600">{match.sectionTitle}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultSections;
