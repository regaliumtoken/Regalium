import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[150px]" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Crown className="w-20 h-20 text-gold mx-auto mb-8 opacity-50" />
          
          <h1 className="text-8xl md:text-9xl font-serif font-bold text-gradient-gold mb-4">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            Kingdom Not Found
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-md mx-auto mb-8">
            This realm has yet to be discovered. Return to the throne room and continue your royal journey.
          </p>
          
          <Button asChild variant="gold" size="xl">
            <Link to="/">
              <Home className="w-5 h-5" />
              Return to Kingdom
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
