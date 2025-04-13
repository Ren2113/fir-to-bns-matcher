import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, ArrowRight, Scan, Braces, FileSearch, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { ProcessingStep } from "@/services/firProcessingService";

interface ProcessingStepsProps {
  status: ProcessingStep;
  message?: string;
  progress?: number;
}

const ProcessingSteps = ({ status, message, progress = 0 }: ProcessingStepsProps) => {
  const steps = [
    { 
      id: ProcessingStep.TRANSLATING, 
      label: "Translating Text", 
      icon: <Scan />,
      description: "Converting regional language to English"
    },
    { 
      id: ProcessingStep.EXTRACTING, 
      label: "Extracting Keywords", 
      icon: <Scan />,
      description: "Identifying key terms from the FIR document"
    },
    { 
      id: ProcessingStep.EMBEDDING, 
      label: "Generating Embeddings", 
      icon: <Braces />,
      description: "Creating BERT embeddings from text"
    },
    { 
      id: ProcessingStep.MATCHING, 
      label: "Matching BNS Sections", 
      icon: <FileSearch />,
      description: "Finding relevant sections using cosine similarity"
    },
    { 
      id: ProcessingStep.COMPLETE, 
      label: "Processing Complete", 
      icon: <CheckCircle />,
      description: "All steps completed successfully"
    },
  ];

  const getCurrentStepIndex = () => {
    if (status === ProcessingStep.IDLE) return -1;
    if (status === ProcessingStep.ERROR) return -1;
    return steps.findIndex(step => step.id === status);
  };

  const currentStepIndex = getCurrentStepIndex();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  if (status === ProcessingStep.ERROR) {
    return (
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg border border-red-200 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-6 text-red-500 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Processing Error
        </h2>
        <p className="text-red-500 mb-4">{message || "An error occurred during processing"}</p>
        <Button variant="outline" className="border-red-300 text-red-500">
          Try Again
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="2" />
          <circle cx="30" cy="10" r="2" />
          <circle cx="50" cy="10" r="2" />
          <circle cx="70" cy="10" r="2" />
          <circle cx="90" cy="10" r="2" />
          <circle cx="10" cy="30" r="2" />
          <circle cx="30" cy="30" r="2" />
          <circle cx="50" cy="30" r="2" />
          <circle cx="70" cy="30" r="2" />
          <circle cx="90" cy="30" r="2" />
          <circle cx="10" cy="50" r="2" />
          <circle cx="30" cy="50" r="2" />
          <circle cx="50" cy="50" r="2" />
          <circle cx="70" cy="50" r="2" />
          <circle cx="90" cy="50" r="2" />
          <circle cx="10" cy="70" r="2" />
          <circle cx="30" cy="70" r="2" />
          <circle cx="50" cy="70" r="2" />
          <circle cx="70" cy="70" r="2" />
          <circle cx="90" cy="70" r="2" />
          <circle cx="10" cy="90" r="2" />
          <circle cx="30" cy="90" r="2" />
          <circle cx="50" cy="90" r="2" />
          <circle cx="70" cy="90" r="2" />
          <circle cx="90" cy="90" r="2" />
        </svg>
      </div>
      
      <h2 className="text-xl font-semibold mb-6 text-fir relative z-10">Processing Status</h2>
      
      <div className="relative z-10">
        <div className="absolute left-[22px] top-3 w-1 h-[calc(100%-24px)] bg-gradient-to-b from-gray-200 via-blue-100 to-fir/20 rounded-full z-0"></div>
        
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = currentStepIndex > index && currentStepIndex !== -1;
          const isPending = currentStepIndex < index && currentStepIndex !== -1;
          
          return (
            <motion.div 
              key={step.id} 
              className="relative z-10 mb-8 last:mb-0 flex items-start"
              variants={itemVariants}
            >
              <motion.div 
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-fir-light text-white shadow-lg shadow-fir/20' : 
                  isCompleted ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 
                  'bg-gray-200 text-gray-400'
                }`}
                animate={isActive ? { 
                  scale: [1, 1.1, 1],
                  boxShadow: ['0 10px 15px -3px rgba(0, 0, 0, 0.1)', '0 20px 25px -5px rgba(0, 0, 0, 0.1)', '0 10px 15px -3px rgba(0, 0, 0, 0.1)']
                } : {}}
                transition={isActive ? { 
                  repeat: Infinity, 
                  duration: 2
                } : {}}
              >
                {isActive ? (
                  <Clock className="h-5 w-5" />
                ) : isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <div className="p-1">
                    {step.icon || <ArrowRight className="h-4 w-4" />}
                  </div>
                )}
              </motion.div>
              
              <div className="ml-4 flex-1">
                <h3 className={`font-medium ${
                  isActive ? 'text-fir-light' : 
                  isCompleted ? 'text-green-500' : 
                  'text-gray-400'
                }`}>
                  {step.label}
                </h3>
                
                {isActive && (
                  <motion.div 
                    className="mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-gray-500">{step.description}</p>
                    <div className="mt-2 bg-blue-50 rounded-full h-1.5 overflow-hidden">
                      <motion.div 
                        className="bg-fir-light h-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ 
                          duration: 3,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                      />
                    </div>
                    <p className="text-xs text-fir-light mt-1">In progress...</p>
                  </motion.div>
                )}
                
                {isCompleted && (
                  <motion.div 
                    className="mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-gray-500">{step.description}</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Completed
                    </p>
                  </motion.div>
                )}
                
                {isPending && (
                  <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {status !== ProcessingStep.IDLE && status !== ProcessingStep.COMPLETE && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <motion.div 
              className="bg-fir h-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProcessingSteps;
