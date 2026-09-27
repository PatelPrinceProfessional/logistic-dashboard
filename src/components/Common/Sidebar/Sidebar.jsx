import { useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { MENU_CONFIG, MENU_SECTIONS } from '../../../routes/menuConfig';
import { useUIStore } from '../../../store/useUIStore';

/** Dynamically resolve Lucide icon by name */
const Icon = ({ name, size = 20 }) => {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) return <span style={{ width: size, height: size, display: 'inline-block' }} />;
  return <LucideIcon size={size} />;
};

export default function Sidebar() {
  const location    = useLocation();
  const collapsed   = useUIStore((s) => s.sidebarCollapsed);
  const mobileOpen  = useUIStore((s) => s.sidebarMobileOpen);
  const openMenuId  = useUIStore((s) => s.openMenuId);
  const toggleSidebar       = useUIStore((s) => s.toggleSidebar);
  const closeMobileSidebar  = useUIStore((s) => s.closeMobileSidebar);
  const setOpenMenu         = useUIStore((s) => s.setOpenMenu);

  // Auto-expand the menu whose submenu matches current path
  useEffect(() => {
    for (const menu of MENU_CONFIG) {
      const hasActive = menu.submenu?.some((sub) => location.pathname === sub.path || location.pathname.startsWith(sub.path + '/'));
      if (hasActive) {
        setOpenMenu(menu.id);
        break;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const sidebarClass = [
    'sidebar',
    collapsed   ? 'sidebar--collapsed' : '',
    mobileOpen  ? 'sidebar--mobile-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="drawer-overlay"
          style={{ zIndex: 899 }}
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      <aside className={sidebarClass} aria-label="Main navigation" role="navigation">
        {/* Toggle button */}
        <div className="sidebar__toggle">
          {!collapsed && <span className="sidebar__label">NAVIGATION</span>}
          <button
            id="sidebar-toggle-btn"
            className="sidebar__toggle-btn"
            onClick={toggleSidebar}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed
              ? <PanelLeftOpen size={18} />
              : <PanelLeftClose size={18} />
            }
          </button>
        </div>

        {/* Nav items */}
        <nav className="sidebar__nav" aria-label="Primary navigation">
          {MENU_SECTIONS.map((section) => (
            <div key={section.label}>
              {/* Section label */}
              {!collapsed && (
                <div className="sidebar__section-label">{section.label}</div>
              )}
              {collapsed && <div className="sidebar__sep" aria-hidden="true" />}

              {section.ids.map((menuId) => {
                const menu = MENU_CONFIG.find((m) => m.id === menuId);
                if (!menu) return null;

                const isOpen    = openMenuId === menu.id;
                const isActive  = location.pathname === menu.path
                  || menu.submenu?.some((s) => location.pathname === s.path || location.pathname.startsWith(s.path + '/'));

                return (
                  <div
                    key={menu.id}
                    className={`sidebar-item ${isOpen ? 'sidebar-item--open' : ''}`}
                  >
                    {/* Main trigger */}
                    <div
                      id={`menu-${menu.id}`}
                      role="button"
                      tabIndex={0}
                      className={`sidebar-item__trigger ${isActive ? 'active' : ''}`}
                      data-tooltip={menu.label}
                      aria-expanded={isOpen}
                      aria-haspopup={menu.submenu?.length > 0}
                      onClick={() => setOpenMenu(menu.id)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpenMenu(menu.id); }}
                    >
                      <span className="sidebar-item__icon" aria-hidden="true">
                        <Icon name={menu.icon} size={20} />
                      </span>
                      <span className="sidebar-item__text">{menu.label}</span>
                      {menu.submenu?.length > 0 && (
                        <ChevronDown size={15} className="sidebar-item__chevron" aria-hidden="true" />
                      )}
                    </div>

                    {/* Submenu */}
                    {menu.submenu?.length > 0 && !collapsed && (
                      <div
                        className="sidebar-item__submenu"
                        role="group"
                        aria-label={`${menu.label} submenu`}
                      >
                        {menu.submenu.map((sub) => (
                          <NavLink
                            key={sub.id}
                            to={sub.path}
                            id={`submenu-${sub.id}`}
                            className={({ isActive }) =>
                              `sidebar-subitem${isActive ? ' active' : ''}`
                            }
                            end={sub.path === '/'}
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
