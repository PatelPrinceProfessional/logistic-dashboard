/**
 * LOGISTICSHUB — STATUS HELPERS
 * Map statuses to colors, badge classes, and labels
 */

export const STATUS_MAP = {
  // Shipment statuses
  'on-time':    { label: 'On-Time',    badgeClass: 'badge--on-time',  dotClass: 'status-dot--on-time',   rowClass: 'table-row--on-time'  },
  'at-risk':    { label: 'At Risk',    badgeClass: 'badge--at-risk',   dotClass: 'status-dot--at-risk',    rowClass: 'table-row--at-risk'  },
  'delayed':    { label: 'Delayed',    badgeClass: 'badge--delayed',   dotClass: 'status-dot--delayed',    rowClass: 'table-row--delayed'  },
  'pending':    { label: 'Pending',    badgeClass: 'badge--pending',   dotClass: 'status-dot--pending',    rowClass: 'table-row--pending'  },
  'completed':  { label: 'Completed',  badgeClass: 'badge--completed', dotClass: 'status-dot--completed',  rowClass: 'table-row--completed'},
  'draft':      { label: 'Draft',      badgeClass: 'badge--draft',     dotClass: 'status-dot--draft',      rowClass: '' },
  'cancelled':  { label: 'Cancelled',  badgeClass: 'badge--cancelled', dotClass: 'status-dot--delayed',    rowClass: '' },

  // Order statuses
  'planned':    { label: 'Planned',    badgeClass: 'badge--info',      dotClass: 'status-dot--completed', rowClass: '' },
  'confirmed':  { label: 'Confirmed',  badgeClass: 'badge--primary',   dotClass: 'status-dot--completed', rowClass: '' },
  'assigned':   { label: 'Assigned',   badgeClass: 'badge--success',   dotClass: 'status-dot--on-time',   rowClass: '' },
  'dispatched': { label: 'Dispatched', badgeClass: 'badge--primary',   dotClass: 'status-dot--completed', rowClass: '' },
  'delivered':  { label: 'Delivered',  badgeClass: 'badge--on-time',   dotClass: 'status-dot--on-time',   rowClass: '' },
  'in-transit': { label: 'In Transit', badgeClass: 'badge--info',      dotClass: 'status-dot--completed', rowClass: '' },

  // Exception severity
  'critical':   { label: 'Critical',   badgeClass: 'badge--delayed',   dotClass: 'status-dot--delayed',   rowClass: '' },
  'high':       { label: 'High',       badgeClass: 'badge--at-risk',   dotClass: 'status-dot--at-risk',   rowClass: '' },
  'medium':     { label: 'Medium',     badgeClass: 'badge--pending',   dotClass: 'status-dot--pending',   rowClass: '' },
  'low':        { label: 'Low',        badgeClass: 'badge--info',      dotClass: 'status-dot--completed', rowClass: '' },
};

/**
 * Get badge class for a given status key
 */
export const getBadgeClass = (status) => {
  return STATUS_MAP[status?.toLowerCase()]?.badgeClass || 'badge--secondary';
};

/**
 * Get status label
 */
export const getStatusLabel = (status) => {
  return STATUS_MAP[status?.toLowerCase()]?.label || status;
};

/**
 * Get table row class for status highlight
 */
export const getRowClass = (status) => {
  return STATUS_MAP[status?.toLowerCase()]?.rowClass || '';
};

/**
 * Format currency
 */
export const formatCurrency = (value, currency = '₹') => {
  if (value >= 10000000) return `${currency}${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000)   return `${currency}${(value / 100000).toFixed(1)}L`;
  if (value >= 1000)     return `${currency}${(value / 1000).toFixed(1)}K`;
  return `${currency}${value}`;
};

/**
 * Format weight
 */
export const formatWeight = (kg) => {
  if (kg >= 1000) return `${(kg / 1000).toFixed(1)} T`;
  return `${kg} kg`;
};

/**
 * Format date
 */
export const formatDate = (date) => {
  if (!date) return '—';
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

/**
 * Format relative time
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1)    return 'just now';
  if (mins < 60)   return `${mins} min ago`;
  if (hrs < 24)    return `${hrs} hr ago`;
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

/**
 * Get initials from name
 */
export const getInitials = (name = '') => {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
};
