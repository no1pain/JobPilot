# JobPilot

A modern job application tracking system built with Next.js 16, React 19, and TypeScript. JobPilot helps you manage your job search workflow with an intuitive interface for tracking applications, statuses, priorities, and salaries.

## Features

- **Job Tracking**: Track job applications through multiple stages (Interested → Applied → Interview → Technical Interview → Offer/Rejected)
- **Priority Management**: Set job priorities (Low, Medium, High) with visual indicators
- **Salary Visualization**: Color-coded salary ranges for quick assessment
- **Drag & Drop Reordering**: Organize your job list with intuitive drag-and-drop functionality
- **Dashboard Statistics**: Real-time overview of your job search progress
- **Local Storage Persistence**: All data persists locally in the browser
- **Responsive Design**: Fully responsive UI built with Tailwind CSS v4
- **Type Safety**: Full TypeScript coverage for robust development

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI Library**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Custom implementation using `useSyncExternalStore` with localStorage

## Architecture Highlights

### State Management
The application uses a custom state management pattern leveraging React's `useSyncExternalStore` hook for optimal performance and SSR compatibility. This approach provides:
- Efficient re-renders through selective subscriptions
- Server-side rendering support with server snapshots
- Type-safe state operations
- Local storage persistence

### Component Structure
```
app/
├── layout.tsx          # Root layout with global styles
└── page.tsx            # Home page entry point

components/
├── app-header.tsx      # Application header
├── dashboard-stats.tsx # Statistics overview
├── home-page.tsx       # Main page composition
├── jobs/               # Job-related components
│   ├── job-card.tsx    # Individual job display
│   ├── job-form.tsx    # Create/edit form
│   └── jobs-section.tsx# Jobs list with filters
└── ui/                 # Reusable UI components

hooks/
└── use-jobs.ts         # Custom hook for job state

lib/
├── constants.ts        # Application constants
├── job-storage.ts      # Local storage utilities
├── jobs-store.ts       # State management logic
└── types.ts            # TypeScript definitions
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jobpilot
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Usage

Add jobs via the "Add Job" button, edit/delete using card buttons, change status via dropdown, and reorder by dragging (desktop). Dashboard shows real-time statistics.

## Development Notes

### Custom State Management
The project implements a custom store pattern using `useSyncExternalStore` instead of external state management libraries. This demonstrates understanding of React's latest APIs and provides a lightweight, performant solution.

### Type Safety
All components and utilities are fully typed with TypeScript, including:
- Job interfaces with optional fields
- Status and priority union types
- Component prop types
- Store action signatures

### Styling Approach
Tailwind CSS v4 is used with a custom utility system in `lib/ui.ts` for consistent theming and maintainability.

## Future Enhancements

- [ ] Supabase integration
- [ ] Authentication
- [ ] Export/import functionality

## License

This project is private and intended for personal use.
