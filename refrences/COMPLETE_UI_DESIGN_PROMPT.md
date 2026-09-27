# 🎨 COMPLETE UI DESIGN PROMPT
## Industrial Logistics Management Ecosystem - Master Design Brief v1.0
---

# SECTION 0: DESIGN SYSTEM & FOUNDATION
## Global Design Foundation Prompt

**Build a professional, enterprise-grade design system with these specifications:**

### Color Palette
```
Primary Colors:
- White Background: #FFFFFF (main workspace)
- Off-White: #F8F9FA (card backgrounds, secondary areas)
- Light Gray: #F1F3F5 (hover states, subtle backgrounds)
- Medium Gray: #E9ECEF (dividers, borders)
- Dark Gray Text: #2C3E50 (primary text)
- Secondary Gray: #6C757D (secondary text)

Accent Colors:
- Primary Blue: #0066CC (buttons, links, active states)
- Hover Blue: #0052A3 (button hover)
- Light Blue: #E7F0FF (background highlights)
- Success Green: #28A745 (confirmations, positive actions)
- Warning Orange: #FF9800 (alerts, caution)
- Error Red: #DC3545 (errors, critical)
- Info Cyan: #17A2B8 (information)

Semantic Colors:
- On-Time (Green): #27AE60
- At-Risk (Orange): #E67E22
- Delayed (Red): #E74C3C
- Pending (Yellow): #F39C12
- Completed (Blue): #3498DB
```

### Typography
```
Font Stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif

Heading Hierarchy:
- H1: 28px, Font-Weight: 700, Line-height: 1.2, Color: #2C3E50
- H2: 24px, Font-Weight: 600, Line-height: 1.3, Color: #2C3E50
- H3: 20px, Font-Weight: 600, Line-height: 1.4, Color: #2C3E50
- H4: 16px, Font-Weight: 600, Line-height: 1.5, Color: #2C3E50

Body Text:
- Body Large: 16px, Font-Weight: 400, Line-height: 1.6, Color: #2C3E50
- Body Regular: 14px, Font-Weight: 400, Line-height: 1.6, Color: #2C3E50
- Body Small: 12px, Font-Weight: 400, Line-height: 1.5, Color: #6C757D

Labels & Inputs:
- Label: 12px, Font-Weight: 600, Letter-spacing: 0.5px, Color: #2C3E50
- Caption: 11px, Font-Weight: 400, Color: #6C757D
```

### Spacing System (8px grid)
```
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px
- xxxl: 64px
```

### Component Spacing Rules
```
- Card padding: 24px (lg)
- Section padding: 32px (xl)
- Component gaps: 16px (md)
- List item padding: 12px 16px (sm/md)
- Input field height: 40px
- Button height: 40px (regular), 36px (small)
- Icon size: 20px (regular), 24px (large)
```

### Border & Radius
```
- Border Color: #E9ECEF (medium gray)
- Border Width: 1px (standard)
- Border Radius: 6px (standard components)
- Border Radius: 8px (cards, modals)
- Border Radius: 4px (inputs, buttons)
```

### Shadows
```
- Subtle: 0 1px 3px rgba(0, 0, 0, 0.08)
- Light: 0 2px 4px rgba(0, 0, 0, 0.1)
- Medium: 0 4px 8px rgba(0, 0, 0, 0.12)
- Card Hover: 0 8px 16px rgba(0, 0, 0, 0.14)
```

### Icons
```
- Size: 20px standard
- Stroke-width: 2px
- Color: Match text color or context
- Spacing: 8px from text
```

---

# SECTION 1: LAYOUT & NAVIGATION STRUCTURE
## Master Navigation Architecture Prompt

**Create a cohesive navigation layout with:**

### Overall Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  TOP NAVBAR (60px height)                               │
│  Logo | Search | Notifications | User Menu              │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  SIDEBAR     │  MAIN CONTENT AREA                       │
│  (280px)     │  - Header with Breadcrumbs               │
│              │  - Action buttons                        │
│  Collapsible │  - Page Content                          │
│  on mobile   │  - Pagination/Footer                     │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

### Top Navigation Bar (Navbar)
```
LEFT SECTION (Logo & App Name):
- App Logo: 32x32px
- App Name: "LogisticsHub"
- Font: 20px, Bold, Color: #0066CC
- Spacing: 24px from left

CENTER SECTION (Search):
- Search bar width: 400px (or flexible)
- Placeholder: "Search orders, shipments, carriers..."
- Icon: Magnifying glass
- Background: #F8F9FA
- Border: 1px #E9ECEF
- Padding: 10px 16px
- Rounded: 4px
- Results dropdown below

RIGHT SECTION (User Controls):
- Notifications Icon (bell) - red badge count
- Messages Icon (envelope) - optional badge
- Help Icon (question mark)
- User Avatar Dropdown (32x32px circle)
  - Display name
  - Divider
  - Profile
  - Settings
  - Organizations
  - Divider
  - Logout
```

### Left Sidebar Navigation
```
STRUCTURE:
- Width: 280px (64px when collapsed)
- Background: #FFFFFF
- Border-right: 1px #E9ECEF
- Fixed or sticky positioning

MENU ITEMS (25 Main Menus):
- Each menu item: 48px height
- Padding: 12px 16px
- Display: Icon (24px) + Label (14px) + Collapse arrow
- Hover state: #F8F9FA background
- Active state: #E7F0FF background + #0066CC left border (4px)
- Collapsed submenu indicator: Chevron-right
- Expanded submenu indicator: Chevron-down

SUBMENU STRUCTURE:
- Indent: 16px from main menu
- Background: Slightly darker or same
- Separator line above: 1px #E9ECEF (optional)
- Height: 40px per item
- Font-size: 13px (smaller than main menu)
- Color on hover: #0066CC
- Active: #0066CC + bold

COLLAPSE/EXPAND:
- Toggle button at top: Hamburger icon
- Smooth animation: 0.3s
- Collapsed state: Show icons only (tooltip on hover)
- Expanded state: Show full labels
```

### Breadcrumbs
```
PLACEMENT:
- Below navbar, above page content
- Padding: 12px 24px
- Font-size: 13px
- Color: #6C757D (gray)

FORMAT:
- Icon > Section > Subsection > Current Page
- Example: Home > Shipments > All Shipments > SHP-12345
- Separator: / or >
- Last item: Bold, Color: #2C3E50
- Clickable items: Color: #0066CC (except last)
- Hover: Underline
```

### Page Header Layout
```
TOP ROW:
- Left: Page title (H2, 24px, bold)
- Right: Primary action buttons (space-separated)

TITLE + METADATA ROW:
- Icon (if applicable): 24px + 8px spacing
- Page Title: "Shipments" / "Orders" / "Carriers" etc.
- Breadcrumb trail below in light gray

ACTION BUTTONS ROW:
- Primary Button: "Create New", "Add Shipment", "Import" (Blue #0066CC)
- Secondary Buttons: "Filter", "Export", "Settings" (White with border)
- Button spacing: 8px between buttons
- Right-aligned

FILTER & VIEW CONTROLS:
- Row below buttons
- Quick filters: "Status: All", "Date Range", "Carrier"
- View toggle: List / Grid / Map (icon buttons)
- Saved views dropdown
```

### Main Content Area
```
WIDTH: Full width minus sidebar (280px)
PADDING: 24px (lg spacing)
MIN-HEIGHT: Viewport height
BACKGROUND: #FFFFFF

TYPICAL CONTENT ZONES:
1. Data Table/List Zone
2. Detail Panels
3. Action Modals
4. Toast Notifications
5. Side Panels (details, filters)
```

---

# SECTION 2: REUSABLE COMPONENTS LIBRARY
## Component Standards Prompt

**All sections must use these standardized components:**

### Buttons
```
PRIMARY BUTTON:
- Background: #0066CC (blue)
- Color: #FFFFFF (white text)
- Padding: 10px 24px
- Border-radius: 4px
- Font-weight: 600
- Hover: #0052A3 (darker blue)
- Active: #003D7A
- Disabled: #CCCCCC background + gray text
- Icon spacing: 8px left

SECONDARY BUTTON:
- Background: #FFFFFF
- Color: #0066CC (blue text)
- Border: 1px #0066CC
- Padding: 10px 24px
- Hover: #E7F0FF (light blue background)
- Active: #0052A3 border + text

DANGER BUTTON:
- Background: #DC3545 (red)
- Color: #FFFFFF
- Hover: #C82333 (darker red)
- Use for: Delete, Cancel shipment, Reject

SUCCESS BUTTON:
- Background: #28A745 (green)
- Color: #FFFFFF
- Hover: #218838 (darker green)
- Use for: Approve, Confirm, Complete

SMALL BUTTON:
- Height: 32px (smaller)
- Padding: 6px 12px
- Font-size: 12px
- For: Inline actions, table rows

ICON BUTTON:
- Background: Transparent or light
- Size: 40x40px
- Icon: 20px
- Hover: #F1F3F5 background
```

### Input Fields
```
TEXT INPUT:
- Height: 40px
- Padding: 10px 12px
- Border: 1px #E9ECEF
- Border-radius: 4px
- Font-size: 14px
- Background: #FFFFFF
- Focus: Border #0066CC (2px), shadow subtle
- Placeholder: Color #999999

LABEL:
- Font-size: 12px
- Font-weight: 600
- Color: #2C3E50
- Margin-bottom: 6px
- Display: Block

HELPER TEXT:
- Font-size: 11px
- Color: #6C757D
- Margin-top: 4px

ERROR STATE:
- Border: 1px #DC3545 (red)
- Helper text: Color #DC3545
- Icon: Red X on right side

SUCCESS STATE:
- Border: 1px #28A745 (green)
- Icon: Green checkmark on right side
```

### Dropdown/Select
```
CLOSED STATE:
- Height: 40px
- Appearance: Like text input
- Arrow icon: Right side
- Text: Show selected value

OPEN STATE:
- Dropdown: Below input
- Width: Match input width
- Items: 36px height
- Padding: 10px 16px
- Hover: #F8F9FA background
- Selected: #E7F0FF background + blue text
- Max-height: 300px (scroll if needed)
- Z-index: Above other content

MULTI-SELECT:
- Tags: Show selected items as chips
- Chip: Badge style with X to remove
- Placeholder when empty
```

### Cards
```
STANDARD CARD:
- Background: #FFFFFF
- Border: 1px #E9ECEF
- Border-radius: 8px
- Padding: 24px (lg)
- Shadow: 0 1px 3px rgba(0,0,0,0.08)
- Hover shadow: 0 4px 8px rgba(0,0,0,0.12) (optional)

CARD WITH HEADER:
- Header: Darker background (#F8F9FA) or border-bottom
- Header padding: 16px 24px
- Header title: 16px, bold
- Body padding: 24px
- Footer: Optional divider + 16px padding

CARD VARIATIONS:
- Compact card: 16px padding, smaller text
- Elevated card: Stronger shadow
- Bordered card: Thicker border for emphasis
```

### Tables
```
TABLE HEADER:
- Background: #F8F9FA (light gray)
- Height: 48px
- Padding: 12px 16px
- Font-weight: 600
- Font-size: 13px
- Color: #2C3E50
- Border-bottom: 1px #E9ECEF
- Sortable column: Arrow icon on hover

TABLE ROWS:
- Height: 48px
- Padding: 12px 16px
- Border-bottom: 1px #E9ECEF
- Font-size: 14px
- Hover: #F8F9FA background
- Alternate rows: Optional light striping

TABLE CELLS:
- Vertical alignment: Middle
- Text truncation: ... for long text
- Padding: 8px 12px

COLUMN TYPES:
- Status: Colored badge/dot
- Number: Right-aligned
- Date: Standard format (DD-MMM-YYYY)
- Actions: Icon buttons on right
```

### Badges/Tags/Status Indicators
```
STATUS BADGES:
- Height: 24px
- Padding: 4px 12px
- Border-radius: 12px (pill shape)
- Font-size: 12px
- Font-weight: 600

STATUS COLORS:
- On-Time: Green (#27AE60) background + white text
- At-Risk: Orange (#FF9800) background + white text
- Delayed: Red (#E74C3C) background + white text
- Pending: Yellow (#F39C12) background + dark text
- Completed: Blue (#3498DB) background + white text
- Draft: Gray (#6C757D) background + white text

STATUS DOT + TEXT:
- Dot: 8px circle
- Dot + Text: 4px gap
- Used in list views for quick identification

FILTER TAGS:
- Removable chips with X
- Background: #E7F0FF
- Color: #0066CC
- Remove hover: #DC3545 on X
```

### Modals/Dialogs
```
MODAL OVERLAY:
- Background: rgba(0, 0, 0, 0.5) (dark transparent)
- Z-index: 1000+
- Click outside: Close (if dismissible)

MODAL DIALOG:
- Background: #FFFFFF
- Border-radius: 8px
- Box-shadow: 0 8px 16px rgba(0, 0, 0, 0.14)
- Width: Varies (360px small, 600px medium, 800px large)
- Max-width: 90vw

MODAL HEADER:
- Padding: 24px
- Border-bottom: 1px #E9ECEF
- Title: 20px, bold
- Close button: Top-right X icon

MODAL BODY:
- Padding: 24px
- Font-size: 14px
- Max-height: 70vh (scrollable)

MODAL FOOTER:
- Padding: 24px
- Border-top: 1px #E9ECEF
- Buttons: Right-aligned (Cancel | Action)
- Button spacing: 12px
```

### Alerts/Notifications
```
TOAST NOTIFICATIONS (bottom-right):
- Position: Fixed bottom-right
- Background: Varies by type
- Padding: 16px 20px
- Border-radius: 6px
- Icon: Left side (16px)
- Close button: Right side (X)
- Max-width: 400px
- Animation: Slide-in (0.3s)
- Auto-dismiss: 4-5 seconds (configurable)

SUCCESS TOAST:
- Background: #28A745 (green)
- Color: #FFFFFF
- Icon: Checkmark

ERROR TOAST:
- Background: #DC3545 (red)
- Color: #FFFFFF
- Icon: X mark

WARNING TOAST:
- Background: #FF9800 (orange)
- Color: #FFFFFF
- Icon: Exclamation

INFO TOAST:
- Background: #17A2B8 (cyan)
- Color: #FFFFFF
- Icon: Info (i)

ALERT BANNER (inline):
- Full width below header
- Padding: 16px 24px
- Border-left: 4px colored
- Icon: 20px
- Message: Left of icon
- Close button: Right side (optional)
```

### Pagination
```
PAGINATION CONTROLS:
- Location: Below table/list
- Alignment: Right or center
- Spacing: 24px above

ELEMENTS:
- Items per page dropdown: "Show [10] entries"
- Page info: "Showing 1 to 10 of 100 entries"
- Previous/Next buttons: Chevron icons
- Page numbers: 1 2 3 ... 10
- Active page: Blue background

STYLING:
- Button height: 32px
- Button padding: 6px 12px
- Spacing between buttons: 4px
- Disabled state: Gray + no cursor
- Hover on valid pages: #F8F9FA background
```

### Sidebar/Drawer
```
SLIDE-OUT PANEL (right side):
- Width: 400px (or responsive)
- Background: #FFFFFF
- Border-left: 1px #E9ECEF
- Z-index: 900
- Animation: Slide from right (0.3s)

HEADER:
- Padding: 24px
- Title: 18px, bold
- Close button: Top-right X

CONTENT:
- Padding: 24px
- Scrollable area
- Max-height: viewport

FOOTER (optional):
- Border-top: 1px #E9ECEF
- Padding: 16px 24px
- Action buttons: Right-aligned
```

### Progress Indicators
```
LINEAR PROGRESS BAR:
- Height: 4px
- Background: #E9ECEF
- Filled: #0066CC
- Border-radius: 2px
- Width: Represents completion percentage

STEP INDICATOR (horizontal):
- Circle: 32px diameter
- Completed step: Blue circle with checkmark
- Active step: Blue circle with step number
- Pending step: Gray circle with step number
- Connector line: Between steps
- Spacing: 12px between steps

CIRCULAR PROGRESS:
- Diameter: 60px (standard)
- Stroke-width: 4px
- Color: Gradient from blue to lighter blue
- Center: Percentage text
```

---

# SECTION 3: HOME & COMMAND CENTER
## Homepage & Dashboard Prompt

**Build the landing page for all user roles with:**

### Executive Dashboard (for executives/managers)

```
LAYOUT:
- Full-width white background
- Max-width: 1400px (centered)
- Top section: KPI cards row
- Middle section: Charts grid
- Bottom section: Recent activity

TOP ROW - KEY METRICS (4 cards):
Card 1: Shipments Today
- Large number: 1,247 (28px, bold, blue)
- Label: "Shipments Today"
- Subtext: "+12% from yesterday" (green)
- Icon: Box icon (top-right, light blue background)
- Background: White, border 1px gray

Card 2: Revenue (This Month)
- Large number: $2.4M (28px, bold, green)
- Label: "Revenue (This Month)"
- Subtext: "+8% vs last month" (green)
- Icon: Dollar icon
- Trend arrow: Up

Card 3: On-Time Delivery
- Percentage: 94.2% (28px, bold)
- Label: "On-Time Delivery"
- Subtext: "Target: 95%"
- Gauge/circle: 94% filled (green)
- Icon: Checkmark

Card 4: Critical Exceptions
- Large number: 23 (28px, bold, red)
- Label: "Critical Exceptions"
- Subtext: "Requires attention"
- Icon: Alert triangle (red)
- Background: Light red (#FFF5F5)

SECOND ROW - CHARTS (2 columns, full-width):

Left Chart - Freight Spend Trend:
- Title: "Monthly Freight Spend"
- Type: Line chart (past 12 months)
- X-axis: Months (Jan-Dec)
- Y-axis: Currency ($)
- Color: Blue line
- Tooltip on hover: Date + Amount
- Height: 300px

Right Chart - Shipment Status Distribution:
- Title: "Shipment Status Distribution"
- Type: Pie/Donut chart
- On-Time: Green segment (45%)
- At-Risk: Orange segment (30%)
- Delayed: Red segment (15%)
- Pending: Gray segment (10%)
- Legend below chart
- Click segment: Filter to that status

THIRD ROW - OPERATIONAL SNAPSHOT (3 columns):

Left Panel - Top Performing Carriers:
- Title: "Top Carriers (by on-time %)"
- List: 5 carriers
- Format: Carrier name | On-time % | Count
- Example: "ABC Transport | 96.2% | 245 shipments"
- Color-coded percentage bars
- Sortable by clicking column

Center Panel - Exception Severity:
- Title: "Exceptions by Severity"
- Type: Horizontal bar chart
- Critical: Red bar (large)
- High: Orange bar
- Medium: Yellow bar
- Low: Blue bar
- Click bar: Drill down to exceptions

Right Panel - OTIF by Customer:
- Title: "OTIF by Customer (Top 5)"
- List: Customer name | OTIF % | Trend
- Status color: Green/Yellow/Red
- Hover: Show detailed breakdown

BOTTOM ROW - RECENT ACTIVITY:

Recent Shipments:
- Title: "Recent Shipments"
- Table: 5-7 rows (with pagination)
- Columns:
  - Shipment ID (blue link)
  - Customer
  - Origin - Destination
  - Status (badge)
  - ETA
  - Actions (details icon)
- Row hover: Light gray background
- Click row: Open shipment details

Alerts & Notifications:
- Title: "Recent Alerts"
- Timeline: Last 10 alerts
- Format: 
  - Icon | Alert type | Timestamp
  - "Delay detected: SHP-12345 running 2 hours late | 2 min ago"
  - Color-coded by severity
- View all link: Bottom right
```

### Operations Dashboard

```
LAYOUT: Similar to Executive, but role-specific metrics

TOP ROW - OPERATIONAL KPIs (4 cards):

Card 1: Active Shipments
- Number: 567
- Subtitle: "In Transit"
- Icon: Truck
- Color: Blue

Card 2: Pending Orders
- Number: 89
- Subtitle: "Awaiting Planning"
- Icon: List
- Color: Orange (warning)

Card 3: Fleet Utilization
- Percentage: 82%
- Gauge visualization
- Color: Green

Card 4: Pending Exceptions
- Number: 12
- Subtitle: "Unassigned"
- Color: Red background
- Quick action: "Assign All"

MIDDLE SECTION - OPERATIONAL CHARTS:

Left: Load Builder Capacity
- Title: "Current Fleet Capacity"
- Type: Stacked bar (vehicles)
- Full | 75-99% | 50-74% | <50%
- Color segments
- Hover: Vehicle count for each tier

Center: Trip Status Distribution
- Type: Progress bar groups
- Ready to Dispatch: 45 trips (blue)
- Dispatched: 120 trips (cyan)
- In Transit: 234 trips (blue-dark)
- Delivered: 456 trips (green)

Right: Dock Utilization
- Type: Horizontal bars (per dock)
- Dock 1: ████████░ 80%
- Dock 2: ███████░░ 70%
- Dock 3: ██████░░░ 60%
- Click dock: View appointment calendar

LOWER SECTION - ACTION PANELS:

Immediate Actions Panel:
- Title: "Urgent Actions Required"
- Items:
  - "Assign 5 pending loads"
  - "Review 3 failed deliveries"
  - "Approve 2 pending invoices"
- Color: Slight red tint
- Quick action buttons per item

Next 24 Hours:
- Title: "Critical Upcoming Events"
- Timeline: Appointments, loading schedules
- Format: Time | Event | Location
- Clickable to drill down

BOTTOM - RECENT TRIPS & ORDERS:

Trips In Progress:
- Table format
- Columns: Trip ID | Driver | Vehicle | Origin-Destination | ETA | Status
- Row color: Status color on left border
- Hover: Show real-time GPS location preview

Pending Orders:
- Table format
- Columns: Order ID | From | To | Items | Priority | Status
- Priority icon: ! for high priority
- Click to plan
```

### Control Tower

```
FULLSCREEN MAP-CENTRIC LAYOUT:

MAP AREA (takes 70% of screen):
- Type: Interactive map (Google Maps / Leaflet)
- Center: Default to company HQ or user location
- Zoom: User-controllable
- Full-screen toggle button (top-right)

VEHICLE PINS:
- Icon: Truck/vehicle icon
- Color: Green (on-time), Orange (at-risk), Red (delayed)
- Click pin: Show vehicle info popup

SHIPMENT PINS (optional toggle):
- Icon: Box
- Color: By status
- Cluster if too many

GEOFENCE VISUALIZATION:
- Polygon outlines
- Color: Light blue with border
- Label: Geofence name

HEAT MAP (optional):
- Density of shipments/vehicles
- Color gradient: Cool to warm

LEFT SIDEBAR (FILTERS & CONTROLS):

Filter Section:
- Status filter: Checkboxes (On-time, At-Risk, Delayed, Pending)
- Carrier filter: Multi-select dropdown
- Vehicle type filter: Truck, Van, Bike, etc.
- Date range: Start/end picker
- Apply filters button

Layer Toggle:
- Vehicles: Toggle on/off
- Shipments: Toggle on/off
- Geofences: Toggle on/off
- Traffic: Toggle on/off (if available)
- Heat map: Toggle on/off

Search:
- Find vehicle, shipment, or location
- Type and press Enter

RIGHT SIDEBAR (ALERT PANEL):

Alerts & Exceptions Stack:
- Title: "Active Exceptions (23)"
- Each exception card:
  - Severity badge: Color-coded
  - Icon: Alert type
  - Description: "Vehicle breakdown: VEH-456 on Route 12"
  - Time: "2 min ago"
  - Owner: Assigned to
  - Status: Investigating
  - Click: Open exception detail modal

BOTTOM BAR (STATS & CONTROLS):

Left stats:
- Total vehicles tracked: 245
- On-time: 189 (green)
- At-risk: 34 (orange)
- Delayed: 22 (red)

Center controls:
- View toggle: List | Map | Grid
- Real-time toggle: On/Off
- Refresh rate: 30 sec / 1 min / 5 min

Right actions:
- Incident reporting button
- Full-screen toggle
- Settings/preferences

TOOLTIP & POPUP DETAILS:

Vehicle Popup (on pin click):
- Vehicle ID
- Driver name
- Current location (address)
- Destination
- ETA
- Current speed
- Fuel level (if available)
- Close button

Exception Popup:
- Exception ID
- Type: "Late Arrival"
- Severity: High (red)
- Assigned to: Manager name
- Time remaining to resolve
- Quick action buttons: Reassign | Escalate | Resolve
```

### Alerts Center

```
LAYOUT: Full list with filters and detail view

HEADER:
- Title: "Alerts Center"
- Filter row:
  - Severity: All | Critical | High | Medium | Low
  - Status: All | Unassigned | Assigned | Investigating | Resolved
  - Type: All | Late Pickup | Late Delivery | Breakdown | Temperature | etc.
  - Date range: Quick select (Today | This week | This month | Custom)

MAIN LIST (table format):

Columns:
- Severity icon + color (colored dot)
- Alert type (icon + text): "Delivery Delay"
- Description: "SHP-12345 running 3 hours late"
- Related entity: "Order-98765"
- Assigned to: Avatar + name
- Time: "2 hours ago" (relative)
- Status badge: "Investigating"
- Actions: (...)

Row styling:
- Row height: 56px
- Severity color left border: Red/Orange/Yellow/Blue
- Hover: Light gray background
- Click row: Open detail panel on right

PAGINATION:
- Show X entries: 10 | 25 | 50
- Page numbers
- Total: "Showing 1 to 10 of 267 alerts"

DETAIL PANEL (right sidebar, slide-out):

Title: Alert ID + Type
Sections:
1. Summary
   - Severity: High (red badge)
   - Created: 2024-09-27 14:32
   - Last updated: 2024-09-27 15:15
   - Status: Investigating

2. Details
   - Alert type: Delivery Delay
   - Original ETA: 14:00
   - Current ETA: 17:15
   - Delay amount: 3h 15m
   - Root cause: Traffic congestion

3. Related entities
   - Shipment: SHP-12345 (link)
   - Order: ORD-98765 (link)
   - Vehicle: VEH-456 (link)
   - Driver: John Smith (link)

4. Timeline
   - Event log showing all changes

5. Actions
   - Assign to: Dropdown + assign button
   - Change status: Status dropdown
   - Reassign resources: Button
   - Escalate: Button
   - Resolve: Button
   - Add note: Text area + button

6. Audit trail
   - Who changed what and when
```

### Saved Views

```
LAYOUT: Library of customizable dashboard views

HEADER:
- Title: "Saved Views"
- New view button: "Create Custom View"

VIEWS GRID (3 columns):

Each view card:
- Thumbnail: Preview image
- Title: "Morning Ops Briefing"
- Description: "Daily operational snapshot for AM standup"
- Owner: "Transport Manager"
- Last modified: "Today at 09:30"
- Shared with: Icon count (3 users)
- Actions menu: (...)
  - View
  - Edit
  - Duplicate
  - Share
  - Delete

BUILT-IN VIEWS (examples):
1. Morning Briefing
2. Executive Summary
3. Night Shift Monitoring
4. Carrier Performance
5. Customer SLA Tracking

CUSTOM VIEW BUILDER (modal/page):
- Title input field
- Description field
- Widgets selector (drag-drop to add)
- Widget editor (size, filters, refresh rate)
- Colors/theme picker
- Sharing controls
- Save button
```

---

# SECTION 4: ORDERS MANAGEMENT
## Order Management Interface Prompt

**Build complete order management section with:**

### Orders Main List View

```
PAGE LAYOUT:
- Breadcrumb: Home > Orders > Orders
- Page title: "Orders" with count badge: (2,847)
- Subtitle: "Manage all transportation orders"

ACTION BAR (top-right):
- Primary: "Create New Order" (blue button)
- Secondary: "Import Orders" (white button)
- Icon buttons: Filter | Export | Settings | Columns

FILTER ROW:
- Status filter: All | Pending | Confirmed | Planned | Assigned | etc.
- Date range: Quick select or picker
- Priority: All | High | Medium | Low
- Customer: Dropdown or searchable
- Origin/Destination: City or region selectors
- Clear all filters button

ORDERS TABLE:

Columns (sortable):
- Checkbox (select multiple)
- Order ID (blue link, sortable) - e.g., "ORD-2024-001234"
- Customer (text, sortable)
- Origin (city/pin icon)
- Destination (city/pin icon)
- Items (count badge)
- Weight (numeric, sortable) - e.g., "250 kg"
- Status (badge, color-coded)
- Priority (icon: !, visual indicator)
- Order Date (date format, sortable)
- Expected Delivery (date, sortable)
- Actions (...)

Row styling:
- Height: 48px
- Row hover: #F8F9FA background
- Status color left border
- Click row: Open order detail view

TABLE CONTROLS:
- Rows per page: 10 | 25 | 50
- Pagination: Previous | 1 2 3 | Next
- View toggle: List | Grid
- Bulk actions (if rows selected):
  - Mark as: Confirmed | Planned | etc.
  - Priority: Set to High/Medium/Low
  - Delete
  - Export

STATUS BADGE COLORS:
- Draft: Gray
- Pending Validation: Yellow
- Validated: Blue
- Planned: Cyan
- Assigned: Green
- Dispatched: Dark Blue
- Delivered: Dark Green
- Cancelled: Red
```

### Create/Edit Order Modal

```
MODAL SIZE: 800px width
MODAL TITLE: "Create New Order"

FORM SECTIONS:

1. ORDER INFORMATION:
   - Order date (picker): Auto-filled with today
   - Order ID (auto-generated, read-only)
   - Customer (searchable dropdown): Required
     - Shows customer name + code
     - Recent customers at top
   - Priority (radio): Normal | High | Urgent
   - Service level (dropdown): Standard | Express | Same-day
   - Special instructions (text area, optional)

2. SHIPMENT DETAILS:
   - Shipment type (radio): Full Load | LTL | Parcel
   - Items section (expandable):
     Button: "+ Add Item"
     Per item:
     - SKU/Product (searchable field)
     - Description
     - Quantity
     - Unit of measure (dropdown): Pieces | Kg | Cbm
     - Weight per unit
     - Volume per unit
     - Hazmat (checkbox)
     - Temperature required (checkbox, conditional)
       - If yes: Min/Max temp inputs
     - Remove item button (X)
     
     Summary below:
     - Total items
     - Total weight
     - Total volume
     - Hazmat: Yes/No indicator

3. ORIGIN & DESTINATION:

   Origin Section:
   - Location (searchable dropdown or saved locations)
   - Address (auto-fill from location)
   - Pickup date/time (picker + time)
   - Dock/Gate (if facility has multiple)
   - Contact person
   - Phone number
   - Special instructions

   Destination Section:
   - Location (searchable)
   - Address (auto-fill)
   - Delivery date/time (picker + time)
   - Dock/Gate
   - Contact person
   - Phone number
   - Delivery instructions

4. OPTIONAL SETTINGS:
   - Insurance required (checkbox)
   - Reverse logistics needed (checkbox)
   - Bill of lading required (checkbox)
   - COD amount (numeric, if applicable)
   - Reference numbers (text area)

FORM BUTTONS (bottom):
- Cancel (white button)
- Save as Draft (secondary button)
- Validate & Save (primary button, blue)

VALIDATION:
- Required fields marked with *
- Error messages appear below field
- Form submission disabled if invalid
```

### Order Detail View

```
LAYOUT: Full page with sidebar + main content

BREADCRUMB:
Home > Orders > ORD-2024-001234

HEADER:
- Left: Order ID + Status badge
- Right: Action buttons
  - Edit (pencil icon)
  - Print (printer icon)
  - Share (share icon)
  - (...) menu: More actions

TABS (horizontal, below header):
- Overview (default)
- Shipments
- Timeline
- Documents
- Costs
- Audit

OVERVIEW TAB:

Left panel (60%):
- Order Information Card:
  - Order date, received date
  - Customer name (link)
  - Service level
  - Priority indicator
  - Order value

- Shipment Details Card:
  - Total items
  - Total weight
  - Total volume
  - Hazmat: Yes/No
  - Special requirements

- Origin Details Card:
  - Location name
  - Address
  - Pickup date/time
  - Pickup contact
  - Status: Not picked up | Picked up

- Destination Details Card:
  - Location name
  - Address
  - Expected delivery
  - Delivery contact
  - Status: In transit | Delivered

- Items Breakdown Card:
  - Table: SKU | Description | Qty | Weight | Volume
  - Per item: Click to view detail

Right panel (40%):

- Next Steps Card (yellow background, if not delivered):
  - "Next action: Create shipment"
  - "Recommended date: 27-Sep-2024"
  - "Create shipment" button

- Quick Actions Card:
  - Create shipment button
  - Split order button
  - On hold / Release button
  - Cancel order button

- Related Shipments Card:
  - List: SHP-12345 | SHP-12346
  - Status badges
  - Click to view

SHIPMENTS TAB:

- List of all shipments created from this order
- Format: Table with ID | Status | Carrier | ETA | Actions

TIMELINE TAB:

- Vertical timeline showing all events:
  - Order created
  - Validation completed
  - Planning assigned
  - Shipment created
  - Pickup scheduled
  - Picked up
  - In transit
  - Delivered
  - Each with timestamp and actor

DOCUMENTS TAB:

- Document list with upload capability
- Types: PO, Invoice, Packing list, etc.
- Upload area
- Document list: Name | Type | Date | Actions

COSTS TAB:

- Order-level costs breakdown
- Estimated vs. Actual
- Cost components (freight, fuel, surcharges)

AUDIT TAB:

- Change log with timestamp + actor
```

### Order Validation View

```
PAGE LAYOUT:
- Breadcrumb: Home > Orders > Validation
- Title: "Order Validation"
- Subtitle: "Review and fix validation errors"

VALIDATION QUEUE:

Status filter:
- All pending validations
- Critical errors
- Warnings
- Passed

Queue list (card format):

Per validation card:
- Order ID (link)
- Customer name
- Error/Warning list:
  - "Missing delivery address"
  - "Weight exceeds vehicle capacity"
  - "Invalid phone number format"
- Status indicator: Error (red) | Warning (orange) | Passed (green)
- Severity badge
- Action: Fix or View details button
- Timestamp: "2 hours ago"

DETAIL VIEW (click card or "Fix"):

Modal or slide-out:
- Order ID + Customer
- Error/warning list
- For each error:
  - Description
  - Suggested fix
  - Edit field directly or dismiss warning
- Validation buttons:
  - Re-validate
  - Mark as valid
  - Hold order

BULK ACTIONS:
- Select multiple orders
- Mark all as valid
- Mark all as invalid
- Re-validate all
```

---

# SECTION 5: SHIPMENTS MANAGEMENT
## Shipment Management Interface Prompt

**Build comprehensive shipment tracking and management:**

### Shipments Main List

```
LAYOUT:
- Breadcrumb: Home > Shipments > All Shipments
- Page title: "Shipments" (badge: 5,234)
- Filter bar with quick status filters

FILTERS:
- Status: All | Planned | Confirmed | Assigned | In Transit | Delivered | etc.
- Origin/Destination: Region selector
- Date range: Created | Pickup | Delivery
- Carrier filter
- Customer filter
- Vehicle type filter

SHIPMENTS TABLE:

Columns:
- Checkbox
- Shipment ID (SHP-XXXXXX format, link)
- Order ID (link)
- Customer
- Origin → Destination (arrow between)
- Status (color badge)
- Current location (address or pin icon for GPS)
- ETA (date/time)
- Carrier name
- Weight
- Actions (...)

Row:
- Height: 56px
- Status color left border
- Hover: Light background
- Click: Open shipment detail

GROUPING OPTIONS:
- Group by status
- Group by carrier
- Group by destination
- Group by priority

DISPLAY MODES:
- List view (default)
- Map view (shows all shipments on map)
- Timeline view (shipments grouped by delivery date)
- Grid view (card-based)

BULK ACTIONS:
- Reassign carrier
- Update status
- Change ETA
- Hold/Release
```

### Shipment Detail View

```
LAYOUT: Header + Tabs + Right panel

HEADER:
- Shipment ID (large, bold)
- Status badge (prominent, color)
- Priority indicator
- Creation date
- Action buttons:
  - Edit
  - Split
  - Merge
  - Hold/Release
  - Cancel

TABS:
- Overview
- Route & Legs
- Tracking
- Documents
- Costs
- Exceptions
- Audit

OVERVIEW TAB:

Left panel (main content):

Shipment Information Card:
- Shipment ID
- Order ID (link)
- Customer
- Status with timeline
- Created date
- Pickup date
- Expected delivery
- Actual delivery (if completed)

Freight Details Card:
- Total items
- Total weight
- Total volume
- Hazmat indicator
- Special requirements (temperature, equipment)
- Commodity type

Pickup Details Card:
- Location name + address
- Scheduled pickup: Date + time
- Actual pickup: Date + time (if done)
- Contact person
- Special instructions

Delivery Details Card:
- Location name + address
- Scheduled delivery: Date + time
- Actual delivery: Date + time (if done)
- Contact person
- Delivery instructions
- Signed by (if delivered)

Carrier & Trip Information Card:
- Carrier name (link)
- Vehicle registration
- Driver name (link)
- Current location (address)
- Last location update: Time + accuracy
- Current speed (if in transit)
- Fuel level (if available)

Right panel:

Status Progress Card:
- Visual timeline:
  ✓ Planned → ✓ Confirmed → ✓ Assigned → → Pickup → In Transit → → Delivery → Delivered
- Current stage highlighted (blue)
- Completed stages with checkmark (green)
- Next milestone with arrow (gray)

Quick Actions Card:
- Create trip button
- Reassign carrier button
- Update ETA button
- Mark as exception button
- Print documents button

Related Items Card:
- Parent shipment (if multi-leg)
- Child shipments (if split)
- Consolidated shipment (if consolidation)
- Click to navigate

ROUTE & LEGS TAB:

If multi-leg shipment:
- Leg 1: Origin → Intermediate Hub
  - Status, ETA, Carrier, Vehicle
- Leg 2: Hub → Destination
  - Status, ETA, Carrier, Vehicle
  - View/edit each leg

Leg details:
- Origin & destination
- Carrier assigned
- Status
- ETA
- Actions: Edit | View tracking

TRACKING TAB:

Live map area:
- Full-width interactive map
- Shipment icon on current location
- Route line from origin to destination
- Stops marked on route
- Click on pin: Stop details

Below map:

Tracking history (vertical timeline):
- Events in chronological order:
  "Order created" - 27-Sep 09:00
  "Shipment created" - 27-Sep 09:15
  "Carrier assigned: ABC Transport" - 27-Sep 10:00
  "Pickup scheduled" - 28-Sep 14:00
  "Arrived at origin" - 28-Sep 14:15
  "Loading started" - 28-Sep 14:30
  "Departed" - 28-Sep 16:45
  "In transit" - 28-Sep 16:45
  "Arrived at destination" - 28-Sep 18:20
  "Delivery completed" - 28-Sep 18:45
- Each event: Icon + description + timestamp
- Hover: Show full details

DOCUMENTS TAB:

- List of attached documents
- Types: Bill of lading, Packing list, Invoice, POD, etc.
- Upload document button
- Per document:
  - Thumbnail
  - Name (link to view)
  - Type
  - Upload date
  - Uploader
  - Status: Approved | Pending
  - Download button
  - Delete button

COSTS TAB:

- Estimated freight cost
- Actual freight cost (if finalized)
- Cost breakdown:
  - Base freight
  - Fuel surcharge
  - Toll charges
  - Detention charges
  - Other accessorials
- Total cost
- Billed to (customer or internal)

EXCEPTIONS TAB:

- List of all exceptions related to shipment
- Format: Date | Exception type | Status | Resolution
- Click to view full exception detail

AUDIT TAB:

- Complete change log
- Shows who changed what and when
- Sortable by date (newest first)
```

### Shipment Consolidation View

```
LAYOUT: Consolidation workbench

PAGE HEADER:
- Title: "Consolidation"
- Filter: Origin | Destination | Carrier | Date range

AVAILABLE SHIPMENTS PANEL (left):

- Title: "Available for consolidation"
- List of shipments that can be consolidated:
  - Shipment ID
  - Destination
  - Weight
  - Volume
  - Service level
  - Ready date
  - Status
- Checkboxes to select multiple
- Drag-drop to consolidation area

CONSOLIDATION BUILDER PANEL (center/right):

Drop zone: "Drag shipments here to consolidate"

Consolidated shipment preview:
- New shipment ID (auto-generated)
- Consolidated contents:
  - Shipment list (nested)
  - Total weight
  - Total volume
  - Total items
  - Common destination
  - Proposed carrier (auto-selected)
  - Proposed departure date
  - Proposed delivery date

Actions:
- Review consolidation
- Adjust carrier or dates
- Split shipment (undo)
- Save as new consolidation
- Or process to planning

SUMMARY STATS:
- Cost savings estimate
- Weight utilization
- Volume utilization
- Number of shipments consolidated
- Potential lanes saved
```

---

# SECTION 6: TRANSPORTATION PLANNING
## Planning Module Prompt

**Build intelligent transportation planning interface:**

### Planning Workbench

```
LAYOUT: Left panel + center canvas + right detail panel

LEFT PANEL - DEMAND (30%):

Title: "Pending Orders & Shipments"

Filter:
- Status: Awaiting planning
- Date: Pickup date range
- Service level
- Customer

DEMAND LIST:
- For each pending shipment:
  - ID (link)
  - Destination
  - Weight / Volume
  - Pickup date
  - Delivery commitment
  - Drag handle icon
- Searchable, sortable
- Count badge: "12 ready to plan"

ACTIONS:
- Select all
- Bulk plan button
- Filter button

CENTER CANVAS - PLANNING AREA (40%):

Large working area with:

Plan tabs (top):
- Current Plan (active)
- Plan Version 2
- Draft Plan
- + Create new plan tab

Plan view controls (toolbar):
- View toggle: Capacity | Calendar | Lane | Geographic
- Grouping: By carrier | By depot | By date
- Constraints toggle (show/hide)
- What-if scenario button

CAPACITY VIEW (default):
- Shows available capacity per carrier/vehicle
- X-axis: Carriers or vehicle groups
- Y-axis: Available capacity (weight/volume bars)
- Existing assignments shown stacked
- Unallocated demand shown at bottom

Drag shipment from left panel:
- Onto carrier/vehicle bar
- Visual feedback: Outline appears, capacity updates
- Drop confirmation: Tooltip with ETA, cost, utilization %

CALENDAR VIEW:
- X-axis: Delivery dates
- Y-axis: Carriers or routes
- Cell: Assignments for that carrier on that date
- Drag to reassign

LANE VIEW:
- X-axis: Origin regions
- Y-axis: Destination regions
- Cells show: Shipments | Cost | Carrier options
- Drag to consolidate same lane shipments

GEOGRAPHIC VIEW:
- Map background
- Origin pins
- Destination clusters
- Route visualization
- Shipment density heatmap

RIGHT PANEL - PLANNING OPTIONS (30%):

Title: "Planning Assistant"

For selected demand (drag-selected on canvas):

Suggested Actions:
- "Suggest best carrier"
- "Consolidate similar shipments"
- "Optimize route"
- "Use backhauling opportunity"

Constraints & Rules:
- Checkbox list:
  - Weight constraint: Current utilization %
  - Volume constraint: Current utilization %
  - Temperature requirement: Met / Not met (badge)
  - Hazmat compatibility: Met / Not met
  - Delivery window: Show constraint
  - Driver restrictions: Show applicable
- Violation badges (red) if constraints broken

Carrier Options (for selected shipment):
- Ranked list of suitable carriers:
  1. ABC Transport - 95.2% OTP, $245/100kg, 2.3 days
  2. XYZ Logistics - 93.1% OTP, $238/100kg, 2.5 days
  3. Quick Haul - 88.5% OTP, $220/100kg, 3.1 days
- Color-coded scoring
- Click to assign

Cost Analysis:
- Estimated freight cost
- Cost per unit (kg/km)
- Total plan cost estimate
- Cost vs budget indicator

BOTTOM BAR (planning summary):

- Total demand waiting: 2,450 kg | 12.5 cbm
- Total assigned: 1,800 kg | 9.2 cbm
- Utilization: 73.5% by weight | 73.6% by volume
- Estimated cost: $2,445
- Shipments consolidated: 8
- Backhauling opportunities: 3
- Plan validity: Green check or error message

BUTTONS:
- Save plan
- Auto-plan (AI-assisted)
- What-if scenario
- Publish plan (to dispatch)
- Clear plan
```

### Continuous Replanning

```
LAYOUT: Automated replanning management

PAGE TITLE: "Continuous Replanning"

REPLAN TRIGGERS PANEL (left):

Active triggers:
- Trigger 1: "Vehicle breakdown > Reassign shipments"
  - Status: Active
  - Last triggered: 2 hours ago
  - Trigger again button
  
- Trigger 2: "ETA delay > Recalculate route"
  - Status: Active
  - Last triggered: 45 minutes ago
  
- Trigger 3: "Carrier rejection > Find backup"
  - Status: Active
  - Last triggered: 1 hour ago

Add new trigger:
- Dropdown: Select trigger type
- Condition: Configure condition
- Action: Select action to take
- Save trigger

REPLANNING HISTORY (center):

Timeline of recent replans:
- Date | Trigger event | Shipments affected | Cost impact | Result
- Expandable rows for details
- Filter by trigger type
- Filter by success/failure

Example row:
"27-Sep 14:32 | Vehicle VEH-456 breakdown | 8 shipments | +$340 cost | New carrier assigned successfully"
- Expand: Shows original vs new plan comparison

CURRENT REPLANNING SCENARIOS (right):

Active scenarios:
- Scenario 1: "Traffic incident on Route 12"
  - Shipments affected: 23
  - Recalculating ETA...
  - Estimated time savings: 30 mins
  - Additional cost: $120
  - Apply scenario button
  
- Scenario 2: "Weather condition - Hazmat restrictions"
  - Shipments affected: 5
  - Reviewing alternatives...
  - Options: Delay | Reroute | Alternative carrier
```

---

# SECTION 7: LOAD BUILDING & CONSOLIDATION
## Load Planning Interface Prompt

**Build practical load optimization tools:**

### Load Builder

```
LAYOUT: Left panel (items) + Center (load visualization) + Right (optimization)

LEFT PANEL - AVAILABLE ITEMS (25%):

Title: "Shipments Ready to Load"

Filter:
- Destination
- Weight range
- Volume range
- Service level
- Hazmat: Yes/No
- Temperature required

Item list (scrollable):
- Per item:
  - Shipment ID (SHP-XXXXX)
  - Destination (city)
  - Weight: 50 kg
  - Volume: 0.25 cbm
  - Service level badge
  - Hazmat indicator (red triangle if yes)
  - Temperature range (if required)
  - Drag handle
  - Add to load button

Counter: "45 items | 2,340 kg | 11.8 cbm total"

CENTER PANEL - LOAD BUILDER (50%):

Title: "Build Load" + Load ID (auto-generated)

Vehicle selection (top):
- "Select vehicle for this load"
- Dropdown showing available vehicles:
  - Vehicle registration (VEH-XXXXX)
  - Vehicle type (Truck 20ft, Trailer, Van)
  - Capacity: 5,000 kg | 20 cbm
  - Length/Width/Height
  - Weight distribution limits
  - Equipment (temperature, hazmat certified)
- Selected vehicle details:
  - Registration
  - Capacity: ████████░ 75% utilized
  - Available: 1,200 kg | 5.2 cbm
  - Pallets: 12/14 (if pallet-based)

Load visualization (center):
- 3D or 2D side view of vehicle
- Load items shown as boxes
- Color-coded by destination (different colors for different stops)
- Drag items to reposition (if 3D interactive)
- Or list format with pallet/position numbers:
  
  Pallet 1:
  - SHP-1001 (destination A) - 200 kg
  - SHP-1002 (destination A) - 180 kg
  Subtotal: 380 kg
  
  Pallet 2:
  - SHP-1003 (destination B) - 250 kg
  - SHP-1004 (destination B) - 210 kg
  Subtotal: 460 kg

Add item controls:
- Drag from left panel to load area
- Or "Add item" button in load area
- Item selector modal
- Confirm placement

Load validation (below visualization):
- Weight distribution: OK (green checkmark)
- Hazmat grouping: OK
- Temperature zones: OK
- Pallet positioning: OK
- Axle weight limits: OK
- All validations red with warning icon if violated

RIGHT PANEL - OPTIMIZATION & SETTINGS (25%):

Load summary:
- Total weight: 1,840 kg / 5,000 kg (36.8%)
- Total volume: 9.2 cbm / 20 cbm (46%)
- Pallet utilization: 12/14 pallets
- Estimated cost: $245
- Estimated delivery: 2024-09-28

Consolidation recommendations:
- "Can consolidate with 3 other shipments to same destination"
- "Add these items for full utilization" (button)
- "Backhauling opportunity: Return load available" (link)

Constraints check:
- Weight: OK
- Volume: OK
- Hazmat: OK
- Temperature: OK
- Delivery window: OK
- All items same destination region: OK

Multi-stop sequencing (if applicable):
- Stop 1: City A (8 items, 1,200 kg)
- Stop 2: City B (4 items, 640 kg)
- Resequence button (optimize order)
- Map preview (stops on map)

BOTTOM ACTION BAR:

- Clear all items
- Save load as draft
- Save and create trip
- Auto-optimize load button
- Cost estimate button
- 3D view toggle (if applicable)
```

### Consolidation Management

```
LAYOUT: Consolidation strategies

PAGE HEADER:
- Title: "Consolidation"
- Subtitle: "Combine shipments to reduce costs"

CONSOLIDATION STRATEGIES (tabs):

1. DESTINATION-BASED CONSOLIDATION:
   - Group by destination city
   - Show consolidation opportunities
   - Table format:
     - Destination | Shipments waiting | Total weight | Total volume | Recommended consolidation | Estimated cost savings | Consolidate button

2. CARRIER-BASED CONSOLIDATION:
   - Group by preferred carrier
   - Show capacity availability
   - Table:
     - Carrier | Available capacity | Shipments available | Cost | Consolidate button

3. TIME-BASED CONSOLIDATION:
   - Group by pickup/delivery date
   - Consolidate shipments picked up on same day
   - Table:
     - Date | Shipments | Weight | Volume | Cost impact | Consolidate button

4. LANE-BASED CONSOLIDATION:
   - Origin-Destination lane grouping
   - High-frequency lanes identified
   - Show cost savings across consolidated shipments

CONSOLIDATION BUILDER:

For each opportunity:
- Show current shipments (list)
- Show consolidation result:
  - New consolidated load ID
  - Total weight/volume
  - Carrier assigned
  - Estimated cost
  - Cost per unit (savings vs separate shipments)
- Confirm button: Process consolidation

CONSOLIDATION HISTORY:

Recent consolidations:
- Date | Original shipments | Consolidated load | Savings | Status
```

---

# SECTION 8: ROUTING & OPTIMIZATION
## Route Planning Interface Prompt

**Build smart routing and VRP tools:**

### Route Builder

```
LAYOUT: Map-centric with sidebar

LEFT SIDEBAR (30%):

Route Details:
- Route ID (auto-generated)
- Status: Draft | Active
- Start location: Dropdown (depot/warehouse)
- Start time: Time picker
- Vehicle: Dropdown (shows capacity, equipped features)
- Driver: Dropdown (shows availability, certifications)
- Route type: Full load | Milk run | Multi-stop

Stops Management:
Title: "Stops on this route"
Counter: "8 stops | 450 kg | 2.2 cbm"

Stop list (drag-to-reorder):
1. Depot (Start point, time: 06:00)
2. Customer A - Address, Stop #1
   - Pickup/Delivery
   - Items: 2 | Weight: 150 kg
   - Time window: 08:00 - 10:00
   - Contact: John Doe
   - Status: Confirmed
   - Move button / Remove button
   
[Repeat for other stops]
   
8. Depot (End point, ETA: 18:00)

Add stop controls:
- "+ Add stop" button
- Autocomplete location field
- Time window selector
- Item selector (if not pre-assigned)

RIGHT SECTION (70%):

Route map (full-width):
- Map background (Google Maps or similar)
- Start location: Green pin
- Stops: Numbered blue pins (in order)
- End location: Red pin
- Route line: Connecting stops
- Distance: Shown on line (distance between consecutive stops)
- ETA: Shown on line (cumulative travel time)

Hover on stop pin:
- Popup showing stop details
- Customer name, address
- Items count
- Time window
- Click to edit

Click on map:
- Add stop at location (right-click context menu)

Route information (below map):

Route summary:
- Total distance: 234 km
- Estimated duration: 8h 45m
- Number of stops: 8
- Utilization: 56.2% by weight | 58.4% by volume
- Estimated cost: $189
- Route efficiency score: 82/100 (green)

Constraints & compliance:
- ✓ Weight distribution OK
- ✓ Volume distribution OK
- ✓ Hazmat grouping OK
- ✓ Time windows met
- ✓ Driver hours compliant
- ✓ Delivery window achievable

BOTTOM ACTION BAR:

- Clear route
- Save route
- Optimize route (AI-assisted)
- Cost estimate
- Print / Export
- Dispatch button
```

### Route Optimization

```
LAYOUT: Optimization workbench

PAGE HEADER:
- Title: "Route Optimization"
- Optimization engine selector: Quick | Standard | Advanced

OPTIMIZATION PARAMETERS:

Left panel (parameters):

Objective function (radio):
- Minimize cost
- Minimize distance
- Minimize time
- Balance distance and time
- Custom (weighted)

Constraints (checkboxes):
- Time windows: On/Off
- Weight limits: On/Off
- Volume limits: On/Off
- Delivery requirements: On/Off
- Driver hours: On/Off
- Vehicle restrictions: On/Off
- Distance limits: On/Off

Vehicle selection:
- Single vehicle type
- Multiple vehicle types
- Depot/Start location selector

Advanced options (collapsible):
- Traffic aware: Yes/No (if available)
- Avoid toll roads: Yes/No
- Prefer highways: Yes/No
- Weekend service: Yes/No
- Custom cost matrix: Upload (if applicable)

CENTER AREA - OPTIMIZATION RESULTS:

Optimization status:
- Progress bar (if running)
- "Optimizing 87 shipments for 12 vehicles..."
- Stop optimizing button

Results display:

If optimization complete:

Multiple solution options (tabs):

Solution 1 (Best cost):
- Cost: $2,145
- Distance: 1,240 km
- Time: 18h 20m
- Vehicles used: 8/12
- Utilization: 88.5% (weight) | 91.2% (volume)
- Improvement vs current: -12.5% cost
- Choose this solution button

Solution 2 (Fastest):
- Cost: $2,380
- Distance: 1,120 km
- Time: 16h 45m
- Vehicles used: 9/12
- Improvement vs current: -8.3% time
- Choose this solution button

Solution 3 (Balanced):
- Cost: $2,210
- Distance: 1,190 km
- Time: 17h 10m
- Choose this solution button

RIGHT PANEL - SOLUTION PREVIEW:

For selected solution:

Route listing:
Route 1:
- Vehicle: Truck-001
- Driver: John Smith
- Stops: 8
- Distance: 156 km
- Time: 2h 15m
- Cost: $245
- Map button (view on map)

[Repeat for other routes]

Summary metrics:
- Total cost
- Total distance
- Total time
- Unassigned shipments (if any)
- Feasibility: Green checkmark or warnings

BOTTOM ACTION BAR:

- Save optimization
- Apply solution (create routes)
- Compare with current plan (if exists)
- Export solution
```

---

# SECTION 9: PROCUREMENT & TENDER
## RFQ & Tender Management Prompt

**Build procurement workflow tools:**

### Tender Board

```
LAYOUT: Kanban-style board

PAGE HEADER:
- Title: "Tender Board"
- Filter: Status | Carrier | Date | Service level
- View: Kanban | List | Calendar
- New tender button

KANBAN COLUMNS:

Column 1 - DRAFT (Created, awaiting send):
- Card count badge: "3"
- "+ Create new tender" button
- Cards (draggable between columns):
  
  Card format:
  - Tender ID (TEN-XXXXX)
  - Shipment/Load details: "SHP-12345, City A → City B"
  - Weight: 500 kg
  - Service: Express
  - Created: Date
  - Actions: (...) menu - Edit | Send | Delete

Column 2 - SENT (Active tenders, awaiting response):
- Card count badge: "12"
- Countdown: Time remaining to respond
- Card:
  - Tender ID
  - Shipment details
  - Sent to: [Carrier 1] [Carrier 2] [Carrier 3] (avatar circles)
  - Responses: 1/3 received badge
  - Deadline: "Responses due in 6 hours" (red if urgent)
  - Actions: (...) - View responses | Extend deadline | Cancel

Column 3 - RESPONSES RECEIVED (Awaiting evaluation):
- Card count badge: "8"
- Card:
  - Tender ID
  - Responses: "3 received" link to see prices
  - Best price: $245 (Carrier name)
  - Evaluate button
  - Actions: (...) menu

Column 4 - EVALUATED (Ready to award):
- Card count badge: "5"
- Card:
  - Tender ID
  - Recommended: "ABC Transport - $245" (highlighted)
  - Other options: "XYZ Logistics - $265" (faded)
  - Approve & award button
  - Override & award different button
  - Actions: (...) menu

Column 5 - AWARDED (Assigned to carrier):
- Card count badge: "24"
- Card:
  - Tender ID
  - Awarded to: Carrier name (green badge)
  - Price: $245
  - Status: Confirmed | Pending acceptance
  - Actions: (...) - View assignment | Cancel

Column 6 - REJECTED (Carrier declined):
- Card count badge: "2"
- Card:
  - Tender ID
  - Rejected by: Carrier name
  - Reason: "No capacity"
  - Backup awarded: "Carrier B" (if re-tendered)
  - Actions: (...) - View details | Re-tender

MODAL DETAIL VIEW (click card or "View responses"):

Tender details:
- Tender ID
- Shipment/Load: ID + details
- Origin → Destination
- Weight, Volume, Items
- Pickup window
- Delivery window
- Special requirements (hazmat, temp control, etc.)

Carrier responses (table format):
- Carrier name (link)
- Response date
- Price: $245
- Acceptance rate: % (based on history)
- Avg OTP: 94.2%
- Accept/Reject button
- Score (color-coded)

Evaluation criteria:
- Price: 40%
- Reliability (OTP): 30%
- Capacity match: 20%
- Other factors: 10%

Overall score: 87/100 (Carrier A) - RECOMMENDED
Overall score: 78/100 (Carrier B)
Overall score: 72/100 (Carrier C)
```

### RFQ Creation

```
LAYOUT: Multi-step form

STEP 1 - SHIPMENT SELECTION:

Select loads/shipments to tender:
- Search/filter: Pending shipments
- Checkbox list:
  - Shipment ID | Destination | Weight | Service | Pickup | Delivery
- Select all / Deselect all buttons
- Count: "5 shipments selected"
- Next button

STEP 2 - TENDER DETAILS:

Tender information:
- Tender type: (radio) Point-to-point | Network | Spot
- Tender scope: Selected shipments listed above
- Service level: Standard | Express | Urgent
- Price basis: Per trip | Per kg | Per km | Combination
- Currency: INR / USD / etc.

Procurement rules:
- Single carrier (for one shipment)
- Multi-carrier (for multiple shipments)
- Broadcast tender (send to multiple carriers)
- Preferred carriers (optional list)
- Minimum carriers to invite: 3 (default, editable)

Deadlines:
- Tender response deadline: Date + time picker
- Validity period: X days
- Auto-award if: Checkbox options
  - Only one response
  - Price below budget
  - Top-rated carrier responds

Next button

STEP 3 - CARRIER SELECTION:

Search and select carriers:
- Quick filter: Preferred | Recent | Available
- Multi-select list:
  - Carrier name (link)
  - Service area: Regions covered
  - Avg OTP: %
  - Rating: Stars
  - Last used: Date
  - Capacity available: Badge

Selected carriers listed below:
- [Carrier A] [Carrier B] [Carrier C] (with X to remove)

Add more carriers button (opens search)

Next button

STEP 4 - REVIEW & SEND:

Summary:
- Shipments: 5 selected (show list)
- Total weight: 2,450 kg
- Service level: Express
- Carriers invited: 3
- Tender valid until: Date + time
- Expected responses: Within X hours

Preview tender (expandable):
- Full details of what will be sent

Send tender button
```

---

# SECTION 10: DISPATCH & TRIP MANAGEMENT
## Dispatch Interface Prompt

**Build real-time dispatch operations:**

### Dispatch Board

```
LAYOUT: Gantt chart + sidebar

PAGE HEADER:
- Title: "Dispatch Board"
- Filters: Vehicle type | Driver status | Shift time
- View mode: Gantt | List | Map
- Shift selector: Morning | Afternoon | Night | Custom

LEFT SIDEBAR - RESOURCES (20%):

Available resources:
Title: "Vehicles & Drivers Ready"
Counter: "12 vehicles | 10 drivers available"

Vehicle list:
- Vehicle registration (VEH-XXXXX)
- Driver: Assigned or "Unassigned"
- Status: Ready | On trip | On break | Off-duty
- Capacity: 5,000 kg | 20 cbm
- Last location: City (with time)
- ETA to dispatch: Time
- Checkbox to select
- Drag to assign to trip

Driver list (expandable):
- Driver name
- License: Valid badge
- Current status: On duty | Available
- Vehicle assigned: VEH-XXXXX (if any)
- Certifications: Hazmat | Temperature | etc.
- Drag to assign to vehicle

TRIPS AWAITING ASSIGNMENT:
Title: "Ready to dispatch"
Counter: "8 trips waiting"

Trip list (drag-drop to vehicle):
- Trip ID (TRIP-XXXXX)
- Shipments: Count (3 shipments)
- Weight: 500 kg
- Stops: 3
- Service type: Delivery | Pickup | Multi-drop
- Urgency: Flag or badge
- Drag handle icon

CENTER AREA - DISPATCH TIMELINE (60%):

Gantt-style chart:
- X-axis: Time (hours, current day)
  6:00 | 8:00 | 10:00 | 12:00 | 14:00 | 16:00 | 18:00 | 20:00
  
- Y-axis: Vehicles/Drivers (list on left)
  VEH-001 (Driver: John)
  VEH-002 (Driver: Sarah)
  VEH-003 (Driver: Mike)
  [etc]

Per vehicle row:
- Time bar showing:
  - Off-duty: Gray
  - Break: Yellow
  - Pre-trip checks: Light blue
  - Trip/Delivery: Green
  - Return to depot: Lighter green
  
Trip block details (on hover):
- Trip ID
- Shipments (count)
- Duration
- Start/End location
- Driver name
- Click to view full trip details or edit

DRAG-DROP DISPATCH:
- Drag trip from left sidebar to vehicle row at desired time
- Visual feedback: Outline appears
- Drop: Confirm dialog shows ETA, cost, utilization
- Confirm or cancel

RIGHT PANEL - TRIP DETAILS (20%):

For selected trip/vehicle:

Trip information:
- Trip ID
- Shipments: List (ID | Customer | Destination | Items)
- Total weight, volume, items
- Stops: Sequence and ETA

Vehicle info:
- Registration, capacity, current location
- Driver assigned
- Certifications check (hazmat, temp, etc.)

ETA & Cost:
- Estimated duration: 6h 15m
- Estimated cost: $245
- Distance: 234 km
- Profit margin: $65

Actions:
- Dispatch trip button (primary blue)
- Preview route (map)
- Print trip sheet
- Edit/Cancel trip

BOTTOM ACTION BAR:

Summary:
- Total trips dispatched today: 24
- Trips awaiting dispatch: 8
- Total active trips: 45
- Fleet utilization: 87%
- Estimated completion: 18:30

Bulk actions:
- Dispatch all ready trips
- Optimize all trips
- Pause/Resume dispatch
```

### Trip Management

```
LAYOUT: Tab-based trip control

PAGE HEADER:
- Trip ID (large)
- Status: Created | Assigned | Accepted | Pickup | Loading | Transit | Delivery | Delivered
- Created time, Estimated completion
- Action buttons: Edit | Pause | Cancel | Complete

TABS:

1. OVERVIEW TAB (default):

Left panel (60%):

Trip information card:
- Trip ID
- Status with progress bar
- Created: Date + time
- Dispatched: Date + time
- ETA completion: Date + time
- Actual completion: (if done)

Vehicle & Driver card:
- Vehicle: Registration + type
- Driver: Name + contact + avatar
- Capacity: Weight/Volume with % utilized
- Status: On trip | Break | Return

Shipments on trip card:
- Table: Shipment ID | Customer | Destination | Status | Items
- Total: 3 shipments | 500 kg | 2.2 cbm
- Add shipment button

Stops sequence card:
1. Depot (Start) - 06:00
2. Customer A (Delivery) - 08:30
   - Address
   - Items: 2
   - Signature required
3. Customer B (Delivery) - 10:15
   - Address
   - Items: 1
   - Special instruction: "Please call upon arrival"
4. Depot (End) - 18:00

Expenses card:
- Fuel charge: $45
- Toll charge: $15
- Detention charge: $0
- Other: $0
- Total trip cost: $245

Right panel (40%):

Quick actions card:
- Dispatch trip (blue button)
- Assign to driver button
- Reassign vehicle button
- View route on map button

Trip details card:
- Distance: 234 km
- Duration: 11h 30m
- Stops: 4
- Start time: 06:00
- End time: 17:30

Profitability card:
- Freight revenue: $310
- Total cost: $245
- Profit: $65
- Margin: 20.9%

Constraints status card:
- ✓ Weight distribution
- ✓ Hazmat grouping
- ✓ Temperature maintained
- ✓ Delivery windows
- ✓ Driver hours compliant

2. TRACKING TAB:

Map view:
- Real-time vehicle location (if in transit)
- Route visualization
- Stops marked

Tracking timeline:
- Trip created
- Assigned to driver
- Driver accepted
- Arrived at stop 1
- Loading started
- [etc]

3. DOCUMENTS TAB:

Trip documents:
- Trip sheet (printable)
- Manifest
- POD uploads (as delivery completes)
- Proof of delivery
- Signature images

4. COSTS TAB:

Cost breakdown:
- Base freight
- Fuel surcharge
- Toll charges
- Detention
- Other charges
- Total cost
- Cost per km
- Cost per shipment

5. AUDIT TAB:

Change log:
- Who changed what and when
```

---

# SECTION 11: DRIVERS & DRIVER APP
## Driver Management Interface Prompt

**Build driver management and app interface:**

### Driver Management (Web)

```
LAYOUT: List + detail view

PAGE HEADER:
- Title: "Drivers"
- Count: (487)
- New driver button
- Filter: Status | Certification | Availability | Vehicle assigned

DRIVER LIST TABLE:

Columns:
- Checkbox
- Avatar (circular profile photo)
- Driver name (link)
- License number
- Status: Active | On trip | On break | Off-duty | Inactive
- Vehicle assigned (registration, if any)
- Certifications: Hazmat | Temperature | Oversize (badges)
- Phone number (clickable)
- Last location (city, time)
- Hours worked today (numeric)
- Actions (...)

Row:
- Height: 56px
- Status color indicator (left border or dot)
- Click row: Open driver detail

BULK ACTIONS:
- Mark as available
- Mark as on break
- Assign to vehicle
- Send notification
- Export

DRIVER DETAIL VIEW (click row or "View" button):

Modal or full page with tabs:

TABS:

1. PROFILE TAB:

Left section (30%):
- Large profile photo (update button)
- Driver name (editable)
- Driver ID: DR-XXXXX
- Status: Active / Inactive toggle
- Phone: +91-XXXXXXXXXX (editable)
- Email: (editable)
- Address: (editable)
- Date of birth: (editable)
- Gender: (editable)

Right section (70%):

License information card:
- License number (editable)
- License type: HCV | LCV | Motorcycle
- Issue date, Expiry date
- Status: Valid / Expired
- Document: Upload / Download / View

Certifications card:
- Hazmat certification: ✓ Valid until 30-Mar-2025
- Temperature control: ✓ Valid until 15-Jun-2025
- Oversize permit: ✗ Not certified
- Add certification button

Vehicle assignment card:
- Current vehicle: Truck-001 (VEH-XXXXX)
- Assigned since: Date
- Change vehicle button
- Unassign button

2. DOCUMENTS TAB:

Required documents list:
- License (download / update)
- Insurance proof (download / update)
- Training certificate (download / update)
- Medical check (download / update)
- etc.

Per document:
- Status: Valid / Expired / Missing
- Upload date
- Expiry date
- Upload new version button
- Download button

Compliance status:
- Overall: Compliant (green checkmark)
- All mandatory documents valid
- Next expiry: License on 30-Mar-2025 (warning)

3. ASSIGNMENTS TAB:

Current assignment:
- Vehicle: Truck-001
- Assigned since: 01-Jan-2024
- Trips completed: 245
- Status: Actively assigned

Trip history:
- Table: Date | Trip ID | Shipments | Distance | Duration | Status
- Filter: Past week | Past month | All time
- Click trip: View trip detail

4. PERFORMANCE TAB:

Performance metrics card:
- Trips completed (this month): 24
- On-time delivery: 96.5% (vs company avg 94.2%)
- Incident count: 2 (minor)
- Customer rating: 4.7/5 (based on feedback)
- Cost per trip: $245 (vs avg $238)

Performance chart:
- Line chart: On-time % over past 3 months
- Comparison: Driver performance vs company average

5. SAFETY TAB:

Safety incidents:
- Incident 1: Minor speeding | 15-Sep-2024 | Route 12 | Resolved
- Incident 2: Harsh braking detected | 10-Sep-2024 | Highway | Acknowledged
- Report incident button

Safety score: 88/100 (green)

Training status:
- Safety training: Completed 12-Jun-2024 (next due 12-Jun-2025)
- Defensive driving: Completed 05-Apr-2024

6. AVAILABILITY TAB:

Shift schedule:
- Week view: Show assigned shifts
- Mon: 06:00-18:00 (Trip 1,2,3)
- Tue: Off
- Wed: 06:00-18:00
- [etc]

Edit schedule button
Request time off button

7. EARNINGS/PAYROLL TAB:

Monthly earnings:
- Base salary: $2,000
- Incentive (trips): $120
- Bonuses: $50
- Total earning: $2,170

Payment history:
- Table: Month | Amount | Payment date | Status
- View payslip button
```

### Driver App Interface (Mobile-First)

```
LAYOUT: Mobile-optimized (assume 375px width)

BOTTOM NAVIGATION (5 icons, always visible):
- Home (house icon)
- Trips (clipboard icon)
- Tracking (map icon)
- Profile (user icon)
- Menu (three dots)

HOME SCREEN:

Header (sticky):
- Greeting: "Good morning, John!"
- Driver status toggle: "On Duty" (green toggle)
- Time: 14:32
- Battery/signal indicators

Current status card:
- Status: "Available"
- Location: "Mumbai, MH"
- Next trip: "Ready in 15 mins"
- Accept trip button (large, blue)

Active trip (if any):
- Trip ID: TRIP-12345
- Stops count: 3
- Next stop: "Customer A, Bandra"
- Time until next stop: "15 mins"
- Current: "En route" with animated truck icon
- Navigation button (arrow, directs to maps)
- Call customer button
- Collapse/expand card

Task list:
- "Pre-trip check required"
- "Load 2 shipments"
- "Collect signature at Stop 1"
- etc.

Quick actions (3 buttons):
- Call dispatcher
- Report incident
- Get help

Notifications center:
- Recent: "Trip assigned 2 mins ago"
- Recent: "Delivery reminder: Stop 2 due in 30 mins"
- Show all button

TRIPS TAB:

Today's trips (if multiple):
- Trip list (scrollable):
  Trip 1: TRIP-12345 | 3 stops | 234 kg | 08:00-16:00 | Status: In progress
  Trip 2: TRIP-12346 | 2 stops | 156 kg | 16:30-19:00 | Status: Pending

Trip detail (tap to expand):
- Stops with sequence numbers
- Current stop highlighted
- Next stop below
- ETA for next stop
- Navigation button

TRACKING TAB:

Map:
- Full-screen map
- Current location (blue dot)
- Next stop marker (destination)
- Route line to destination
- Back button (to previous screen)

Bottom card (overlay):
- "Next: Customer A"
- Distance: 12 km
- ETA: 14:47
- Address: "123 MG Road, Bandra"
- Contact: John Doe | +91-XXXXXXXXXX
- Call button
- Message button
- Navigation start button (opens native maps app)

PROFILE TAB:

Driver info section:
- Profile photo (large)
- Driver name
- Driver ID
- License status: Valid
- Training status: Up to date
- Edit profile button

Quick stats:
- Trips this month: 24
- On-time %: 96.5%
- Rating: 4.7/5
- Safety score: 88/100

Earnings (expandable):
- This month: $2,170
- View details button

Settings:
- Notifications: Toggle
- Language: English
- Help & Support: Contact
- About app
- Logout button

DRIVER APP SPECIFIC FEATURES:

Task completion flow:

PRE-TRIP CHECKLIST:
Modal overlay:
- "Pre-trip check required"
- Checkboxes:
  ☑ Vehicle condition OK
  ☑ Tires inspected
  ☑ Fuel level checked
  ☑ Safety equipment present
  ☑ Vehicle documents present
  ☑ GPS functioning
  ☑ Cargo secured
- Photo upload button (to attach proof)
- Complete checklist button (submit)

PICKUP TASK:
Modal:
- Shipment ID
- Customer name
- Address
- Items to pick:
  - Item 1: Description | Qty: 2
  - Item 2: Description | Qty: 1
  - [etc]
- Weight & volume
- Scan items (barcode scanner icon)
- Confirm quantity button
- Take photo button
- Contact customer button
- Start loading button
- Complete pickup button (submit)

DELIVERY TASK:
Modal:
- Shipment ID
- Customer name
- Address
- Delivery items list
- Signature pad (for signature capture)
- Or: OTP option (one-time password)
- Photo upload (proof of delivery)
- Condition checkbox: "Goods in good condition"
- Delivery notes field (optional)
- Select delivery status: Delivered | Partial | Failed
- Complete delivery button

EXPENSE LOGGING:
Modal:
- Expense type: Fuel | Toll | Parking | Detention | Other
- Amount: Input field
- Receipt photo: Upload
- Add another expense button
- Save expenses button

OFFLINE MODE:
- Sync indicator at top: "Connected" or "Offline"
- When offline:
  - Queue tasks locally
  - Sync when back online
  - Offline sync status: "3 tasks queued for sync"
- Sync now button (when online)
- Clear offline queue option (with warning)

NAVIGATION:
- Opens native maps app (Google Maps / Apple Maps)
- Shows real-time directions
- Estimated time and distance
- Back button returns to app
- Notification when arriving at stop (within 500m)

COMMUNICATION:
- Chat with dispatcher
- Message center
- Call dispatcher button
- Report issues/incidents

SAFETY FEATURES:
- Panic button (SOS): Press for 3 seconds
- Sends immediate alert with current location
- Emergency contacts (listed)
- Local police/hospital nearby (map)
- Incident reporting: Photo + description + location
```

---

# SECTION 12: FLEET MANAGEMENT
## Vehicle & Fleet Management Prompt

**Build comprehensive fleet operations:**

### Vehicles List

```
PAGE HEADER:
- Title: "Fleet Vehicles"
- Count: (234 vehicles)
- New vehicle button
- Filters: Vehicle type | Ownership | Status | Certification

VEHICLES TABLE:

Columns:
- Checkbox
- Vehicle registration (VEH-XXXXX or license plate)
- Type: Truck | Van | Bike | Trailer
- Manufacturer/Model
- Capacity: Weight (kg) | Volume (cbm)
- Assigned to: Driver name (if any)
- Owner: Company owned | Leased from [vendor]
- Status: Active | Under maintenance | Breakdown | Retired
- GPS/Telematics: Connected / Disconnected
- Fuel type: Diesel | Petrol | CNG | Electric
- Certifications: Hazmat ✓ | Oversize ✓
- Last service: Date
- Next service: Date (with warning if due soon)
- Current location: City (with time)
- Actions: (...)

Row height: 56px
Status color indicator

BULK ACTIONS:
- Mark as active/inactive
- Assign to driver
- Send to maintenance
- Schedule service
- Export

VEHICLE DETAIL (click row):

Modal or full page with tabs:

TABS:

1. OVERVIEW TAB:

Left (35%):
Vehicle details card:
- Registration / License plate
- Vehicle type
- Manufacturer: Tata
- Model: LPT 613
- Color
- Year of manufacture
- Current status: Active | Under maintenance
- Total distance: 1,245,340 km
- Age: 4 years 3 months

Right (65%):

Capacity & Specs card:
- Payload capacity: 5,000 kg
- Volume capacity: 20 cbm
- Length: 6.0 m
- Width: 2.5 m
- Height: 2.4 m
- Axles: 2
- Gross vehicle weight: 7,000 kg
- Wheelbase: 3.2 m

Current assignment card:
- Driver: John Smith (link)
- Assigned since: 01-Jan-2024
- Current location: Mumbai, MH
- Current trip: TRIP-12345
- Status: On trip

Certifications card:
- Hazmat: ✓ Valid until 15-Jun-2025
- Oversize: ✓ Valid until 30-Mar-2025
- Temperature control: ✓ Valid until 20-Feb-2025
- Add certification button

Ownership card:
- Ownership: Company owned / Leased
- If leased:
  - Leased from: [Vendor name]
  - Lease start: Date
  - Lease end: Date
  - Monthly payment: Amount

2. MAINTENANCE TAB:

Service history:
- Table: Date | Service type | Service provider | Cost | Odometer reading | Notes
- Example: 15-Sep-2024 | Regular servicing | ABC Service Center | $150 | 1,234,560 km

Next scheduled service:
- Service type: Regular servicing
- Due date: 01-Nov-2024
- Due mileage: 1,300,000 km (current: 1,245,340 km)
- Days remaining: 35
- Schedule service button
- Status: Upcoming (green)

Maintenance alerts:
- Oil change due in 12,000 km or 45 days
- Tire rotation due in 18,000 km
- Battery check overdue (click to schedule)

Maintenance cost summary:
- Total maintenance (last 12 months): $2,345
- Average per month: $195
- Cost per km: $0.0019

3. DOCUMENTS TAB:

Required documents:
- Registration certificate: Valid until 30-Jun-2025
- Insurance policy: Valid until 15-Sep-2025
- Pollution control: Valid until 30-Aug-2025
- Fitness certificate: Valid until 28-Feb-2025
- Road tax: Valid until 31-Dec-2024

Per document:
- Status badge: Valid / Expired / Expiring soon
- Upload date, Expiry date
- Upload new version button
- Download button

Compliance status:
- Overall: Compliant (green)
- Next expiry: Pollution on 30-Aug-2025

4. TELEMATICS TAB:

GPS device info:
- Device ID: GPS-XXXXX
- Device type: GPS tracker
- Status: Connected (green)
- Last signal: 2 mins ago
- Location accuracy: 5 meters

Real-time data (if connected):
- Current location: [City, Coordinates]
- Current speed: 45 km/h
- Heading: North
- Engine status: Running
- Fuel level: 75%

Trip data (if in trip):
- Current trip: TRIP-12345
- Distance covered: 45 km
- Remaining distance: 189 km
- ETA: 17:30
- Avg speed: 62 km/h
- Harsh acceleration count: 2
- Harsh braking count: 1

Tracking history:
- Map view showing path covered
- Stops marked on map

5. FUEL TAB:

Fuel consumption:
- Total fuel (last 30 days): 450 liters
- Avg consumption: 6.5 km/l
- Cost: $450 (at $1/liter)
- Cost per km: $0.30

Fuel history chart:
- Line chart: Daily consumption over past 30 days
- Comparison with targets

Fuel entries log:
- Table: Date | Quantity | Cost | Odometer | Notes
- Add fuel entry button

Fuel efficiency trends:
- Chart showing km/l over time
- Alert if below threshold

6. INCIDENTS TAB:

Safety incidents:
- Incident 1: Harsh braking | 20-Sep-2024 | Location | Severity: Medium
- Incident 2: Over-speeding | 18-Sep-2024 | Location | Severity: Low
- Report incident button

Incident summary:
- Total incidents (this month): 3
- Severity distribution

7. COSTS TAB:

Monthly cost breakdown:
- Fuel: $450
- Maintenance: $195
- Insurance: $250
- Driver salary: $2,000
- Depreciation: $300
- Total: $3,195
- Cost per day: $107
- Cost per km: $0.31

Comparative metrics:
- Cost vs company fleet average
- Efficiency rating

8. AUDIT TAB:

Change log:
- Who changed what and when
- Assignment changes
- Status changes
- etc.
```

### Fleet Analytics

```
PAGE LAYOUT: Dashboard-style

PAGE HEADER:
- Title: "Fleet Analytics"
- Filter: Vehicle type | Date range

TOP METRICS (4 cards):

Card 1: Fleet Utilization
- Percentage: 82.5%
- Chart: Pie showing active/idle/maintenance
- Comparison: vs target 85%

Card 2: Fuel Efficiency
- Avg: 6.8 km/l
- Trend: Up 2.3% from last month (green)
- Cost/km: $0.29

Card 3: Fleet Age (average)
- 3.2 years
- Breakdown: 0-2 years (45 vehicles) | 2-5 years (120 vehicles) | 5+ years (69 vehicles)

Card 4: Breakdown Rate
- This month: 2.1%
- Last month: 1.8%
- Fleet total: 234 vehicles

CHARTS & ANALYTICS:

Left section (50%):

Utilization by vehicle type:
- Bar chart: Truck | Van | Bike | Trailer
- Y-axis: Utilization % (0-100%)
- Color-coded

Cost breakdown:
- Pie chart: Fuel | Maintenance | Insurance | Depreciation | Other
- Click segment to drill down

Right section (50%):

Fleet efficiency trends:
- Line chart: Fuel efficiency (km/l) over past 3 months
- Comparison line: Company target or average

Incident trend:
- Bar chart: Incidents by severity (Critical | High | Medium | Low) over 3 months

BOTTOM SECTION:

Top performers:
- Table: Vehicle ID | Miles | Fuel efficiency | Cost/km | Status
- Top 5 most efficient vehicles

Vehicles needing attention:
- Table: Vehicle ID | Issue | Action needed
- Low fuel efficiency vehicles
- Vehicles due for maintenance
- Breakdown-prone vehicles
```

---

# SECTION 13: LIVE TRACKING & VISIBILITY
## Real-time Tracking Interface Prompt

**Build live tracking and visibility layer:**

### Live Map

```
LAYOUT: Full-screen map-centric

MAP AREA (full-width):
- Map background: Google Maps or similar
- Center: Company headquarters (or user location)
- Zoom controls: +/- buttons
- Full-screen toggle

VEHICLE PINS:
- Icon: Truck/vehicle icon
- Color: Green (on-time) | Orange (at-risk) | Red (delayed) | Gray (inactive)
- Size: 32px
- Click pin: Show popup with vehicle details

POPUP DETAILS (on pin click):
- Vehicle registration
- Driver name
- Current location (address)
- Current trip ID
- ETA to next stop
- Current speed
- Fuel level (if available)
- Close button (X)
- View details button (opens side panel)

SHIPMENT PINS (optional toggle):
- Icon: Box
- Color: By status
- Cluster when zoomed out

GEOFENCE VISUALIZATION:
- Polygon outlines
- Color: Light blue with darker border
- Label: Geofence name (show on hover)
- Click geofence: Show details (name, area, vehicles inside, count)

HEAT MAP (optional toggle):
- Density of shipments/vehicles
- Color gradient: Blue (low) → Red (high density)

TRAFFIC LAYER (if available):
- Roads colored by congestion
- Green (free flow) → Yellow → Red (heavy traffic)

LEFT SIDEBAR (FILTERS & CONTROLS):

Search box:
- "Search vehicle, shipment, or location"
- Autocomplete results
- Search by registration, driver name, shipment ID

Filter section:
- Vehicle type: Checkboxes (Truck, Van, Bike, Trailer)
- Status: Checkboxes (On-time, At-risk, Delayed, Maintenance, Offline)
- Driver status: On-duty | On-break | Off-duty
- Date range: Today | This week | Custom
- Apply filters button

Layer toggle:
- Vehicles: On/Off toggle
- Shipments: On/Off toggle
- Geofences: On/Off toggle
- Traffic: On/Off toggle
- Heat map: On/Off toggle

Resource counter:
- Total vehicles: 234
- Tracked (online): 212 (90%)
- On trip: 145 (62%)
- Idle: 67 (29%)
- Maintenance: 22 (9%)

Search results:
- List of vehicles/shipments matching search
- Click to select and pan to location

RIGHT SIDEBAR (DETAILS PANEL):

For selected vehicle:

Vehicle info card:
- Registration
- Driver
- Vehicle type
- Capacity

Current status:
- Status: On trip / Idle / Maintenance
- Location: Address (with coordinates)
- Updated: 2 mins ago
- Speed: 45 km/h
- Heading: North
- Fuel: 75%

Current trip:
- Trip ID
- Stops: 3
- Distance remaining: 189 km
- ETA: 17:30
- Next stop: Customer A, City

Actions:
- View trip details button
- Contact driver button
- View trip history button
- Message driver button

BOTTOM BAR (SUMMARY & CONTROLS):

Left stats:
- Total tracked: 212/234
- On-time: 145 (green)
- At-risk: 34 (orange)
- Delayed: 22 (red)
- Offline: 22 (gray)

Center controls:
- View toggle: Map | List | Table
- Real-time: Toggle on/off
- Refresh rate: 30 sec / 1 min / 5 min (dropdown)
- Auto-pan: Toggle

Right actions:
- Incident report button
- Full-screen toggle
- Settings/preferences
```

### Shipment Tracking

```
LAYOUT: Timeline + Map + Details

PAGE HEADER:
- Breadcrumb: Home > Tracking > SHP-12345
- Shipment ID (large)
- Status badge: In Transit
- Expected delivery: 28-Sep-2024, 14:00

TAB VIEW:

1. OVERVIEW TAB (default):

Left (60%):

Shipment progress timeline:
Visual timeline showing:
✓ Order created - 27-Sep 09:00
✓ Shipment created - 27-Sep 09:15
✓ Carrier assigned - 27-Sep 10:00
✓ Pickup scheduled - 28-Sep 14:00
✓ Arrived at origin - 28-Sep 14:15
✓ Loading started - 28-Sep 14:30
✓ Departed - 28-Sep 16:45
→ In transit - 28-Sep 16:45 (current)
○ Arrived at destination - (pending)
○ Delivery completed - (pending)

For each event:
- Timestamp
- Event description
- Location (if applicable)
- Actor (system/driver/etc)
- Expand button for details

Current location card:
- "Currently in transit"
- Map showing current location
- ETA: 28-Sep 14:00 (on-time indicator: green)
- Distance remaining: 45 km
- Last update: 2 mins ago
- Location accuracy: 5 meters
- Current speed: 62 km/h (if available)

Right (40%):

Shipment details card:
- Shipment ID
- Order ID (link)
- Customer
- Destination address
- Expected delivery date/time
- Service level

Freight details:
- Items: 3
- Weight: 250 kg
- Volume: 1.2 cbm
- Hazmat: No

Carrier details:
- Carrier name (link)
- Vehicle registration
- Driver name
- Contact phone

ETA details:
- Original ETA: 28-Sep 14:00
- Current ETA: 28-Sep 14:00 (on-time: green)
- Pickup location: Distance / ETA
- Delivery location: Distance / ETA

2. MAP TAB:

Full-screen map:
- Origin location: Green pin
- Current location: Blue moving vehicle icon
- Destination: Red pin
- Route line: Green (completed) + Blue (remaining)
- Distance markers

Map controls:
- Zoom in/out
- Full-screen toggle
- Center on vehicle
- Show traffic layer
- Share map button

Below map:

Route summary:
- Total distance: 234 km
- Completed: 189 km (81%)
- Remaining: 45 km (19%)
- Speed: 62 km/h
- ETA: 14:00 (on-time: green)

3. TRACKING FEED TAB:

Live tracking data stream:
- Timestamp | Event | Location
- Auto-refresh every 30 seconds
- Searchable, filterable
- Color-coded by type

Example events:
- 13:45 - Location update - Pune, MH - 62 km/h
- 13:30 - Location update - Pune, MH - 58 km/h
- 13:15 - Speed detected - 78 km/h (over limit) - Alert (yellow)
- 13:00 - Location update - Pimpri, MH - 65 km/h
- etc.

4. DOCUMENTS TAB:

Related documents:
- Bill of lading (PDF download)
- Packing list (PDF download)
- Invoice (if available)
- Any customs documents

5. EXCEPTIONS TAB:

Exceptions (if any):
- None currently
- Or: List of exceptions with status
```

### ETA & Prediction

```
LAYOUT: ETA management and prediction

PAGE HEADER:
- Title: "ETA & Predictions"
- Filter: Vehicle | Route | Status

ACTIVE VEHICLES WITH ETA (table):

Columns:
- Vehicle registration
- Driver
- Current location
- Origin → Destination
- Original ETA
- Current ETA
- ETA change: +15 min (red, if delayed) or On-time (green)
- On-time probability: 95% (green) or 60% (yellow) or 25% (red)
- Status: On-time | At-risk | Delayed
- Actions: View details

Row coloring based on ETA status

ETA PREDICTION DETAILS (click row):

Modal or side panel:

ETA summary:
- Scheduled ETA: 28-Sep 14:00
- Current ETA: 28-Sep 14:15 (+15 mins)
- On-time probability: 85%
- Confidence level: High

Factors affecting ETA:
- Traffic condition: Moderate (impacts +8 mins)
- Remaining distance: 45 km
- Current speed: 62 km/h (average for segment: 58 km/h)
- Stop duration (if any): 15 mins loading
- Current weather: Clear (no impact)
- Historical pattern: Similar routes average 45 mins remaining

ETA breakdown:
- Driving time: 42 mins (remaining)
- Stop time: 15 mins
- Buffer: 0 mins
- Total: 57 mins
- Arrival at: 14:15

Prediction confidence:
- Certainty level: 85% confident ETA will be within ±10 mins
- Factors affecting confidence:
  - GPS signal: Strong (100%)
  - Traffic data: Available (real-time)
  - Historical data: Strong precedent
  - Vehicle speed: Normal

What-if scenarios (expandable):
- "What if traffic worsens?"
  New ETA: 14:35 (+35 mins)
  
- "What if vehicle diverts for fuel?"
  New ETA: 14:25 (+25 mins)
  
- "What if speed increases 10%?"
  New ETA: 13:55 (-5 mins)

Actions:
- Notify customer of ETA change (if delayed)
- Notify receiver
- Request customer update
- Create exception (if at risk)
- Optimize route (button)
```

---

# SECTION 14: CONTROL TOWER & EXCEPTIONS
## Exception Management Prompt

**Build comprehensive exception and risk management:**

### Exception Management Dashboard

```
LAYOUT: Risk queue + detail panel

PAGE HEADER:
- Title: "Control Tower"
- Subtitle: "Manage exceptions and risks"
- Filter: Severity | Status | Type | Owner
- View: Queue | Map | Timeline

EXCEPTION QUEUE (left panel, 30%):

Severity breakdown (top):
- Critical: 3 (red)
- High: 12 (orange)
- Medium: 34 (yellow)
- Low: 78 (blue)
- Total: 127

Sort by:
- Severity (default)
- Time (oldest first)
- Due time (earliest deadline first)
- Owner

Exception list (scrollable):

Per exception:
- Severity dot (colored)
- Exception ID: EXC-XXXXX
- Type: "Late Delivery" | "Breakdown" | "Temperature Breach"
- Description: "SHP-12345 running 3 hours late"
- Created: Time ago
- Owner: Avatar + name (or "Unassigned")
- Status badge: "Investigating" | "Escalated" | "Resolved"
- Due time: Countdown or date/time (red if overdue)
- Click to select and show details in main panel

Filters:
- Status filter: All | Unassigned | Assigned | Investigating | Escalated | Resolved
- Type filter: All | Late | Breakdown | Temperature | Damage | etc.
- Owner filter: All | [List of managers]
- Custom filter button

MAIN DETAIL PANEL (70%):

For selected exception:

Header:
- Exception ID + Type icon
- Severity badge (colored, large)
- Status: Investigating (large label)
- Created: Date + time
- Elapsed: 3 hours 24 minutes
- Due: 2 hours 36 minutes remaining (red if overdue)

Tabs:

1. SUMMARY TAB (default):

Exception details card:
- Exception ID: EXC-2024-001234
- Type: Delivery Delay
- Severity: High (red)
- Status: Investigating
- Created: 27-Sep 14:00
- Last updated: 27-Sep 15:30
- Owner: Rajesh Kumar
- Estimated impact: 3 hours delay

Root cause analysis:
- Cause: Traffic congestion on Route 12 due to accident
- Contributing factors: Heavy vehicle breakdown on highway
- Affected shipments: 5
- Affected customers: 3

Related entities:
- Shipment: SHP-12345 (link)
- Trip: TRIP-12345 (link)
- Vehicle: VEH-456 (link)
- Driver: John Smith (link)
- Carrier: ABC Transport (link)

Visibility:
- Customer notified: Yes (at 14:15)
- Receiver notified: No (pending)
- Dispatcher notified: Yes
- Management notified: No

2. ACTIONS & RESOLUTION TAB:

Recommended actions (smart suggestions):
- "Reroute vehicle via alternate route (saves 45 mins)"
- "Contact customer to reschedule delivery"
- "Assign backup driver (if fatigue detected)"
- "Process compensation if SLA breached"

Manual actions available:
- Assign to: Dropdown (team members)
- Change status: Dropdown
- Change severity: Dropdown
- Escalate: Button
- Add note: Text area + save
- Reassign resources: Link

Timeline of actions:
- Created: 14:00 - System detected delay
- Assigned to: John Doe - 14:05
- Acknowledged: John Doe - 14:08
- Investigation started: 14:10
- Root cause identified: 14:20 - Traffic incident
- Mitigation initiated: 14:25 - Reroute approved
- [etc]

3. IMPACT ANALYSIS TAB:

Financial impact:
- Late delivery penalty (to customer): $500
- Compensation to customer: TBD
- Cost to resolve: $200 (rerouting)
- Net impact: -$700

Service level impact:
- SLA: 28-Sep 14:00
- Actual: 28-Sep 17:15
- SLA breach: Yes (3h 15m late)
- SLA violation cost: $500

Customer impact:
- Customer: ABC Corporation
- Order value: $2,500
- Customer satisfaction: At risk
- Repeat business risk: Medium

4. RESOLUTION TAB:

Resolution steps (checklist):
- [ ] Notify customer of new ETA
- [ ] Arrange delivery rescheduling
- [ ] Process compensation if applicable
- [ ] Update shipment status
- [ ] Close exception
- [ ] Document lesson learned
- [ ] Follow-up with customer

Resolution notes (text area):
- "Rerouted vehicle via bypass road, saved 30 minutes"
- "Customer accepted new ETA of 17:15"
- "Will process $200 compensation credit"

Mark as resolved button:
- Confirm resolution
- Send notifications
- Close exception

BOTTOM ACTION BAR:

- Unassigned exceptions: 23
- Overdue (not resolved): 5
- Investigating: 45
- Auto-escalate next due: EXC-001238 in 15 mins
- Escalate all due: Button

ADDITIONAL VIEWS (view toggle, top):

MAP VIEW:
- Map showing all exceptions geographically
- Pin color by severity
- Cluster pins when zoomed out
- Click pin to select exception

TIMELINE VIEW:
- Horizontal timeline of exceptions by created time
- Swimlanes by type (Late, Breakdown, Temperature, etc.)
- Color by severity
- Click to select

GRID VIEW:
- Card-based layout
- Per card: Exception details summary
- Color coded by severity and status
```

### Risk Queue

```
SIMILAR LAYOUT TO EXCEPTIONS, BUT PREDICTIVE

PAGE HEADER:
- Title: "Risk Queue"
- Subtitle: "Proactive risk management"
- Filter: Risk level | Type | ETA

RISK SCORING SYSTEM:

Risk = Probability × Impact

Risk levels:
- Critical: Score 80+ (red)
- High: Score 60-79 (orange)
- Medium: Score 40-59 (yellow)
- Low: Score <40 (blue)

RISK QUEUE LIST:

Per risk item:
- Risk level dot (colored)
- Description: "SHP-12345 at risk of late delivery"
- Probability: 75% chance
- Impact: 3 hours delay
- Risk score: 88/100
- ETA: 28-Sep 17:00 (projected)
- Recommended action: "Reassign to faster route"
- Time until risk materializes: 2 hours 30 minutes
- Owner: Unassigned
- Status: Monitoring

RISK DETAIL (click):

Prediction details:
- Shipment: SHP-12345
- Current location: 120 km from destination
- Current speed: 58 km/h (avg for route)
- Scheduled ETA: 14:00
- Predicted ETA: 17:15
- Risk: Late delivery by 3 hours 15 minutes

Probability factors:
- Traffic forecast: 70% chance of congestion (high impact)
- Vehicle breakdown history: 5% chance (medium impact)
- Driver fatigue: 15% chance of rest required (low impact)
- Weather forecast: 2% chance of impact (low impact)

Mitigation options:
1. Reroute via alternate route
   - New ETA: 16:30 (saves 45 mins)
   - Cost: $120
   - Probability of success: 90%
   - Apply mitigation button

2. Reassign to faster vehicle
   - New ETA: 15:45 (saves 1h 30m)
   - Cost: $180
   - Probability of success: 85%
   - Apply mitigation button

3. Contact customer for time extension
   - Extends deadline by 2 hours
   - Cost: $200 (compensation)
   - Probability of acceptance: 70%
   - Apply mitigation button

Outcome projection:
- If no action: 75% chance of late delivery
- If mitigate option 1: 10% chance of late delivery
- If mitigate option 2: 5% chance of late delivery

Recommended action:
- "Apply mitigation option 2 (reassign to faster vehicle)"
- Apply button
```

---

# SECTION 15: FACILITIES MANAGEMENT
## Dock, Yard & Warehouse Prompt

**Build facility operations interface:**

### Appointments Management

```
PAGE HEADER:
- Title: "Appointments"
- Count: (456 this month)
- New appointment button
- Filters: Status | Facility | Date range | Type

APPOINTMENT CALENDAR VIEW (main):

Calendar format:
- Week view (default) | Day | Month view toggle
- 7 days visible (Mon-Sun)
- Time slots: 06:00 to 22:00 (hourly)
- Appointment blocks per time slot

Appointment block (calendar):
- Shipment/Order ID
- Customer name
- Time: 08:00 - 08:45
- Type: Pickup | Delivery | Cross-dock
- Status: Confirmed | Pending | Arrived | Completed | No-show
- Color by type: Blue (Pickup) | Green (Delivery) | Orange (Cross-dock)
- Hover: Show details tooltip
- Click: Open appointment detail

SIDEBAR - FACILITY SELECTION:

Facility dropdown:
- Select facility (warehouse, dock, yard)
- Switch between facilities

Dock/Gate assignment view:
- Show available docks/gates per facility
- Dock 1: 2/3 slots booked
- Dock 2: 1/2 slots booked
- Dock 3: 0/1 slot available
- Gate: 0/5 slots booked

TODAY'S APPOINTMENTS LIST (below calendar):

Time | Appointment ID | Shipment | Customer | Type | Status | Actions
08:00 | APT-001 | SHP-12345 | ABC Corp | Pickup | Confirmed | Check-in button
09:15 | APT-002 | SHP-12346 | XYZ Ltd | Delivery | Arrived | Complete button
[etc]

BULK ACTIONS:
- Reschedule multiple
- Cancel appointments
- Export schedule

APPOINTMENT DETAIL (modal/sidebar):

Appointment information:
- Appointment ID: APT-2024-001234
- Date: 28-Sep-2024
- Time: 08:00 - 08:45 (45 min slot)
- Type: Pickup | Delivery
- Status: Confirmed | Pending | Arrived | Completed | No-show

Shipment/Order details:
- Shipment ID (link)
- Customer name (link)
- Contact person: Phone number
- Items: Count
- Weight: 500 kg
- Volume: 2.5 cbm

Facility details:
- Facility: Mumbai Warehouse
- Dock/Gate: Dock 2
- Address

Status timeline:
- Scheduled: 28-Sep 08:00
- Confirmed: 26-Sep 14:30 (by customer)
- Reminder sent: 27-Sep 18:00
- Arrived: 28-Sep 07:55 (check-in)
- Completed: (pending)

Actions:
- Check-in button (when arrived)
- Complete appointment button
- Reschedule button (if not started)
- Cancel button
- Send reminder button
- Edit details button

APPOINTMENT RESCHEDULING (modal):

Original appointment:
- APT-001 | SHP-12345 | 28-Sep 08:00 | Dock 2

New slot selection:
- Date picker
- Available time slots shown (highlighted in green)
- Unavailable slots shown (grayed out)
- Select new slot
- Reason for reschedule: Dropdown
- Confirm reschedule button

Reschedule confirmation:
- Shows original and new times
- Notify customer checkbox (default checked)
- Notify sender checkbox (default checked)
- Confirm button
```

### Dock Schedule

```
LAYOUT: Gantt-style dock utilization

PAGE HEADER:
- Title: "Dock Schedule"
- Facility selector: Dropdown
- View: Timeline | List | Utilization chart
- Date range picker

TIMELINE VIEW (default):

Horizontal Gantt chart:
- Y-axis: Dock 1, Dock 2, Dock 3, Dock 4 (list on left)
- X-axis: Time (6:00, 8:00, 10:00, 12:00, 14:00, 16:00, 18:00, 20:00)
- Today's date shown at top

Per dock row:
- Available time: Light gray background
- Booked time: Colored block (blue for pickup, green for delivery)
- Block details (on hover):
  - Appointment ID
  - Shipment ID
  - Customer
  - Type
  - Duration
- Block height represents dock utilization
- Click block: Open detail panel

UTILIZATION STATS (right sidebar):

Per dock:
- Dock 1: ████████░ 80% utilized, 4/5 slots booked
- Dock 2: ██████░░░ 60% utilized, 3/5 slots booked
- Dock 3: ███████░░ 70% utilized, 2/3 slots booked
- Dock 4: ████░░░░░ 40% utilized, 2/5 slots booked
- Gate: ██░░░░░░░ 20% utilized, 1/5 slots booked

Overall facility utilization: 62%

Bottleneck alerts:
- Dock 1 fully booked until 16:00
- Recommendation: Spread appointments to other docks

APPOINTMENT QUEUE (below timeline):

Next appointments in sequence:
1. 08:00 - APT-001 | Dock 1 | SHP-12345 | Pickup | 45 min
2. 08:30 - APT-002 | Dock 2 | SHP-12346 | Delivery | 60 min
3. 09:00 - APT-003 | Dock 3 | SHP-12347 | Cross-dock | 30 min
[etc]

Real-time status:
- Current time: 08:15
- APT-001: In progress (30 mins remaining)
- APT-002: Waiting (15 mins until start)
- APT-003: Waiting (45 mins until start)

ACTIONS:
- Optimize schedule button (AI-assisted)
- Adjust dock capacity button
- Add emergency appointment button
- View dock details (for selected dock)

DOCK DETAIL (modal/sidebar):

Dock information:
- Dock number
- Capacity: 5,000 kg weight, 20 cbm volume
- Equipment: Forklift, Pallet jack, Scales
- Current status: Available | Occupied | Maintenance
- Utilization rate: 80% (this month)
- Average dwell time: 45 minutes
- Peak hours: 08:00-14:00

Operations metrics:
- Appointments today: 4
- Average appointment duration: 52 min
- Delays/issues: 0
- Equipment breakdown: None

Schedule today:
- 08:00-08:45: APT-001 (active)
- 09:00-10:00: APT-002
- 10:15-10:45: APT-003
- 12:00-13:00: APT-004
- Available: 13:00-18:00

Edit dock details button
```

### Yard & Warehouse Management

```
LAYOUT: Visual floor plan + operations

PAGE HEADER:
- Title: "Yard Operations"
- Facility: Dropdown
- View: Yard map | List | Status

YARD MAP VIEW:

Visual representation:
- SVG or canvas showing facility layout
- Zones: Inbound dock, Outbound dock, Staging area, Storage racks
- Vehicles/Trailers shown as icons on map
- Color-coded by status:
  - Green: Ready to load/unload
  - Blue: Loading/Unloading in progress
  - Orange: Waiting for appointment
  - Gray: Parked/Idle

Legend:
- Zone types explained
- Status colors
- Scale indicator

Interactive:
- Click on vehicle: Show details
- Click on zone: Show zone details, occupancy
- Drag to move vehicle (if authorized)
- Zoom in/out
- Pan to navigate

VEHICLES IN YARD (list view or sidebar):

Vehicle list:
- Registration | Trailer number | Status | Current zone | Time in yard
- Inbound trailers: 5
  - TR-001: Loading in progress | Inbound dock | 45 mins
  - TR-002: Waiting for dock | Staging area | 2 hours
  - TR-003: Unloading complete | Outbound dock | 3 mins (ready to leave)
- Outbound trailers: 3
  - TR-004: Being loaded | Outbound dock | 30 mins
  - TR-005: Loaded, awaiting dispatch | Staging area | 15 mins
- Parked trailers: 8
  - TR-006: Empty, parked | Storage zone | 1 day

Yard moves operations:

Yard move form:
- "Move vehicle from: [Zone]"
- "To: [Zone]" (dropdown)
- Reason: Parking | Reconfiguration | Loading | Unloading | Maintenance
- Operator name: Dropdown
- Confirm move button

Move history:
- Timeline of recent moves
- Vehicle | From zone | To zone | Time | Operator

ZONE DETAILS (click zone on map):

Zone information:
- Zone name: Inbound Dock
- Type: Dock | Staging | Storage | Yard
- Capacity: 5 vehicles | 50,000 kg | 250 cbm
- Current occupancy: 2 vehicles | 12,000 kg | 75 cbm (40%)
- Available space: 3 vehicles | 38,000 kg | 175 cbm (60%)

Vehicles in zone:
- TR-001: Loading | ETA: 30 mins
- TR-002: Waiting | ETA: 60 mins

Congestion alert:
- "This zone is 70% occupied"
- "Recommendation: Move 1 vehicle to staging area"
- Move button

Zone operations:
- Equipment available: Forklift (2), Pallet jack (1), Scales
- Operator assigned: Rajesh (on break until 14:30)
- Current activity: Loading TR-001
```

---

# SECTION 16-25: REMAINING SECTIONS
## Remaining Sections Structure Template

**For each remaining section (Documents, Finance, Customers, etc.), follow this structure:**

```
### SECTION NAME: [SECTION TITLE]
## [Subsection] Interface Prompt

**Build [description] with:**

### [Subsection 1] View
```
[Repeat the same detailed component-by-component specification]
```

### [Subsection 2] View
```
[Continue with same detailed level]
```

### [Subsection N] Management
```
[Provide complete interface specifications]
```
```

---

# FINAL IMPLEMENTATION CHECKLIST

## Before building any page/section:

☐ Review the relevant color palette (Section 0)
☐ Check typography guidelines (Section 0)
☐ Apply spacing system (8px grid - Section 0)
☐ Use reusable components (Section 2)
☐ Follow layout structure (Section 1)
☐ Ensure RBAC-aware visibility
☐ Implement responsive design
☐ Add loading states
☐ Include error handling UI
☐ Provide success confirmations
☐ Test keyboard navigation
☐ Verify accessibility (WCAG 2.1 AA)
☐ Add empty states
☐ Include help tooltips
☐ Implement proper focus management

## Key UX Principles Throughout:

1. **Progressive Disclosure**: Show basic info, advanced options on demand
2. **Consistent Navigation**: Same location, same behavior across app
3. **Clear Feedback**: Every action gets visual feedback
4. **Error Prevention**: Validate before submission, confirm destructive actions
5. **Mobile Responsive**: Tablet and mobile views for key workflows
6. **Accessibility**: All interactive elements keyboard accessible
7. **Dark Mode Ready**: Use CSS variables for easy theming
8. **Performance**: Lazy load, paginate large lists, optimize images
9. **Audit Trail**: Track all significant changes
10. **Localization**: Support multiple languages and regions

---

END OF COMPLETE UI DESIGN PROMPT DOCUMENT v1.0
```
