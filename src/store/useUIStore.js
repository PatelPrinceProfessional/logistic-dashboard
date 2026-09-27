/**
 * LOGISTICSHUB — UI STORE
 * Manages: sidebar state, active menu, theme
 */
import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // Sidebar
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  openMenuId: null,        // which main menu is expanded

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed, openMenuId: null })),
  toggleMobileSidebar: () => set((s) => ({ sidebarMobileOpen: !s.sidebarMobileOpen })),
  closeMobileSidebar: () => set({ sidebarMobileOpen: false }),

  setOpenMenu: (id) => set((s) => ({ openMenuId: s.openMenuId === id ? null : id })),

  // Page title for breadcrumbs
  pageTitle: 'Executive Dashboard',
  breadcrumbs: [{ label: 'Home', path: '/' }],
  setPageMeta: (title, crumbs) => set({ pageTitle: title, breadcrumbs: crumbs }),
}));
