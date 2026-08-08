import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  SearchCheck, 
  FolderKanban, 
  Lock, 
  LifeBuoy, 
  Radar,
  BadgeCheck, 
  Radio, 
  Gamepad2, 
  User, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isCurrent = (path: string) => 
    location.pathname === path || (path !== '/app' && location.pathname.startsWith(path));

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/app' },
    { label: 'Verify Someone', icon: SearchCheck, path: '/app/verify' },
    { label: 'Investigate Incident', icon: FolderKanban, path: '/app/investigate', badge: 'AI Core' },
    { label: 'Evidence Vault', icon: Lock, path: '/app/vault' },
    { label: 'Recovery Center', icon: LifeBuoy, path: '/app/recovery' },
    { label: 'AI Risk Radar', icon: Radar, path: '/app/risk-radar' },
    { label: 'Safety Passport', icon: BadgeCheck, path: '/app/passport' },
    { label: 'Emergency SOS', icon: Radio, path: '/app/sos', badge: 'SOS', emergency: true },
    { label: 'Learning Hub', icon: Gamepad2, path: '/app/learn' },
    { label: 'Profile & Settings', icon: User, path: '/app/profile' },
  ];

  return (
    <>
      {/* Desktop Navigation Dock */}
      <aside className="hidden md:flex flex-col justify-between h-screen w-20 lg:w-64 bg-[#0d0e11] text-[#ffffff] border-r border-[rgba(255,255,255,0.08)] p-4 font-sans select-none z-30 shadow-2xl shrink-0">
        
        {/* Brand Header */}
        <div className="space-y-6">
          <div 
            onClick={() => navigate('/app')}
            className="flex items-center space-x-3 cursor-pointer p-2.5 rounded-2xl hover:bg-[#17181c] transition-colors border border-transparent hover:border-[rgba(255,255,255,0.08)]"
          >
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-[#7c3aed] to-[#3b82f6] text-white shadow-lg flex-shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="hidden lg:block truncate">
              <span className="text-lg font-bold tracking-tight text-[#ffffff] block">
                Cyber<span className="text-[#a78bfa]">Saheli</span>
              </span>
              <span className="text-[10px] text-[#10b981] font-mono block -mt-1 uppercase tracking-wider font-bold">
                CYBER SAFETY OS
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isCurrent(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center justify-between rounded-2xl px-3.5 py-3 text-xs font-semibold transition-all duration-200 ${
                    active
                      ? item.emergency
                        ? 'bg-[#ef4444] text-white shadow-lg shadow-[#ef4444]/20'
                        : 'bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white shadow-lg shadow-[#7c3aed]/20'
                      : item.emergency
                      ? 'text-[#ef4444] hover:bg-[#ef4444]/10 border border-[#ef4444]/20'
                      : 'text-[#c6c8d1] hover:bg-[#17181c] hover:text-[#ffffff] hover:border-[rgba(255,255,255,0.08)] border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 flex-shrink-0 ${active ? 'text-white' : item.emergency ? 'text-[#ef4444]' : 'text-[#a78bfa]'}`} />
                    <span className="hidden lg:inline">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`hidden lg:inline px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold ${
                      item.emergency
                        ? 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30'
                        : 'bg-[#7c3aed]/20 text-[#a78bfa] border border-[#7c3aed]/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile */}
        <div className="pt-4 border-t border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#17181c] border border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center space-x-3 overflow-hidden">
              <img
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                alt="Avatar"
                className="h-8 w-8 rounded-full border border-[#7c3aed] object-cover flex-shrink-0"
              />
              <div className="hidden lg:block truncate text-left">
                <span className="text-xs font-bold text-[#ffffff] block truncate">{user?.name || "Anushka Jagtap"}</span>
                <span className="text-[10px] text-[#8b909b] uppercase font-mono block">Verified User</span>
              </div>
            </div>

            <button
              onClick={() => { logout(); navigate('/'); }}
              className="hidden lg:block p-1.5 rounded-lg text-[#8b909b] hover:text-[#ef4444] hover:bg-[#1c1e23] transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0e11]/95 backdrop-blur-2xl border-t border-[rgba(255,255,255,0.08)] px-2 py-2 flex items-center justify-around font-sans">
        {navItems.slice(0, 5).map((item) => {
          const active = isCurrent(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold transition-colors ${
                active ? 'text-[#a78bfa]' : 'text-[#8b909b]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
