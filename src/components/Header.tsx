
import { FileText, Book } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-fir to-bns p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-8 w-8 text-white" />
          <h1 className="text-2xl font-bold text-white">FIR to BNS Matcher</h1>
        </div>
        <div className="flex items-center gap-2 text-white">
          <Book className="h-6 w-6" />
          <span className="text-sm md:text-base">Semantic Section Mapping</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
