
import { BnsSection, generateEmbeddings } from "@/utils/processingUtils";

// This would be replaced by your actual JSON file data
// The path is relative to the public directory
const BNS_DATA_PATH = '/data/output.json';

interface BnsData {
  sections: {
    id: string;
    title: string;
    content: string;
  }[];
}

let processedSections: BnsSection[] = [];
let isProcessingComplete = false;

export const loadAndProcessBnsSections = async (): Promise<BnsSection[]> => {
  if (isProcessingComplete) {
    return processedSections;
  }
  
  try {
    console.log("Loading BNS sections from:", BNS_DATA_PATH);
    const response = await fetch(BNS_DATA_PATH);
    
    if (!response.ok) {
      throw new Error(`Failed to load BNS data: ${response.statusText}`);
    }
    
    const data: BnsData = await response.json();
    console.log(`Loaded ${data.sections.length} BNS sections`);
    
    // Process each section to generate embeddings
    const processedData: BnsSection[] = [];
    
    // Process in batches to avoid overwhelming the browser
    const BATCH_SIZE = 10;
    for (let i = 0; i < data.sections.length; i += BATCH_SIZE) {
      const batch = data.sections.slice(i, i + BATCH_SIZE);
      
      const batchProcessed = await Promise.all(
        batch.map(async (section) => {
          const embedding = await generateEmbeddings(section.content);
          return {
            id: section.id,
            title: section.title,
            content: section.content,
            embedding
          };
        })
      );
      
      processedData.push(...batchProcessed);
      console.log(`Processed ${Math.min(i + BATCH_SIZE, data.sections.length)} of ${data.sections.length} sections`);
    }
    
    processedSections = processedData;
    isProcessingComplete = true;
    return processedSections;
  } catch (error) {
    console.error("Error loading or processing BNS data:", error);
    throw error;
  }
};

export const getBnsSection = (sectionId: string): BnsSection | undefined => {
  return processedSections.find(section => section.id === sectionId);
};

export const getAllBnsSections = (): BnsSection[] => {
  return [...processedSections];
};
