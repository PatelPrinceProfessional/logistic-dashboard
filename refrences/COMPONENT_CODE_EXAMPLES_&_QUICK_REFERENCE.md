# 🛠️ COMPONENT CODE EXAMPLES & QUICK REFERENCE
## Industrial Logistics UI - Developer Guide

---

# QUICK COLOR REFERENCE

```css
/* Primary Colors */
--color-white: #FFFFFF;
--color-off-white: #F8F9FA;
--color-light-gray: #F1F3F5;
--color-medium-gray: #E9ECEF;
--color-dark-gray-text: #2C3E50;
--color-secondary-gray: #6C757D;

/* Accent Colors */
--color-primary-blue: #0066CC;
--color-hover-blue: #0052A3;
--color-light-blue: #E7F0FF;
--color-success: #28A745;
--color-warning: #FF9800;
--color-error: #DC3545;
--color-info: #17A2B8;

/* Status Colors */
--color-on-time: #27AE60;
--color-at-risk: #E67E22;
--color-delayed: #E74C3C;
--color-pending: #F39C12;
--color-completed: #3498DB;
```

---

# QUICK TYPOGRAPHY REFERENCE

```css
/* Headings */
.h1 { font-size: 28px; font-weight: 700; line-height: 1.2; color: #2C3E50; }
.h2 { font-size: 24px; font-weight: 600; line-height: 1.3; color: #2C3E50; }
.h3 { font-size: 20px; font-weight: 600; line-height: 1.4; color: #2C3E50; }
.h4 { font-size: 16px; font-weight: 600; line-height: 1.5; color: #2C3E50; }

/* Body Text */
.body-large { font-size: 16px; font-weight: 400; line-height: 1.6; color: #2C3E50; }
.body-regular { font-size: 14px; font-weight: 400; line-height: 1.6; color: #2C3E50; }
.body-small { font-size: 12px; font-weight: 400; line-height: 1.5; color: #6C757D; }

/* Labels */
.label { font-size: 12px; font-weight: 600; letter-spacing: 0.5px; color: #2C3E50; }
.caption { font-size: 11px; font-weight: 400; color: #6C757D; }
```

---

# COMMON COMPONENT PATTERNS

## 1. PRIMARY BUTTON

```html
<button class="btn btn-primary">
  <svg class="btn-icon" width="20" height="20"><!-- Icon SVG --></svg>
  Create New Order
</button>
```

```css
.btn {
  padding: 10px 24px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: #0066CC;
  color: white;
}

.btn-primary:hover {
  background: #0052A3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.btn-primary:active {
  background: #003D7A;
}

.btn-primary:disabled {
  background: #CCCCCC;
  color: #999999;
  cursor: not-allowed;
}

.btn-icon {
  width: 20px;
  height: 20px;
  margin-right: 4px;
}
```

---

## 2. STATUS BADGE

```html
<!-- Status Badge (Pill Shape) -->
<span class="badge badge-on-time">On-Time</span>
<span class="badge badge-at-risk">At Risk</span>
<span class="badge badge-delayed">Delayed</span>
<span class="badge badge-pending">Pending</span>

<!-- Status Dot + Text -->
<span class="status-indicator status-on-time">
  <span class="status-dot"></span>
  On-Time
</span>
```

```css
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.badge-on-time {
  background: #27AE60;
  color: white;
}

.badge-at-risk {
  background: #FF9800;
  color: white;
}

.badge-delayed {
  background: #E74C3C;
  color: white;
}

.badge-pending {
  background: #F39C12;
  color: #000;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}
```

---

## 3. FORM INPUT FIELD

```html
<div class="form-group">
  <label for="order-id" class="form-label">Order ID *</label>
  <input 
    type="text" 
    id="order-id" 
    class="form-control" 
    placeholder="Enter order ID"
    required
  />
  <span class="form-helper">Enter the unique order identifier</span>
</div>

<!-- With Error -->
<div class="form-group">
  <label for="weight" class="form-label">Weight (kg) *</label>
  <input 
    type="number" 
    id="weight" 
    class="form-control is-invalid" 
    placeholder="0"
    value="invalid"
  />
  <span class="form-error">Weight must be a valid number</span>
</div>

<!-- With Success -->
<div class="form-group">
  <label for="destination" class="form-label">Destination *</label>
  <input 
    type="text" 
    id="destination" 
    class="form-control is-valid" 
    value="Mumbai, Maharashtra"
  />
  <span class="form-helper">Address verified</span>
</div>
```

```css
.form-group {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 12px;
  font-weight: 600;
  color: #2C3E50;
  margin-bottom: 6px;
  display: block;
}

.form-control {
  height: 40px;
  padding: 10px 12px;
  border: 1px solid #E9ECEF;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: #0066CC;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.form-control::placeholder {
  color: #999999;
}

.form-control.is-invalid {
  border-color: #DC3545;
}

.form-control.is-valid {
  border-color: #28A745;
}

.form-helper {
  font-size: 11px;
  color: #6C757D;
  margin-top: 4px;
}

.form-error {
  font-size: 11px;
  color: #DC3545;
  margin-top: 4px;
}
```

---

## 4. TABLE

```html
<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>
          <input type="checkbox" class="table-checkbox" />
        </th>
        <th class="sortable">Shipment ID</th>
        <th class="sortable">Customer</th>
        <th class="sortable">Status</th>
        <th class="sortable">ETA</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <input type="checkbox" class="table-checkbox" />
        </td>
        <td>SHP-12345</td>
        <td>ABC Corporation</td>
        <td>
          <span class="badge badge-on-time">On-Time</span>
        </td>
        <td>28-Sep-2024 14:00</td>
        <td>
          <button class="btn-icon" title="View details">👁️</button>
          <button class="btn-icon" title="More actions">⋮</button>
        </td>
      </tr>
      <tr class="table-row-hover">
        <td>
          <input type="checkbox" class="table-checkbox" />
        </td>
        <td>SHP-12346</td>
        <td>XYZ Logistics</td>
        <td>
          <span class="badge badge-at-risk">At Risk</span>
        </td>
        <td>28-Sep-2024 16:30</td>
        <td>
          <button class="btn-icon">👁️</button>
          <button class="btn-icon">⋮</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

```css
.table-container {
  overflow-x: auto;
  border: 1px solid #E9ECEF;
  border-radius: 8px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.table thead {
  background: #F8F9FA;
  border-bottom: 1px solid #E9ECEF;
}

.table th {
  height: 48px;
  padding: 12px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #2C3E50;
  user-select: none;
}

.table th.sortable {
  cursor: pointer;
  position: relative;
}

.table th.sortable:hover {
  background: #EFEFEF;
}

.table th.sortable::after {
  content: '⇅';
  margin-left: 8px;
  opacity: 0.5;
}

.table td {
  height: 48px;
  padding: 12px 16px;
  border-bottom: 1px solid #E9ECEF;
  font-size: 14px;
  color: #2C3E50;
  vertical-align: middle;
}

.table tbody tr:hover {
  background: #F8F9FA;
}

.table tbody tr:hover td {
  background: #F8F9FA;
}

.table-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.table-row-hover {
  /* Row with status indicator */
  border-left: 4px solid #FF9800;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 16px;
}

.btn-icon:hover {
  opacity: 0.7;
}
```

---

## 5. CARD COMPONENT

```html
<!-- Standard Card -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Shipments Today</h3>
    <button class="btn-more">⋮</button>
  </div>
  <div class="card-body">
    <p class="card-stat">1,247</p>
    <p class="card-subtitle">+12% from yesterday</p>
  </div>
</div>

<!-- Card with Footer -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Recent Alerts</h3>
  </div>
  <div class="card-body">
    <!-- Content -->
  </div>
  <div class="card-footer">
    <a href="#" class="card-link">View all alerts →</a>
  </div>
</div>
```

```css
.card {
  background: white;
  border: 1px solid #E9ECEF;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #E9ECEF;
  background: white;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #2C3E50;
  margin: 0;
}

.card-body {
  padding: 24px;
}

.card-footer {
  padding: 16px 24px;
  border-top: 1px solid #E9ECEF;
  background: #F8F9FA;
}

.card-stat {
  font-size: 28px;
  font-weight: bold;
  color: #0066CC;
  margin: 0 0 8px 0;
}

.card-subtitle {
  font-size: 14px;
  color: #27AE60;
  margin: 0;
}

.card-link {
  color: #0066CC;
  text-decoration: none;
  font-size: 14px;
}

.card-link:hover {
  text-decoration: underline;
}

.btn-more {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
}
```

---

## 6. TOAST NOTIFICATION

```html
<!-- Success Toast -->
<div class="toast toast-success" id="toast-1">
  <svg class="toast-icon" width="20" height="20"><!-- Checkmark SVG --></svg>
  <span class="toast-message">Shipment created successfully</span>
  <button class="toast-close" onclick="closeToast('toast-1')">✕</button>
</div>

<!-- Error Toast -->
<div class="toast toast-error" id="toast-2">
  <svg class="toast-icon" width="20" height="20"><!-- Error SVG --></svg>
  <span class="toast-message">Failed to update shipment</span>
  <button class="toast-close">✕</button>
</div>
```

```css
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 6px;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.14);
  animation: slideIn 0.3s ease;
  z-index: 9999;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(400px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.toast-success {
  background: #28A745;
  color: white;
}

.toast-error {
  background: #DC3545;
  color: white;
}

.toast-warning {
  background: #FF9800;
  color: white;
}

.toast-info {
  background: #17A2B8;
  color: white;
}

.toast-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.toast-message {
  flex: 1;
  font-size: 14px;
}

.toast-close {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  font-size: 18px;
  flex-shrink: 0;
}

.toast-close:hover {
  opacity: 0.8;
}
```

---

## 7. DROPDOWN/SELECT

```html
<div class="dropdown">
  <label for="customer-select" class="form-label">Customer</label>
  <select id="customer-select" class="form-control form-select">
    <option value="">Select a customer...</option>
    <option value="cust-001">ABC Corporation</option>
    <option value="cust-002">XYZ Logistics</option>
    <option value="cust-003">Global Freight</option>
  </select>
</div>

<!-- Custom Dropdown (Advanced) -->
<div class="custom-dropdown">
  <label class="form-label">Carrier</label>
  <div class="dropdown-trigger" onclick="toggleDropdown(this)">
    <span class="dropdown-selected">Select carrier...</span>
    <svg class="dropdown-arrow" width="20" height="20"><!-- Chevron SVG --></svg>
  </div>
  <div class="dropdown-menu" style="display:none;">
    <div class="dropdown-item" onclick="selectItem(this)">
      <span>ABC Transport</span>
      <span class="dropdown-rating">⭐ 4.8</span>
    </div>
    <div class="dropdown-item" onclick="selectItem(this)">
      <span>XYZ Logistics</span>
      <span class="dropdown-rating">⭐ 4.5</span>
    </div>
    <div class="dropdown-item" onclick="selectItem(this)">
      <span>Quick Haul</span>
      <span class="dropdown-rating">⭐ 4.2</span>
    </div>
  </div>
</div>
```

```css
.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%230066CC' d='M10 14L0 4h20z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;
  padding-right: 40px;
}

.custom-dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}

.dropdown-trigger {
  height: 40px;
  padding: 10px 12px;
  border: 1px solid #E9ECEF;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.2s ease;
}

.dropdown-trigger:hover {
  border-color: #0066CC;
}

.dropdown-trigger:focus {
  outline: none;
  border-color: #0066CC;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.dropdown-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.dropdown-trigger.active .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E9ECEF;
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.dropdown-item {
  padding: 10px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background: #F8F9FA;
}

.dropdown-item.active {
  background: #E7F0FF;
  color: #0066CC;
}

.dropdown-rating {
  font-size: 12px;
  color: #6C757D;
}
```

---

## 8. MODAL DIALOG

```html
<!-- Modal Overlay -->
<div class="modal-overlay" id="shipment-modal">
  <div class="modal">
    <div class="modal-header">
      <h2 class="modal-title">Create Shipment</h2>
      <button class="modal-close" onclick="closeModal('shipment-modal')">✕</button>
    </div>
    <div class="modal-body">
      <!-- Form content -->
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal('shipment-modal')">
        Cancel
      </button>
      <button class="btn btn-primary">
        Create Shipment
      </button>
    </div>
  </div>
</div>
```

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-overlay.hidden {
  display: none;
}

.modal {
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.14);
  max-width: 600px;
  width: 90%;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid #E9ECEF;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #2C3E50;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  color: #6C757D;
}

.modal-close:hover {
  color: #2C3E50;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: 24px;
  border-top: 1px solid #E9ECEF;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-secondary {
  background: white;
  color: #0066CC;
  border: 1px solid #0066CC;
}

.btn-secondary:hover {
  background: #E7F0FF;
}
```

---

# LAYOUT PATTERNS

## Sidebar + Main Content

```html
<div class="layout-with-sidebar">
  <aside class="sidebar">
    <!-- Navigation -->
  </aside>
  <main class="main-content">
    <!-- Page content -->
  </main>
</div>
```

```css
.layout-with-sidebar {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid #E9ECEF;
  overflow-y: auto;
  flex-shrink: 0;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background: #FFFFFF;
}
```

---

## Grid Dashboard

```html
<div class="dashboard-grid">
  <div class="grid-item"><!-- Card 1 --></div>
  <div class="grid-item"><!-- Card 2 --></div>
  <div class="grid-item span-2"><!-- Wide card --></div>
  <div class="grid-item"><!-- Card 3 --></div>
  <div class="grid-item"><!-- Card 4 --></div>
</div>
```

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 24px;
}

.grid-item {
  grid-column: span 1;
}

.grid-item.span-2 {
  grid-column: span 2;
}

@media (max-width: 1024px) {
  .grid-item.span-2 {
    grid-column: span 1;
  }
}
```

---

# RESPONSIVE DESIGN BREAKPOINTS

```css
/* Mobile */
@media (max-width: 640px) {
  /* Mobile-first optimizations */
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  /* Tablet optimizations */
}

/* Desktop */
@media (min-width: 1025px) {
  /* Desktop layout */
}
```

---

# COMMON INTERACTIONS

## Loading Spinner

```html
<div class="spinner"></div>
```

```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #E9ECEF;
  border-top: 4px solid #0066CC;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Skeleton Loader

```html
<div class="skeleton skeleton-text"></div>
<div class="skeleton skeleton-avatar"></div>
<div class="skeleton skeleton-card"></div>
```

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #F1F3F5 0%,
    #E9ECEF 50%,
    #F1F3F5 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 16px;
  width: 100%;
  margin-bottom: 12px;
}

.skeleton-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.skeleton-card {
  height: 200px;
  width: 100%;
}
```

---

## Accordion

```html
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-header" onclick="toggleAccordion(this)">
      <span>Section 1</span>
      <svg class="accordion-icon" width="20" height="20"><!-- Chevron SVG --></svg>
    </button>
    <div class="accordion-body" style="display:none;">
      Content here...
    </div>
  </div>
  <div class="accordion-item">
    <button class="accordion-header" onclick="toggleAccordion(this)">
      <span>Section 2</span>
      <svg class="accordion-icon" width="20" height="20"><!-- Chevron SVG --></svg>
    </button>
    <div class="accordion-body" style="display:none;">
      Content here...
    </div>
  </div>
</div>
```

```css
.accordion {
  border: 1px solid #E9ECEF;
  border-radius: 8px;
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid #E9ECEF;
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-header {
  width: 100%;
  padding: 16px;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;
}

.accordion-header:hover {
  background: #F8F9FA;
}

.accordion-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.accordion-header.active .accordion-icon {
  transform: rotate(180deg);
}

.accordion-body {
  padding: 16px;
  background: #F8F9FA;
}
```

---

# ACCESSIBILITY GUIDELINES

```css
/* Focus visible styles */
button:focus-visible,
input:focus-visible,
a:focus-visible {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}

/* High contrast mode */
@media (prefers-contrast: more) {
  .btn-primary {
    border: 2px solid #003D7A;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Dark mode (if supported) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-white: #1E1E1E;
    --color-off-white: #2D2D2D;
    --color-dark-gray-text: #E0E0E0;
  }
}
```

---

# PERFORMANCE TIPS

1. **Lazy Load Images**: Use native lazy loading
```html
<img src="image.jpg" loading="lazy" alt="Description" />
```

2. **CSS Variables for Theming**:
```css
:root {
  --color-primary: #0066CC;
}
button { color: var(--color-primary); }
```

3. **Minimize Reflows**: Batch DOM updates

4. **Use CSS Grid/Flex**: For responsive layouts

5. **Optimize Animations**: Use transform and opacity only

---

# QUICK IMPLEMENTATION CHECKLIST

- [ ] Apply color palette consistently
- [ ] Use 8px grid spacing
- [ ] Implement all button states (normal, hover, active, disabled)
- [ ] Add focus states for accessibility
- [ ] Include loading states
- [ ] Show error/success states
- [ ] Implement responsive breakpoints
- [ ] Test keyboard navigation
- [ ] Check WCAG 2.1 AA contrast ratios
- [ ] Add empty states
- [ ] Include help text/tooltips
- [ ] Test on mobile devices
- [ ] Optimize performance
- [ ] Cross-browser testing

---

END OF COMPONENT REFERENCE GUIDE
