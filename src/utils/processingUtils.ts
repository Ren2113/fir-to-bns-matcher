
import { useToast } from "@/hooks/use-toast";

// Translation utility (mock implementation)
export const translateToEnglish = async (text: string): Promise<string> => {
  // In a real implementation, you would call a translation API like Google Translate
  console.log("Translating text to English:", text);
  
  // For now, return the original text (assuming it's already in English for testing)
  // In production, this would be replaced with actual API call
  return text;
};

// Keyword extraction utility using RAKE-like algorithm (simplified implementation)
export const extractKeywords = (text: string): string[] => {
  // Basic keyword extraction - split by spaces and filter out common words
  // In production, you would use a proper NLP library
  console.log("Extracting keywords from text:", text);
  
  const stopWords = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "with",
    "by", "of", "from", "as", "i", "you", "he", "she", "it", "we", "they", "is",
    "am", "are", "was", "were", "be", "been", "being", "have", "has", "had",
    "do", "does", "did", "will", "would", "shall", "should", "can", "could", "may",
    "might", "must", "this", "that", "these", "those"
  ]);
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/) // Split by whitespace
    .filter(word => word.length > 3 && !stopWords.has(word)); // Filter out stop words and short words
  
  // Count word frequencies
  const wordFreq: { [key: string]: number } = {};
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });
  
  // Get unique keywords sorted by frequency
  const keywords = Object.keys(wordFreq)
    .sort((a, b) => wordFreq[b] - wordFreq[a])
    .slice(0, 15); // Get top 15 keywords
  
  return keywords;
};

// Mock BERT embedding generation (in a real implementation, you would use a proper embedding model)
export const generateEmbeddings = async (text: string): Promise<number[]> => {
  console.log("Generating embeddings for:", text);
  
  // In a real implementation, you would use a BERT model
  // This is a mock implementation that generates random embeddings
  const dimension = 128; // Typical embedding dimension
  const embedding = Array(dimension).fill(0).map(() => Math.random() * 2 - 1);
  
  // Normalize embeddings (common for cosine similarity)
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  const normalizedEmbedding = embedding.map(val => val / magnitude);
  
  return normalizedEmbedding;
};

// Calculate cosine similarity between two embeddings
export const cosineSimilarity = (embedding1: number[], embedding2: number[]): number => {
  if (embedding1.length !== embedding2.length) {
    throw new Error("Embeddings must have the same dimension");
  }
  
  let dotProduct = 0;
  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i];
  }
  
  // Vectors are already normalized, so cosine similarity is just the dot product
  return dotProduct;
};

export interface BnsSection {
  id: string;
  title: string;
  content: string;
  embedding?: number[];
}

export interface BnsMatch {
  sectionId: string;
  sectionTitle: string;
  sectionContent: string;
  matchScore: number;
  matchedKeywords: string[];
}

// Find matching BNS sections for FIR embeddings
export const findMatchingSections = (
  firEmbedding: number[],
  firKeywords: string[],
  bnsSections: BnsSection[]
): BnsMatch[] => {
  console.log("Finding matching sections");
  
  // Calculate similarity scores
  const matches = bnsSections.map(section => {
    if (!section.embedding) {
      throw new Error(`Section ${section.id} does not have embeddings`);
    }
    
    const similarityScore = cosineSimilarity(firEmbedding, section.embedding);
    
    // Find matched keywords
    const matchedKeywords = firKeywords.filter(keyword => 
      section.content.toLowerCase().includes(keyword.toLowerCase())
    );
    
    return {
      sectionId: section.id,
      sectionTitle: section.title,
      sectionContent: section.content,
      matchScore: similarityScore,
      matchedKeywords
    };
  });
  
  // Sort by similarity score (highest first)
  const sortedMatches = matches.sort((a, b) => b.matchScore - a.matchScore);
  
  // Take top matches (e.g., top 10)
  return sortedMatches.slice(0, 10);
};
