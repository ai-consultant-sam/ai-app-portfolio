# EmailCraft AI - Sales Email Generation Application

## Overview

EmailCraft AI is a full-stack web application designed to generate professional Japanese sales emails using OpenAI's GPT-4o model. The application features a modern React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **API Pattern**: RESTful API endpoints
- **Development**: tsx for TypeScript execution in development

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database (@neondatabase/serverless)
- **Local Development**: In-memory storage implementation for testing
- **Schema Management**: Drizzle migrations in `/migrations` directory
- **Connection**: Environment variable-based configuration (DATABASE_URL)

## Key Components

### Database Schema
The application uses three main tables:
- **user_profiles**: Stores user information (name, company, position, email)
- **customers**: Customer data (company, contact name, industry, department)
- **email_generations**: Generated email history with metadata

### API Endpoints
- `POST /api/generate-email`: Generates sales emails using OpenAI
- `GET /api/email-history`: Retrieves generation history

### Frontend Components
- **UserProfile**: Manages user profile data with local storage persistence
- **CustomerForm**: Handles customer information input with industry-specific department selection
- **EmailSettings**: Configures email generation parameters (purpose, tone, length)
- **EmailGenerator**: Orchestrates the email generation process
- **EmailOutput**: Displays and manages generated email content
- **GenerationHistory**: Shows previous email generations

### Core Features
- Japanese business email generation with industry-specific customization
- Real-time form validation and user feedback
- Local storage for user profile persistence
- Responsive design with mobile support
- Copy-to-clipboard functionality
- Toast notifications for user feedback

## Data Flow

1. **User Input**: User provides profile information, customer details, and email preferences
2. **Validation**: Frontend validates all required fields before submission
3. **API Request**: Frontend sends structured request to backend generation endpoint
4. **AI Processing**: Backend calls OpenAI API with formatted prompts for Japanese business context
5. **Database Storage**: Generated emails are stored with metadata for history tracking
6. **Response Handling**: Frontend displays generated content and updates history
7. **Local Persistence**: User profile data is maintained in browser localStorage

## External Dependencies

### Core Dependencies
- **OpenAI API**: GPT-4o model for email generation
- **Database**: PostgreSQL via Neon Database
- **UI Components**: Extensive shadcn/ui component library
- **Styling**: Tailwind CSS with PostCSS processing

### Development Tools
- **Replit Integration**: Custom vite plugins for Replit environment
- **TypeScript**: Strict type checking across the entire stack
- **ESBuild**: Production bundling for server code

### Authentication & Sessions
- Session management via connect-pg-simple (PostgreSQL session store)
- Environment-based API key configuration

## Deployment Strategy

### Development Environment
- **Frontend**: Vite development server with HMR
- **Backend**: tsx with automatic restart on file changes
- **Database**: Direct PostgreSQL connection via environment variables

### Production Build
- **Frontend**: Static assets built to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- OpenAI API key via `OPENAI_API_KEY` or `VITE_OPENAI_API_KEY`
- Node environment detection for development vs production features

### Architectural Decisions

**Problem**: Need for type-safe database operations and schema management
**Solution**: Drizzle ORM with TypeScript integration and schema-first approach
**Rationale**: Provides excellent TypeScript support, migration capabilities, and PostgreSQL compatibility

**Problem**: Complex UI component requirements for form-heavy application
**Solution**: shadcn/ui component library with Radix UI primitives
**Rationale**: Offers comprehensive, accessible components with consistent design system and Tailwind integration

**Problem**: Japanese business email generation with cultural context
**Solution**: OpenAI GPT-4o with carefully crafted prompts and industry-specific parameters
**Rationale**: Latest model provides superior Japanese language capabilities and business context understanding

**Problem**: State management between multiple form components
**Solution**: React state lifting and TanStack Query for server state
**Rationale**: Keeps client state simple while providing robust server state caching and synchronization