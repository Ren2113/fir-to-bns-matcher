
import { translateToEnglish, extractKeywords, generateEmbeddings, findMatchingSections, BnsMatch } from "@/utils/processingUtils";
import { loadAndProcessBnsSections } from "@/services/bnsService";

export enum ProcessingStep {
  IDLE = 'idle',
  TRANSLATING = 'translating',
  EXTRACTING = 'extracting',
  EMBEDDING = 'embedding',
  MATCHING = 'matching',
  COMPLETE = 'complete',
  ERROR = 'error'
}

export interface ProcessingStatus {
  step: ProcessingStep;
  progress: number;
  message?: string;
  error?: string;
}

export interface ProcessingResult {
  originalText: string;
  translatedText: string;
  keywords: string[];
  matches: BnsMatch[];
}

export type ProcessStatusCallback = (status: ProcessingStatus) => void;

export const processFirText = async (
  firText: string,
  onStatusUpdate: ProcessStatusCallback
): Promise<ProcessingResult> => {
  try {
    // Step 1: Translate text to English if needed
    onStatusUpdate({ 
      step: ProcessingStep.TRANSLATING, 
      progress: 10,
      message: "Translating text to English..."
    });
    const translatedText = await translateToEnglish(firText);
    
    // Step 2: Extract keywords
    onStatusUpdate({ 
      step: ProcessingStep.EXTRACTING, 
      progress: 30,
      message: "Extracting keywords from text..."
    });
    const keywords = extractKeywords(translatedText);
    
    // Step 3: Generate embeddings for FIR
    onStatusUpdate({ 
      step: ProcessingStep.EMBEDDING, 
      progress: 50,
      message: "Generating FIR embeddings..."
    });
    const firEmbedding = await generateEmbeddings(translatedText);
    
    // Step 4: Load and process BNS sections (if not already done)
    onStatusUpdate({ 
      step: ProcessingStep.MATCHING, 
      progress: 70,
      message: "Loading BNS sections and finding matches..."
    });
    const bnsSections = await loadAndProcessBnsSections();
    
    // Step 5: Find matching sections
    onStatusUpdate({ 
      step: ProcessingStep.MATCHING, 
      progress: 90,
      message: "Ranking matching sections..."
    });
    const matches = findMatchingSections(firEmbedding, keywords, bnsSections);
    
    // Processing complete
    onStatusUpdate({ 
      step: ProcessingStep.COMPLETE, 
      progress: 100,
      message: "Processing complete!"
    });
    
    return {
      originalText: firText,
      translatedText,
      keywords,
      matches
    };
  } catch (error) {
    console.error("Error processing FIR:", error);
    onStatusUpdate({ 
      step: ProcessingStep.ERROR, 
      progress: 0,
      message: "Error processing FIR",
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
};
