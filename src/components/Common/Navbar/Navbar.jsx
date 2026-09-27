import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Bell, Mail, HelpCircle, ChevronDown,
  User, Settings, LogOut, Building2, Menu
} from 'lucide-react';
import { useUIStore } from '../../../store/useUIStore';
import { getInitials } from '../../../utils/statusHelpers';

const currentUser = {
  name: 'Rahul Patel',
  role: 'Transport Manager',
  email: 'rahul.patel@company.com',
};

export default function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const toggleMobileSidebar = useUIStore((s) => s.toggleMobileSidebar);
  const userMenuRef = useRef(null);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className="navbar" role="banner">
      {/* ── Hamburger (mobile) ── */}
      <button
        id="navbar-menu-btn"
        className="navbar__icon-btn"
        aria-label="Toggle menu"
        onClick={() => {
          toggleMobileSidebar();
          toggleSidebar();
        }}
        style={{ display: 'flex' }}
      >
        <Menu size={20} />
      </button>

      {/* ── Brand ── */}
      <Link to="/" className="navbar__brand" aria-label="LogisticsHub home">
        <div className="navbar__logo" aria-hidden="true">LH</div>
        <span className="navbar__app-name">LogisticsHub</span>
      </Link>

      {/* ── Search ── */}
      <div className="navbar__search" role="search">
        <Search className="navbar__search-icon" aria-hidden="true" />
        <input
          id="global-search"
          type="search"
          className="navbar__search-input"
          placeholder="Search orders, shipments, carriers..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          aria-label="Global search"
          autoComplete="off"
        />
      </div>

      {/* ── Right Actions ── */}
      <div className="navbar__actions" role="toolbar" aria-label="Navigation actions">
        {/* Notifications */}
        <button
          id="navbar-notifications-btn"
          className="navbar__icon-btn"
          aria-label="Notifications (23 unread)"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="navbar__badge" aria-hidden="true">23</span>
        </button>

        {/* Messages */}
        <button
          id="navbar-messages-btn"
          className="navbar__icon-btn"
          aria-label="Messages"
          title="Messages"
        >
          <Mail size={18} />
        </button>

        {/* Help */}
        <button
          id="navbar-help-btn"
          className="navbar__icon-btn"
          aria-label="Help"
          title="Help & Support"
        >
          <HelpCircle size={18} />
        </button>

        <div className="navbar__divider" aria-hidden="true" />

        {/* User Avatar + Dropdown */}
        <div style={{ position: 'relative' }} ref={userMenuRef}>
          <button
            id="navbar-user-btn"
            className="navbar__avatar"
            onClick={() => setUserMenuOpen((v) => !v)}
            aria-label={`User menu for ${currentUser.name}`}
            aria-expanded={userMenuOpen}
            aria-haspopup="menu"
          >
            {getInitials(currentUser.name)}
          </button>

          {userMenuOpen && (
            <div className="user-dropdown" role="menu" aria-label="User menu">
              <div className="user-dropdown__header">
                <div className="user-dropdown__name">{currentUser.name}</div>
                <div className="user-dropdown__role">{currentUser.role}</div>
              </div>

              <div role="none">
                <button role="menuitem" className="user-dropdown__item">
                  <User size={15} /> Profile
                </button>
                <button role="menuitem" className="user-dropdown__item">
                  <Settings size={15} /> Settings
                </button>
                <button role="menuitem" className="user-dropdown__item">
                  <Building2 size={15} /> Organization
                </button>
              </div>

              <div className="user-dropdown__sep" role="separator" />

              <button role="menuitem" className="user-dropdown__item user-dropdown__item--danger">
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
