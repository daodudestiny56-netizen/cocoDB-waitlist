import { Twitter, Github, Linkedin, Disc } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 sm:py-10 md:py-12 border-t border-white/5 bg-background text-gray-500 relative z-10">
      <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-bold text-white text-base sm:text-lg tracking-tight">CocoDB</span>
          <p className="text-xs sm:text-sm mt-1 text-center md:text-left">© 2026 CocoDB Platforms Inc. All rights reserved.</p>
        </div>
        
        <div className="flex gap-4 sm:gap-6">
          <a href="#" className="p-2 rounded-full hover:bg-white/5 hover:text-white transition-all transform hover:scale-110">
            <span className="sr-only">Twitter</span>
            <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a href="#" className="p-2 rounded-full hover:bg-white/5 hover:text-white transition-all transform hover:scale-110">
            <span className="sr-only">GitHub</span>
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a href="#" className="p-2 rounded-full hover:bg-white/5 hover:text-white transition-all transform hover:scale-110">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a href="#" className="p-2 rounded-full hover:bg-white/5 hover:text-white transition-all transform hover:scale-110">
            <span className="sr-only">Discord</span>
            <Disc className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
