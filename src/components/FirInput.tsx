
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-fir flex items-center gap-2">
        <FileText className="h-5 w-5" />
        FIR Input
      </h2>
      
      <Textarea
        placeholder="Enter FIR text here or upload a file..."
        className="min-h-[200px] mb-4 border-fir-light/30"
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
          <label
            htmlFor="file-upload"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Upload File</span>
          </label>
        </div>
        
        <Button 
          onClick={handleSubmit}
          disabled={isProcessing || !firText.trim()}
          className="bg-fir hover:bg-fir-dark"
        >
          Process FIR Text
        </Button>
      </div>
    </div>
  );
};

export default FirInput;
