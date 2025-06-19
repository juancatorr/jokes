# Jokes App

A modern application to explore and enjoy jokes from different categories, built with Nuxt 3, Vue 3, TypeScript, and TailwindCSS.

**Live Demo:** [https://jokes-git-main-juancas-projects.vercel.app/](https://jokes-git-main-juancas-projects.vercel.app/)

## Features

- **Joke Exploration**: Browse through a collection of jokes from different categories
- **Type Filtering**: Filter jokes by categories (general, programming, knock-knock)
- **Sorting**: Sort jokes by ID, text, or type
- **Infinite Loading**: Infinite scroll implementation to automatically load more jokes
- **Joke Details**: Detailed view for each joke
- **Responsive Design**: Interface adaptable to different screen sizes
- **Toast Notifications**: Notification system for errors and messages

## Technologies

- **Frontend**: Vue 3 + Nuxt 3
- **Language**: TypeScript
- **Styling**: TailwindCSS + Nuxt UI
- **State Management**: Vue Query (TanStack Query)
- **HTTP Client**: Axios
- **Icons**: Nuxt Icon
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky, lint-staged

## Requirements

- **Node.js**: v18.0.0 or higher (v20.x recommended)
- **pnpm**: v8.0.0 or higher

## Project Structure

```
/
├── assets/            # Static resources (CSS, images)
├── components/        # Reusable Vue components
│   ├── AppButton.vue  # Custom button
│   ├── AppChip.vue    # Chip for labels
│   ├── AppToast.vue   # Notification system
│   ├── JokeCard.vue   # Joke card
│   ├── JokeDetail.vue # Detailed joke view
│   └── ...
├── composables/       # Vue composables for reusable logic
│   ├── useApiQuery.ts # Wrapper for API queries
│   ├── useJoke.ts     # Logic for individual joke
│   ├── useJokes.ts    # Logic for joke collections
│   └── ...
├── layouts/           # Application layouts
├── middleware/        # Nuxt middleware
├── pages/             # Application pages
├── plugins/           # Nuxt plugins (axios, etc.)
├── public/            # Public files
├── server/            # Server code (API)
└── types/             # TypeScript type definitions
```

## Main Components

### InfiniteJokeGrid

Implements a joke grid with infinite loading using scroll detection. When the user reaches the end of the list, more jokes are automatically loaded.

### JokeDetail

Displays detailed information about a joke, including its setup, punchline, and type. Handles loading and error states.

### JokeCard

Card that displays a joke summary, used in list views.

## Composables

### useJoke

Handles the logic for fetching and displaying an individual joke by ID.

### useJokes

Manages collections of jokes, including filtering and sorting.

### useRandomJokes

Implements infinite loading functionality for random jokes.

### useToast

Notification system for displaying messages to the user.

## Configuration

Create a `.env` file based on `.env.example` with the following configuration:

```
API_BASE_URL=https://your-jokes-api.com
```

## Development - Run local environment

```bash

pnpm install & pnpm dev
```

The application will be available at `http://localhost:3000`

## Development Decisions

This project was built with careful consideration of modern web development best practices:

### Architecture & Performance

- **Nuxt.js**: Chosen for its powerful Vue 3 integration, file-based routing, and built-in optimizations
- **Server-Side Rendering (SSR)**: Implemented on the joke detail page (`[id].vue`) for improved SEO and initial load performance
- **Vue Query**: Used for efficient server state management and data fetching with built-in caching
- **Composables Pattern**: Implemented for better code organization and reusability of logic

### Developer Experience

- **TypeScript**: Strict typing for improved code quality and developer experience
- **ESLint & Prettier**: Configured for consistent code style and early error detection
- **pnpm**: Selected over npm for faster installation times and efficient disk space usage
- **Husky & lint-staged**: Set up for pre-commit code quality checks

### UI & Styling

- **TailwindCSS**: Chosen for its utility-first approach, enabling rapid UI development with minimal CSS
- **Nuxt UI**: Provides accessible, customizable components that integrate well with TailwindCSS
- **Component-Based Architecture**: Modular design for better maintainability and reusability

### Deployment

- **Vercel + Git**: Continuous deployment pipeline for seamless updates
- **Environment Variables**: Properly configured for different environments

### Optimization

- **Minimal External Dependencies**: Carefully selected libraries to keep bundle size small

- **Infinite Scroll**: Implemented with optimized scroll detection for better performance

## Technical Concepts - Questions

### Closures

**What is a closure?**
A closure is a function that remembers and can access variables from its outer lexical scope, even when the function is executed outside that scope. In other words, it's a function that "closes over" or "captures" variables from its environment, maintaining a reference to them even after the outer function has finished executing.

**Example in the code:**
In `InfiniteJokeGrid.vue`, the `checkIfElementIsVisible` function is a closure because:

```javascript
const checkIfElementIsVisible = () => {
  if (isCheckingScroll.value || !loadMoreTriggerRef.value) return;

  isCheckingScroll.value = true;

  const element = loadMoreTriggerRef.value;
  const rect = element.getBoundingClientRect();
  const isVisible =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth;

  if (isVisible && !isFetchingNextPage.value) {
    fetchNextPage().catch((error) => {
      showToast({
        message: `Error loading more jokes: ${error.message}`,
        type: 'error',
      });
    });
  }

  isCheckingScroll.value = false;
};

// Setting up event listeners
onMounted(() => {
  window.addEventListener('scroll', checkIfElementIsVisible);
  window.addEventListener('resize', checkIfElementIsVisible);
});
```

This function captures variables from its outer scope (`isCheckingScroll`, `loadMoreTriggerRef`, etc.) and maintains access to them even when executed later in response to scroll or resize events.

### Side Effects

**What are side effects?**
Side effects occur when a function modifies something outside its local scope, such as:

- Modifying global variables or variables from the outer scope
- Modifying properties of objects passed as parameters
- Performing I/O operations (API calls, DOM manipulation, etc.)
- Throwing exceptions
- Registering or removing event listeners

**Examples in the code:**

1. **API calls in composables:**

```javascript
// In useRandomJokes
const result = useInfiniteQuery({
  queryFn: async () => {
    const { data } = await api.get<Joke[]>(`/jokes/random/${initialLimit}`);
    return data;
  },
});
```

2. **DOM manipulation in InfiniteJokeGrid.vue:**

```javascript
const element = loadMoreTriggerRef.value;
const rect = element.getBoundingClientRect();
```

3. **Modifying reactive state:**

```javascript
isCheckingScroll.value = true;
// ...
isCheckingScroll.value = false;
```

**Are they expected? Can they be avoided?**
These side effects are expected and part of the intentional design. While some side effects are unavoidable in an interactive web application, the code follows good practices to minimize unwanted side effects:

- Uses composables to encapsulate logic with side effects
- Properly cleans up resources (event listeners) in `onUnmounted`
- Uses Vue Query to manage server state, reducing the need for manual side effects
- Implements flags like `isCheckingScroll` to prevent repeated or concurrent side effects
