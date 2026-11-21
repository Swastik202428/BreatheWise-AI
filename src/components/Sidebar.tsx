import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BotMessageSquare,
  CalendarCheck2,
  Home,
  Footprints,
  Users2,
  Share2,
  Settings,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Logo } from './Logo';
import { useFamilyProfile } from '../context/FamilyProfileContext';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { profile } = useFamilyProfile();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/assistant', label: 'AI Assistant', icon: BotMessageSquare, badge: 'Gemini' },
    { to: '/routine', label: 'Daily Routine', icon: CalendarCheck2 },
    { to: '/indoor', label: 'Indoor Air Quality', icon: Home },
    { to: '/impact', label: 'Impact Tracker', icon: Footprints },
    { to: '/profile', label: 'Family Profile', icon: Users2 },
    { to: '/community', label: 'Community', icon: Share2 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#022c22] text-slate-200 border-r border-emerald-900/40">
      {/* Top Header */}
      <div className="p-5 flex items-center justify-between border-b border-emerald-900/50">
        <Logo />
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 text-emerald-400 hover:text-white hover:bg-emerald-900/50 rounded-lg transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-emerald-400/70">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 font-semibold'
                    : 'text-emerald-100/80 hover:bg-emerald-900/50 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-emerald-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 ${
                        isActive
                          ? 'bg-emerald-800 text-emerald-200'
                          : 'bg-emerald-900/80 text-emerald-300 border border-emerald-600/30'
                      }`}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Family Context Card in Sidebar */}
      <div className="p-3 mx-3 mb-3 rounded-xl bg-emerald-900/40 border border-emerald-800/40 text-xs">
        <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Active Family Shield</span>
        </div>
        <p className="text-emerald-200/70 text-[11px] leading-relaxed">
          {profile.familySize} members in {profile.city}
          {profile.hasChildren ? ' • Kids active' : ''}
          {profile.hasElderly ? ' • Senior care' : ''}
        </p>
      </div>

      {/* Footer Profile Pill */}
      <div className="p-3 border-t border-emerald-900/50 bg-[#01221a]">
        <NavLink
          to="/profile"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-900/40 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-emerald-950 font-bold flex items-center justify-center text-xs shadow-inner">
            {profile.city.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{profile.city} Family</p>
            <p className="text-[11px] text-emerald-400 truncate">
              {profile.hasPurifier ? 'HEPA Protected' : 'Purifier Off'}
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed left) */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[85vw] transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {content}
      </aside>
    </>
  );
};

