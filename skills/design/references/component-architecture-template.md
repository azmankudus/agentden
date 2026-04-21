# Component Architecture Template

> Use this template when running `/design components` to produce the component tree, state flow, and directory scaffolding plan.

## Step-by-Step Instructions

1. **Map pages to routes** using the file-based routing structure.
2. **Identify shared components** by analyzing common UI patterns across pages.
3. **Design the component tree** — top-down from AppShell to leaf primitives.
4. **Define state ownership** — which component owns which state, and how it flows.
5. **Plan the state architecture** — signals, stores, resources, context.
6. **Document the directory structure** with all planned files.

## Route Map Template

| Route | File | Page Component | Layout | Required Auth | Required Role |
|---|---|---|---|---|---|
| `/` | `routes/index.tsx` | `HomePage` | Default | No | — |
| `/login` | `routes/(auth)/login.tsx` | `LoginPage` | `AuthLayout` | No | — |
| `/register` | `routes/(auth)/register.tsx` | `RegisterPage` | `AuthLayout` | No | — |
| `/dashboard` | `routes/(dashboard)/dashboard/index.tsx` | `DashboardPage` | `DashboardLayout` | Yes | any |
| `/users` | `routes/(dashboard)/users/index.tsx` | `UserListPage` | `DashboardLayout` | Yes | admin |
| `/users/:id` | `routes/(dashboard)/users/[id].tsx` | `UserDetailPage` | `DashboardLayout` | Yes | admin |
| `/settings` | `routes/(dashboard)/settings/index.tsx` | `SettingsPage` | `DashboardLayout` | Yes | any |
| `/settings/:section` | `routes/(dashboard)/settings/[section].tsx` | `SettingsSectionPage` | `DashboardLayout` | Yes | any |
| `/403` | `routes/403.tsx` | `ForbiddenPage` | Default | Yes | — |
| `/404` | `routes/[...404].tsx` | `NotFoundPage` | Default | No | — |

## Component Tree Template

```
App
├── AuthProvider (Context: auth state)
│   ├── ThemeProvider (Context: theme state)
│   │   ├── NotificationProvider (Context: toast queue)
│   │   │   │
│   │   │   ├── <Routes>
│   │   │   │   │
│   │   │   │   ├── / → HomePage
│   │   │   │   │   ├── HeroSection
│   │   │   │   │   ├── FeatureGrid
│   │   │   │   │   └── CallToAction
│   │   │   │   │
│   │   │   │   ├── /(auth) → AuthLayout
│   │   │   │   │   └── CenteredCard
│   │   │   │   │       ├── Logo
│   │   │   │   │       └── <Outlet />
│   │   │   │   │           ├── /login → LoginPage
│   │   │   │   │           │   └── LoginForm (FormField, Input, Button)
│   │   │   │   │           └── /register → RegisterPage
│   │   │   │   │               └── RegisterForm (FormField, Input, Select, Button)
│   │   │   │   │
│   │   │   │   └── /(dashboard) → DashboardLayout
│   │   │   │       ├── Header
│   │   │   │       │   ├── Logo
│   │   │   │       │   ├── Navigation
│   │   │   │       │   ├── SearchInput
│   │   │   │       │   └── UserMenu (Avatar, Dropdown)
│   │   │   │       ├── Sidebar
│   │   │   │       │   ├── NavTree
│   │   │   │       │   │   └── NavItem (Icon, Badge)
│   │   │   │       │   └── SidebarFooter
│   │   │   │       └── <Outlet />
│   │   │   │           ├── /dashboard → DashboardPage
│   │   │   │           │   ├── PageHeader
│   │   │   │           │   └── StatGrid
│   │   │   │           │       └── StatCard (Icon, Card)
│   │   │   │           ├── /users → UserListPage
│   │   │   │           │   ├── PageHeader
│   │   │   │           │   ├── SearchInput
│   │   │   │           │   └── DataTable (Table, Pagination)
│   │   │   │           ├── /users/:id → UserDetailPage
│   │   │   │           │   ├── PageHeader (Breadcrumbs)
│   │   │   │           │   ├── UserDetailsCard
│   │   │   │           │   └── ConfirmDialog (delete confirmation)
│   │   │   │           └── /settings → SettingsPage
│   │   │   │               ├── PageHeader
│   │   │   │               └── SettingsPanel
│   │   │   │                   └── Tabs + FormField components
│   │   │   │
│   │   │   └── ToastContainer
│   │   │       └── For → Toast
```

## State Flow Diagram

Document the state ownership for each feature area:

### Authentication State

```
AuthProvider (Context)
  │
  ├── State: { user: User | null, isAuthenticated: boolean }
  │   Store: createStore
  │   Source: createResource(fetchSession) on mount
  │
  ├── Actions: login(credentials) → POST /auth/token → setUser
  │            logout() → POST /auth/logout → setUser(null)
  │            refreshToken() → POST /auth/refresh → update tokens
  │
  └── Consumers: Header (user menu), route guards, API client (attach token)
```

### Data Fetching State

```
Page Component
  │
  ├── Signal: [page, setPage] = createSignal(1)
  ├── Signal: [filters, setFilters] = createStore({})
  │
  ├── Resource: [data] = createResource(() => ({ page: page(), ...filters }), fetcher)
  │   │
  │   ├── data.loading → Show loading skeleton
  │   ├── data.error → Show error state with retry
  │   └── data() → Render DataTable with items
  │
  └── Memo: [derived] = createMemo(() => transform(data()))
```

### UI State

```
UIProvider (Context)
  │
  ├── State: { sidebarOpen: boolean, activeModal: string | null }
  │   Store: createStore
  │
  ├── Actions: toggleSidebar(), openModal(id), closeModal()
  │
  └── Consumers: Sidebar (open/close), Dialog (show/hide)
```

## State Ownership Matrix

| State | Owner | Type | Shared Via | Consumers |
|---|---|---|---|---|
| Current user | `AuthProvider` | `createStore` | `Context` | Header, guards, API client |
| Theme preference | `ThemeProvider` | `createSignal` | `Context` | App root, theme toggle |
| Toast queue | `NotificationProvider` | `createStore` | `Context` | Any component |
| Page list data | Page component | `createResource` | Props | DataTable |
| Form state | Form component | `createSignal` | Props | FormField components |
| Sidebar open | `UIProvider` | `createSignal` | `Context` | Sidebar, Header hamburger |
| Selected item | Page component | `createSelector` | Props | List items |
| URL params | SolidStart router | Router | `useParams()` | Page components |

## Component Specification Template

For each component, document:

```yaml
Component: {{ComponentName}}
Category: layout | page | feature | ui-primitive
File: src/{{path}}/{{ComponentName}}.tsx

Props:
  - name: {{propName}}
    type: {{TypeScriptType}}
    required: true | false
    default: {{defaultValue}}
    description: {{What it does}}

State:
  - name: {{stateName}}
    type: {{Type}}
    owner: self | parent | context
    description: {{Purpose}}

Emits:
  - event: {{eventName}}
    payload: {{Type}}
    description: {{When it fires}}

Depends On:
  - {{ChildComponent1}} (ui-primitive)
  - {{ChildComponent2}} (feature)

Accessibility:
  - {{ARIA attributes needed}}
  - {{Keyboard interactions}}

Notes:
  - {{Design decisions, constraints, edge cases}}
```

## Directory Scaffolding Checklist

```
src/
├── app.css                              # @theme tokens
├── app.tsx                              # Root component
├── entry-client.tsx                     # Client entry
├── entry-server.tsx                     # Server entry
├── routes/                              # File-based routing
│   ├── index.tsx                        # [ ] Home page
│   ├── (auth)/                          # [ ] Auth route group
│   │   ├── layout.tsx                   # [ ] Auth layout
│   │   ├── login.tsx                    # [ ] Login page
│   │   └── register.tsx                 # [ ] Register page
│   ├── (dashboard)/                     # [ ] Dashboard route group
│   │   ├── layout.tsx                   # [ ] Dashboard layout
│   │   ├── dashboard/index.tsx          # [ ] Dashboard page
│   │   ├── users/index.tsx              # [ ] User list page
│   │   ├── users/[id].tsx               # [ ] User detail page
│   │   └── settings/index.tsx           # [ ] Settings page
│   └── [...404].tsx                     # [ ] Not found page
├── components/
│   ├── layout/                          # [ ] Layout components
│   │   ├── AppShell.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Breadcrumbs.tsx
│   ├── ui/                              # [ ] UI primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Switch.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Dialog.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Table.tsx
│   │   ├── Pagination.tsx
│   │   ├── Toast.tsx
│   │   ├── Spinner.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Tabs.tsx
│   │   ├── Avatar.tsx
│   │   └── Divider.tsx
│   └── shared/                          # [ ] Shared composites
│       ├── DataTable.tsx
│       ├── FormField.tsx
│       ├── SearchInput.tsx
│       ├── ConfirmDialog.tsx
│       ├── EmptyState.tsx
│       ├── ErrorBoundary.tsx
│       └── PageHeader.tsx
├── stores/                              # [ ] Global stores
│   ├── auth.ts
│   ├── theme.ts
│   ├── notifications.ts
│   └── ui.ts
├── hooks/                               # [ ] Custom hooks
│   ├── useMediaQuery.ts
│   ├── useClickOutside.ts
│   ├── useLocalStorage.ts
│   ├── useKeyboard.ts
│   └── useDebounce.ts
├── lib/                                 # [ ] Utilities
│   ├── api/client.ts
│   ├── api/errors.ts
│   ├── api/query.ts
│   ├── validation/schemas.ts
│   ├── validation/utils.ts
│   └── utils/format.ts
│   └── utils/cn.ts
└── types/                               # [ ] TypeScript types
    ├── api.ts
    ├── models.ts
    └── ui.ts
```
