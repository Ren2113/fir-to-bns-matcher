
import { CheckCircle, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export type ProcessingStatus = "idle" | "extracting" | "embedding" | "matching" | "complete";

interface ProcessingStepsProps {
  status: ProcessingStatus;
}

const ProcessingSteps = ({ status }: ProcessingStepsProps) => {
  const steps = [
    { id: "extracting", label: "Extracting Keywords", icon: <CheckCircle /> },
    { id: "embedding", label: "Generating Embeddings", icon: <CheckCircle /> },
    { id: "matching", label: "Matching BNS Sections", icon: <CheckCircle /> },
    { id: "complete", label: "Processing Complete", icon: <CheckCircle /> },
  ];

  const getCurrentStepIndex = () => {
    if (status === "idle") return -1;
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

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xl font-semibold mb-6 text-fir">Processing Status</h2>
      
      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-4 top-0 w-0.5 h-full bg-gray-200 z-0"></div>
        
        {steps.map((step, index) => {
          // Determine the state of this step
          const isActive = index === currentStepIndex;
          const isCompleted = currentStepIndex > index && currentStepIndex !== -1;
          const isPending = currentStepIndex < index && currentStepIndex !== -1;
          
          return (
            <motion.div 
              key={step.id} 
              className="relative z-10 mb-6 last:mb-0 flex items-start"
              variants={itemVariants}
            >
              <motion.div 
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-fir-light text-white' : 
                  isCompleted ? 'bg-green-500 text-white' : 
                  'bg-gray-200 text-gray-400'
                }`}
                animate={isActive ? { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] } : {}}
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
                  <ArrowRight className="h-5 w-5" />
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
                  <motion.p 
                    className="text-sm text-gray-500 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    In progress...
                  </motion.p>
                )}
                
                {isCompleted && (
                  <motion.p 
                    className="text-sm text-green-600 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Completed
                  </motion.p>
                )}
                
                {isPending && (
                  <p className="text-sm text-gray-400 mt-1">Waiting to start</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProcessingSteps;
