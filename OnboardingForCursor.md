
# Grant Writing Application - Onboarding Documentation

## Project Overview
This is a comprehensive grant writing and discovery platform built with React, TypeScript, and Tailwind CSS. The application helps organizations discover grants, write proposals, and manage their grant applications through an AI-assisted interface.

## Architecture Overview
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router v6
- **State Management**: React hooks and context
- **UI Components**: Custom components built on Radix UI primitives

## Main Application Structure

### Core Application Files
- **`src/App.tsx`**: Main application component with routing setup
- **`src/main.tsx`**: Application entry point
- **`src/index.css`**: Global styles and Tailwind configuration

### Page Components

#### `src/pages/Dashboard.tsx` (READ-ONLY)
- Main dashboard with overview widgets
- Shows grant pipeline, calendar, team activity
- Entry point after login

#### `src/pages/GrantDiscovery.tsx` (READ-ONLY)
- Grant discovery and search interface
- Uses resizable panels for grant list and preview
- Integrates with URL search params for deep linking

#### `src/pages/GrantWriting.tsx`
- **Purpose**: Main grant writing interface with three-panel layout
- **Features**: 
  - Left panel: Grant overview, outline, attachments
  - Center panel: Rich text editor for grant sections
  - Right panel: AI assistant
- **Key State**: currentSection, aiAssistantOpen, grantStatus
- **Layout**: Uses ResizablePanelGroup for flexible UI

### Dashboard Components

#### `src/components/dashboard/Sidebar.tsx`
- **Purpose**: Fixed left navigation sidebar
- **Features**: Icon-based navigation with tooltips
- **Navigation Items**: Dashboard, Discover, Write Grants, Drafts, Reports, Documents, Settings

#### `src/components/dashboard/TopBar.tsx`
- **Purpose**: Top navigation bar with search and user controls
- **Features**: Organization switcher, global search, notifications, user menu
- **Search**: Integrates with onSearchOpen callback

#### `src/components/dashboard/AIInsightBanner.tsx`
- **Purpose**: Rotating banner showing AI-generated insights
- **Features**: Multiple insights with pagination dots, dismissible
- **Content**: Budget alerts, grant matches, optimization suggestions

#### `src/components/dashboard/NewGrantsWidget.tsx`
- **Purpose**: Dashboard widget showing recently discovered grants
- **Features**: Fit scores, award ranges, deadlines
- **Navigation**: Links to discovery page with pre-selected grants

### Grant Discovery Components

#### `src/components/discovery/FitSnapshot.tsx`
- **Purpose**: Displays grant fit score with circular progress indicator
- **Features**: Color-coded fit levels, detailed match reasons
- **Props**: score (number), reasons (array of fit reasons)
- **Visual**: Animated SVG circle with percentage display

### Grant Writing Components

#### `src/components/grant-writing/GrantEditor.tsx`
- **Purpose**: Main editor component that switches between different section types
- **Features**: 
  - Handles both narrative sections (with rich text) and structured sections (budget, logic model)
  - Draft generation, confidence scoring, word count tracking
  - Mode switching between write and review modes
- **Sections**: Executive summary, need statement, objectives, methods, evaluation, budget, timeline, logic model

#### `src/components/grant-writing/GrantSnapshot.tsx`
- **Purpose**: Quick overview widget showing grant details
- **Features**: Funder info, amount, deadline, progress tracking
- **Visual**: Progress bar showing completion percentage

#### `src/components/grant-writing/GrantOutline.tsx`
- **Purpose**: Navigation sidebar showing all grant sections
- **Features**: Status indicators (todo, draft, review, final), word count progress
- **Interaction**: Click to switch sections, visual current section highlighting

#### `src/components/grant-writing/RichTextEditor.tsx`
- **Purpose**: Simple rich text editor for narrative sections
- **Features**: Large textarea with Georgia serif font, placeholder support
- **Props**: content, onChange, placeholder

#### `src/components/grant-writing/SentenceHighlighter.tsx`
- **Purpose**: AI-powered sentence analysis and feedback system
- **Features**: 
  - Color-coded sentence highlighting (good/review/problematic)
  - Popover feedback with suggestions
  - Interactive sentence improvement tools
- **Analysis**: Word count, clarity, grammar suggestions

#### `src/components/grant-writing/BudgetGrid.tsx`
- **Purpose**: Interactive budget management with structured table format
- **Features**:
  - Personnel, supplies, equipment, other categories
  - Add/edit/delete budget items
  - Automatic total calculations
  - Generate budget from grant context
- **Structure**: Year-based columns with category rows

#### `src/components/grant-writing/LogicModel.tsx` 
- **Purpose**: Logic model builder with 5-column visual flow
- **Features**:
  - Inputs → Activities → Outputs → Outcomes → Impacts flow
  - Add/edit/delete items in each column
  - Generate logic model from program context
  - Assumptions and external factors section
- **Visual**: Color-coded columns with arrows showing progression

#### `src/components/grant-writing/ContextWizard.tsx`
- **Purpose**: Onboarding wizard to gather program context before writing
- **Features**:
  - Multi-step form with progress tracking
  - Different input types (text, textarea, chips, file upload)
  - Context document upload for AI understanding
- **Flow**: Program details → Demographics → Partnerships → Document upload → Start writing

### UI Components
Located in `src/components/ui/` - These are shadcn/ui components providing consistent design system:
- `alert.tsx`, `alert-dialog.tsx`: Alert and dialog components
- `avatar.tsx`: User avatar display
- `badge.tsx`: Status and category badges  
- `button.tsx`: Primary button component
- `card.tsx`: Content container cards
- `input.tsx`, `textarea.tsx`: Form input components
- `accordion.tsx`: Collapsible content sections

## Current Development Focus

### Grant Writing Module
We're building a comprehensive grant writing interface that includes:

1. **Multi-Section Editor**: Different input methods for narrative vs. structured content
2. **AI Integration**: Draft generation, sentence analysis, and improvement suggestions
3. **Context-Aware Generation**: Uses program details and uploaded documents for better AI output
4. **Structured Components**: Special formats for budgets and logic models
5. **Progress Tracking**: Section completion status and word count monitoring

### Key Features Implemented
- **Budget Grid**: Interactive table for detailed budget planning with AI generation
- **Logic Model**: Visual flow builder for program theory with AI assistance
- **Sentence Analysis**: Real-time feedback on writing quality with improvement suggestions
- **Context Wizard**: Guided setup to provide AI with program context
- **Responsive Layout**: Three-panel resizable interface for efficient workflow

### Recent Updates
- Added generate buttons to Budget Grid and Logic Model components
- Implemented structured data formats for financial and logical planning
- Created context gathering system for better AI-generated content
- Built sentence-level analysis and improvement system

## File Organization Pattern
- **Pages**: Top-level route components in `src/pages/`
- **Feature Components**: Grouped by domain (dashboard, discovery, grant-writing)
- **UI Components**: Reusable design system components in `src/components/ui/`
- **Utilities**: Helper functions in `src/lib/`

## Development Principles
- **Component Composition**: Small, focused components that do one thing well
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Responsive Design**: Mobile-first approach with Tailwind utilities
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Code splitting and lazy loading where appropriate

This application provides a complete grant management workflow from discovery through writing and submission, with AI assistance throughout the process.
