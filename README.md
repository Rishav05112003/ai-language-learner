# LingoAI: AI Language Learner


LingoAI is an intelligent, personalized language learning platform designed to make mastering a new language interactive and effective. Built with Next.js, it leverages the power of Google's Gemini AI to offer a dynamic learning experience, from conversational practice to adaptive assessments.

## Features

-   **🤖 Interactive AI Tutor ("Mr. Lingo")**: Engage in real-time conversations with an AI assistant that provides corrections, explanations, and adapts to your proficiency level.
-   **📝 Adaptive Quizzes**: Test your knowledge with dynamically generated multiple-choice questions tailored to your chosen language. The quizzes increase in difficulty to match your progress.
-   **📊 Performance Dashboard**: Track your learning journey with a comprehensive dashboard. Monitor quiz scores, view performance trends over time, and gain AI-generated insights about the language you're studying.
-   **🚀 Personalized Onboarding**: Get started by setting your target language and native tongue. The platform uses this information to customize your learning path.
-   **🔐 Secure Authentication**: User accounts are securely managed using Clerk, providing a seamless and safe sign-in experience.

## Tech Stack

| Category           | Technology                                                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework**      | [Next.js](https://nextjs.org/) (with App Router)                                                                                                                                                                   |
| **AI**             | [Google Gemini](https://ai.google.dev/)                                                                                                                                                                            |
| **Database**       | [PostgreSQL](https://www.postgresql.org/)                                                                                                                                                                          |
| **ORM**            | [Prisma](https://www.prisma.io/)                                                                                                                                                                                   |
| **Authentication** | [Clerk](https://clerk.com/)                                                                                                                                                                                        |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)                                                                                                                                       |
| **Background Jobs**| [Inngest](https://www.inngest.com/)                                                                                                                                                                                 |
| **UI Components**  | [Radix UI](https://www.radix-ui.com/), [Recharts](https://recharts.org/), [Lucide React](https://lucide.dev/guide/packages/lucide-react)                                                                              |

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

-   Node.js (v20.11.0 or later)
-   npm (v10.9.1 or later)
-   A running PostgreSQL database instance.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rishav05112003/ai-language-learner.git
    cd ai-language-learner
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following variables.

    ```env
    # PostgreSQL Database URL
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

    # Clerk Authentication Keys (from your Clerk Dashboard)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=

    # Clerk Redirect URLs
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

    # Google Gemini API Key (from Google AI Studio)
    GOOGLE_API_KEY=
    ```

4.  **Apply database migrations:**
    This command will sync your Prisma schema with your database.
    ```bash
    npx prisma migrate dev
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

## Project Structure

The repository is organized to leverage Next.js App Router features and maintain a clean separation of concerns.

-   `app/`: Contains all routes and UI pages, organized into route groups like `(auth)` and `(main)`.
-   `actions/`: Server Actions for handling form submissions, database mutations, and AI logic securely on the server.
-   `api/`: API routes for the chatbot (`/api/gemini`), loading chat history (`/api/load-chat`), and handling Inngest background jobs.
-   `components/`: Shared React components, including custom components and `shadcn/ui` elements.
-   `lib/`: Core logic, utility functions, Prisma client instance (`prisma.js`), Zod schemas (`schema.js`), and Inngest client/functions.
-   `prisma/`: Database schema definition (`schema.prisma`) and migration files.
-   `data/`: Static data used across the application, such as language lists and FAQ content.
