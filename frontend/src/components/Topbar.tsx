import { useState } from 'react';
import { Search, Bell, Command } from 'lucide-react';
import { CommandPalette } from './CommandPalette';

export function Topbar() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-[#0d0e11] border-b border-[rgba(255,255,255,0.08)] px-6 flex items-center justify-between font-sans select-none z-20">
        
        {/* Search Command Palette Trigger */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-4 py-2 bg-[#17181c] border border-[rgba(255,255,255,0.08)] hover:border-[#4f8cff] rounded-2xl text-xs text-[#8b909b] transition-all"
          >
            <div className="flex items-center space-x-2">
              <Search className="h-3.5 w-3.5 text-[#4f8cff]" />
              <span>Search cases, evidence, or commands...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#111214] border border-[rgba(255,255,255,0.08)] text-[10px] font-mono text-[#8b909b]">
              <Command className="h-3 w-3" /> K
            </kbd>
          </button>
        </div>

        {/* Right Status Badges & Notifications */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-[#17181c] border border-[rgba(255,255,255,0.08)] text-xs font-mono">
            <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[#ffffff] font-bold text-[11px]">TITANIUM SHIELD ONLINE</span>
          </div>

          <button className="p-2.5 rounded-2xl bg-[#17181c] border border-[rgba(255,255,255,0.08)] text-[#8b909b] hover:text-[#ffffff] hover:border-[#4f8cff] transition-colors relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#4f8cff]" />
          </button>
        </div>
      </header>

      {/* Command Palette Modal */}
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
    </>
  );
}
