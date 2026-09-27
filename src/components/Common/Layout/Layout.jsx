import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { useUIStore } from '../../../store/useUIStore';

/**
 * Layout — wraps every authenticated page with Navbar + Sidebar + Content area
 *
 * @param {object}  props
 * @param {React.ReactNode} props.children   — page content
 * @param {string}  props.title              — page title
 * @param {Array}   props.breadcrumbs        — [{label, path}]
 * @param {React.ReactNode} props.actions    — page header actions (buttons)
 * @param {boolean} props.noPadding          — skip default padding on content
 */
export default function Layout({
  children,
  title,
  breadcrumbs = [],
  actions,
  noPadding = false,
}) {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const setPageMeta = useUIStore((s) => s.setPageMeta);

  useEffect(() => {
    if (title) {
      document.title = `${title} — LogisticsHub`;
      setPageMeta(title, breadcrumbs);
    }
  }, [title]);

  const contentStyle = {
    marginLeft: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
  };

  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main
          className="main-content"
          id="main-content"
          role="main"
          aria-label={title}
          style={contentStyle}
        >
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <NavLink to="/" className="breadcrumb__item" aria-label="Home">
                <Home size={13} />
              </NavLink>
              <ChevronRight size={13} className="breadcrumb__sep" aria-hidden="true" />
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <span key={crumb.path || i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {isLast ? (
                      <span
                        className="breadcrumb__item breadcrumb__item--current"
                        aria-current="page"
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <NavLink to={crumb.path} className="breadcrumb__item">
                          {crumb.label}
                        </NavLink>
                        <ChevronRight size={13} className="breadcrumb__sep" aria-hidden="true" />
                      </>
                    )}
                  </span>
                );
              })}
            </nav>
          )}

          {/* Page Header */}
          {(title || actions) && (
            <header className="page-header">
              <div className="page-header__top">
                {title && (
                  <div className="page-header__title-group">
                    <h1 className="page-header__title">{title}</h1>
                  </div>
                )}
                {actions && (
                  <div className="page-header__actions">{actions}</div>
                )}
              </div>
            </header>
          )}

          {/* Page Content */}
          <div className={noPadding ? '' : 'page-content'}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
