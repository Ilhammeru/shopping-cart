# Shopping Cart Application

This application is an application to qualify as a front-end developer.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.x or higher) - [Download Node.js](https://nodejs.org/)
- **npm** or **yarn** or **pnpm** (package manager)
- **Git** - [Download Git](https://git-scm.com/)

To verify your installations, run:

```bash
node --version
npm --version
git --version
```

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url> shopping-cart
cd shopping-cart
```

### 2. Install Dependencies

Choose one of the following package managers:

#### Using npm:
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory of the project:

```bash
cp .env.example .env
```

Or create it manually with the following content:

```env
# API Configuration
NUXT_API_BASE_URL=https://your-api-url.com/api

# Public Configuration
NUXT_PUBLIC_BASE_URL=http://localhost:3000

# Node Environment
NUXT_NODE_ENV=development
```

**Environment Variables Explanation:**

- `NUXT_API_BASE_URL`: The base URL of your backend API
- `NUXT_PUBLIC_BASE_URL`: The public URL of your application
- `NUXT_NODE_ENV`: The environment mode (development/production)

### 4. Font Files (Optional)

The application uses Helvetica Neue font family. Font files should be placed in:

```
public/fonts/
```

If you don't have the font files, the application will fall back to system fonts.

## Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at: `http://localhost:3000`

### Production Build

Build the application for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Generate Static Site

Generate a static version of the application:

```bash
npm run generate
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run generate` | Generate static site |
| `npm run postinstall` | Post-install setup |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |

## Project Structure

```
shopping-cart/
├── app/
│   ├── assets/          # Static assets (CSS, images)
│   │   ├── css/         # Global stylesheets
│   │   └── fonts/       # Font files
│   ├── components/      # Vue components
│   │   ├── category/    # Category components
│   │   ├── form/        # Form components
│   │   ├── global/      # Global components
│   │   └── product/     # Product components
│   ├── composables/     # Vue composables
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   └── useProduct.ts
│   ├── layouts/         # Layout components
│   │   ├── components/  # Layout sub-components
│   │   ├── auth.vue
│   │   ├── default.vue
│   │   └── fullscreen.vue
│   ├── pages/           # Application pages
│   │   ├── auth/        # Authentication pages
│   │   ├── cart/        # Cart pages
│   │   ├── product/     # Product pages
│   │   └── dashboard.vue
│   ├── plugins/         # Nuxt plugins
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── i18n/                # Internationalization
│   └── locales/         # Language files
├── public/              # Public static files
│   ├── fonts/           # Font files
│   └── robots.txt
├── server/              # Server-side code
│   ├── api/             # API endpoints
│   └── utils/           # Server utilities
├── .env                 # Environment variables
├── nuxt.config.ts       # Nuxt configuration
├── tailwind.config.ts   # Tailwind configuration
└── package.json         # Project dependencies
```

## Key Features Explained

### Dark Mode
- Automatically persists user preference in localStorage
- Syncs across all pages
- Smooth transitions between themes

### Shopping Cart
- Add/remove products
- Quantity management
- Real-time cart total calculation
- Persistent cart state

### Multi-language
- Switch between English and Indonesian
- Persists language preference
- i18n integration throughout the app

### Authentication
- Login and registration pages
- Token-based authentication
- HTTP-only cookies for security
- Protected routes

## API Integration

The application connects to an external API for:
- Product data
- User authentication
- Order management

Configure the API URL in your `.env` file:
```env
NUXT_API_BASE_URL=https://your-api-url.com/api
```

The app includes a proxy layer (`server/api/`) that:
- Handles API requests
- Manages authentication tokens
- Provides error handling

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
npm run dev -- --port 3001
```

## Walkthrough Videos
- [Part 1: Code walkthrough and demo](https://www.loom.com/share/fc97b06309cb4614ab26b3210abaa490)
- [Part 2: Code walkthrough and demo](https://www.loom.com/share/0676b40759574bb683f18387ad932dcf)
- [Part 3: Code walkthrough and demo](https://www.loom.com/share/0b3131f9a69749b3a13b2302a9c336a2)


## Evaluation answer
1. Have you ever built a project from scratch (personal or professional) using the same tech stack as the requirements above?
    - Yes, I have built several projects from scratch using Nuxt.js, TypeScript, Tailwind CSS.
2. Have you ever added new features to an existing project (code that was not originally built by you)? If so, how did you approach understanding the existing project structure to ensure your changes didn't break other functionalities?
    - Yes, I have experience adding new features to existing projects. My approach involves thoroughly reviewing the existing codebase, understanding current architectures, talk to other developers or team, trace it from entry points to the relevant modules or function.
3. Did you use AI assistance to complete this task?
    - Yes, I used AI assistance to help with code suggestions. For the first time and setup configuration i use my own code, all composable function, all core function build by myself at the first time. So code suggestions and AI assistant will have more knowledge like i want it to be.
4. What is the estimated percentage of AI usage in this project, and which parts were handled by AI? (e.g., Auto-complete/Copilot, Code Generation for specific functions, reference searching, or Full AI/No-code development)
    - I estimate around 20-30% of code was assisted by AI becuase i need to build the core function just what i want. so AI can follow my style and need. By the way im using Github Copilot
5. How confident are you in your technical skills if you had to perform a similar task without any AI assistance? Please explain why.
    - I am quite confident in my skills to perform similar tasks, because core function and setup i do it manually. AI assistant just to make my code faster, like the AI suggesstion 
6. Did you implement Technical SEO in this project? If yes, what specific measures did you take? (If already explained in the video, a brief summary is sufficient).
    - Yes, I implemented basic technical SEO by adding meta tags in every page using useHead from Nuxt. This includes title, description to improve search engine visibility and social media sharing.
7. As a developer, what concrete steps can you take to improve the SEO performance of a web application?
    - To improve SEO performance, I can take steps such as optimizing page load speed, ensure page responsibility in every device and else. Actually i need to learn more about this SEO. Because i just have a basic knowledge of SEO.