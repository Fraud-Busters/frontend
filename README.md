# Fraud Busters Frontend

This is the frontend application for the Fraud Busters project, built using Next.js, TypeScript, and Tailwind CSS. The purpose of this application is to provide a user interface for fraud detection, where users can upload CSV files to be analyzed by our machine learning model. The analysis results can be downloaded or previewed (showing the first 10 rows). Users can also view the real-time progress or status of the file analysis without the need for manual refresh. Additionally, users have the option to delete prediction results when they are no longer needed.

## Prerequisites

Before running this application, ensure that you have the following prerequisites installed:

- Node.js (minimum version 18)
- Backend application running

## Getting Started

To set up and run the Fraud Busters frontend, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/Fraud-Busters/frontend.git
   ```

2. Navigate to the project directory:

   ```
   cd frontend
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Set the following environment variable by creating a `.env.local` file in the project root directory:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
   ```

   Replace `http://localhost:3000/api/v1` with the actual URL of the backend API.

5. Start the development server:

   ```
   npm run dev
   ```

   The application will be accessible at `http://localhost:3000`.

## Technologies Used

- Next.js: A React framework for building server-side rendered and static web applications.
- TypeScript: A statically-typed superset of JavaScript that enhances developer productivity.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom user interfaces.

## Acknowledgments

We would like to acknowledge the following resources and libraries that have been instrumental in the development of this project:

- Next.js: [https://nextjs.org/](https://nextjs.org/)
- TypeScript: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- Tailwind CSS: [https://tailwindcss.com/](https://tailwindcss.com/)

Feel free to explore the documentation of these technologies for more information and guidance.
