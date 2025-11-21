# CargoForce Shipping Landing Page

## Overview

This is a Next.js-based landing page for CargoForce, a shipping and logistics service. The application features a contact form for potential customers to submit shipping enquiries. It's built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4, running on Replit's infrastructure.

The application handles customer enquiries through a simple form interface and currently stores submissions in a JSON file-based system, with clear pathways for future integration with email services, databases, or CRM systems.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** Next.js 15 (Pages Router)
- **UI Library:** React 19
- **Language:** TypeScript with relaxed strict mode
- **Styling:** Tailwind CSS v4 with custom theme configuration

**Design Pattern:** Traditional Next.js Pages Router architecture with page-based routing. The application uses a single-page approach with `/pages/index.tsx` serving as the main landing page.

**Styling Strategy:** Tailwind CSS v4 is configured with a custom blue-themed color palette (primary colors ranging from 50-900) defined in both `tailwind.config.js` and `styles/globals.css` using the new `@theme` directive. The application uses utility-first CSS with Tailwind's PostCSS plugin.

**State Management:** Local component state using React hooks (`useState`). Form data is managed within the Home component with controlled inputs. Submit status tracking provides user feedback for form submissions.

### Backend Architecture

**API Routes:** Next.js API routes handle server-side logic in the `/pages/api` directory:
- `/api/contact` - Processes contact form submissions
- `/api/hello` - Default example endpoint

**Data Persistence:** Currently using a file-based storage system that saves enquiries to `data/enquiries.json`. Each enquiry includes:
- Unique ID
- Contact information (name, email, phone)
- Shipment details (type, boxes, weight, details)
- Timestamp
- Status field (new/contacted/completed)

**Rationale:** File-based storage was chosen for simplicity in the development phase, making it easy to deploy on Replit without external dependencies. The API includes validation for required fields (name, email, phone) and proper error handling.

**Future Integration Points:** The `/pages/api/README.md` documents three clear upgrade paths:
1. Email service integration (SendGrid, Mailgun, AWS SES)
2. Database storage (prepared for future Drizzle ORM integration)
3. CRM system integration

### Configuration & Development

**Development Server:** Configured to run on port 5000 with hostname 0.0.0.0 for Replit compatibility. The `next.config.ts` includes `allowedDevOrigins` configuration for Replit's domain system.

**TypeScript Configuration:** Uses relaxed settings (`strict: false`) targeting ES2017, which balances modern JavaScript features with broader compatibility.

**Build System:** Standard Next.js build process with:
- Development mode: `npm run dev`
- Production build: `npm run build` 
- Production server: `npm run start`

**Code Quality:** ESLint configured with Next.js core web vitals preset for maintaining code standards.

## External Dependencies

### Core Framework Dependencies
- **next** (^15.2.3) - React framework for production
- **react** (^19.0.0) - UI library
- **react-dom** (^19.0.0) - React DOM rendering

### Styling Dependencies
- **tailwindcss** (^4.1.17) - Utility-first CSS framework
- **@tailwindcss/postcss** (^4.1.17) - Tailwind's PostCSS plugin
- **postcss** (^8.5.6) - CSS transformation tool
- **autoprefixer** (^10.4.22) - CSS vendor prefixing

### Development Dependencies
- **typescript** (^5.8.2) - Type checking and compilation
- **eslint** (^9.23.0) - Code linting
- **eslint-config-next** (^15.2.3) - Next.js ESLint configuration
- **@types/node**, **@types/react**, **@types/react-dom** - TypeScript type definitions

### Planned Integrations
The application is designed to accommodate future integration with:
- **Email Services:** SendGrid, Mailgun, AWS SES, or Postmark for enquiry notifications
- **Database:** Potential Drizzle ORM integration (structure supports database migration from file storage)
- **CRM Systems:** For enquiry management and customer relationship tracking

### Infrastructure
- **Hosting:** Replit-specific configuration with custom domain support and port binding
- **Storage:** File system-based (Node.js `fs` module) for enquiry persistence