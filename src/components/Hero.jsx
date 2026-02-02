import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../config/cocobase';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import logo from '../assets/logo-icon.png';

export function Hero() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');


  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setStatus('loading');
    setErrorMessage('');

    // Check if configuration is present before attempting signup
    if (!import.meta.env.VITE_COCOBASE_API_KEY || !import.meta.env.VITE_COCOBASE_PROJECT_ID) {
        setStatus('error');
        setErrorMessage("Configuration error: Cocobase API keys are missing. Please set them in your environment variables.");
        return;
    }

    try {
        // Register user with Cocobase Auth using custom metadata
        const authResponse = await db.auth.register(email, password, {
          early_access: true,
          signup_date: new Date().toISOString(),
          user_status: "active"
        });
    
        if (authResponse && authResponse.user) {
          // Optionally store additional waitlist info
          try {
            await db.createDocument("waitlist_users", {
              email: email,
              userId: authResponse.user.id,
              status: "waitlist",
              rank: "early_adopter",
              joinedAt: new Date().toISOString(),
              source: "landing_page"
            });
          } catch (docError) {
            console.warn("Waitlist document creation failed, but user is registered:", docError);
          }
          
          setStatus('success');
          setEmail(''); // Clear form
          setPassword('');
        } else {
             throw new Error("Failed to create account");
        }
      } catch (error) {
        console.error("=== SIGNUP ERROR ===");
        console.error("Full error:", error);
        
        setStatus('error');
        
        // Extract and simplify error message
        let errorMsg = "Something went wrong. Please try again.";
        
        // Try multiple ways to get the error message
        const errorResponse = error.response?.data;
        const errorDetail = errorResponse?.error?.detail || "";
        const responseError = errorResponse?.error?.message || errorResponse?.message || error.message || "";
        
        // Combine all error text for checking
        const allErrorText = (errorDetail + " " + responseError).toLowerCase();
        
        if (allErrorText.includes("already exists") || 
            allErrorText.includes("duplicate")) {
          errorMsg = "This email is already registered.";
        } else if (allErrorText.includes("invalid email")) {
          errorMsg = "Please enter a valid email address.";
        } else if (allErrorText.includes("password")) {
          errorMsg = "Password must be at least 8 characters.";
        } else if (errorDetail) {
          errorMsg = errorDetail;
        } else if (responseError && responseError.length < 100) {
          errorMsg = responseError;
        }
        
        setErrorMessage(errorMsg);
      }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section className="relative min-h-screen sm:min-h-[90vh] flex flex-col items-center justify-center pt-24 sm:pt-20 pb-16 sm:pb-20 px-4 overflow-hidden">
        {/* Aura Background */}
        <div className="absolute inset-0 bg-aura opacity-30 pointer-events-none" />
        
        {/* Navigation / Logo */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-10 md:left-10 flex items-center gap-2 sm:gap-3"
        >
            <img src={logo} alt="CocoDB Logo" className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain" />
            <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white">cocoDB</span>
        </motion.div>

        <div className="container mx-auto relative z-10 text-center max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div 
                    className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 rounded-full bg-surface/80 border border-white/10 backdrop-blur-sm text-xs sm:text-sm font-medium text-primary shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                    animate={{ 
                        y: [0, -5, 0],
                        boxShadow: [
                            '0 0 15px rgba(249,115,22,0.2)',
                            '0 0 25px rgba(249,115,22,0.4)',
                            '0 0 15px rgba(249,115,22,0.2)'
                        ]
                    }}
                    transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <span className="relative flex h-2 w-2 mr-2 inline-flex">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Public Beta Access
                </motion.div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight px-2">
                    <motion.span 
                        className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-amber-500"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundSize: '200% 200%',
                            filter: 'drop-shadow(0 0 30px rgba(249,115,22,0.5))'
                        }}
                    >
                        <motion.span
                            animate={{
                                textShadow: [
                                    '0 0 20px rgba(249,115,22,0.5), 0 0 40px rgba(249,115,22,0.3)',
                                    '0 0 30px rgba(249,115,22,0.7), 0 0 60px rgba(249,115,22,0.4)',
                                    '0 0 20px rgba(249,115,22,0.5), 0 0 40px rgba(249,115,22,0.3)'
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            Affordable
                        </motion.span>
                    </motion.span><br/>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Serverless Postgres
                    </motion.span>
                </h1>
                <motion.p 
                    className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Enterprise-grade Postgres at a <span className="text-primary font-semibold">fraction of the cost</span>. True isolation, zero-ops architecture. 
                    <br className="hidden sm:block"/>Pay only for what you use—<span className="text-green-400 font-semibold">no hidden fees</span>.
                </motion.p>
            </motion.div>

            <AnimatePresence mode="wait">
                {status === 'success' ? (
                     <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="bg-surface/80 backdrop-blur-md border border-primary/30 rounded-2xl p-6 sm:p-8 max-w-md mx-auto text-center relative overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.2)]"
                     >
                        <div className="absolute inset-0 bg-primary/5 blur-xl"></div>
                        <div className="relative z-10">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-primary/30"
                            >
                                <Check className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Account Created!</h3>
                            <p className="text-sm sm:text-base text-gray-400">You&apos;ve been added to the waitlist. We&apos;ll notify you when CocoDB launches!</p>
                        </div>
                     </motion.div>
                ) : (
                    <motion.form
                        key="signup"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        onSubmit={handleSignUp}
                        className="flex flex-col gap-3 max-w-lg mx-auto px-4 sm:px-0"
                    >
                        {/* Email Input */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg md:rounded-xl opacity-30 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 blur"></div>
                            <input 
                                type="email" 
                                placeholder="Enter your email address" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="relative w-full bg-surface border border-white/10 rounded-lg md:rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:bg-surface/90 focus:border-transparent transition-all duration-300"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg md:rounded-xl opacity-30 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 blur"></div>
                            <input 
                                type="password" 
                                placeholder="Create a password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                className="relative w-full bg-surface border border-white/10 rounded-lg md:rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:bg-surface/90 focus:border-transparent transition-all duration-300"
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={status === 'loading'}
                            className={cn(
                                "bg-white text-black font-bold text-base sm:text-lg rounded-lg md:rounded-xl px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center gap-2 relative overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow w-full",
                                status === 'loading' && "opacity-80 cursor-not-allowed"
                            )}
                        >
                             {status === 'loading' ? (
                                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                             ) : (
                                <>
                                    <span>Join Waitlist</span>
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </>
                             )}
                        </motion.button>
                    </motion.form>
                )}
            </AnimatePresence>
            
            {status === 'error' && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    className="mt-4 text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-3 text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg">
                        <span>{errorMessage}</span>
                        <button 
                            onClick={resetForm}
                            className="text-xs px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    </section>
  );
}
