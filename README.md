# ShopiFy

ShopiFy is a modern, full-stack eCommerce web application built with a focus on clean, scalable code and an intuitive user experience. The app allows users to browse products, add them to their cart, and securely authenticate with the platform. The backend is built using NestJS, Prisma, and PostgreSQL, while the frontend utilizes React, TypeScript, Redux, and TailwindCSS for a responsive and interactive user interface.

## Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript for improved developer experience and type safety.
- **Redux**: A predictable state container for managing the global state, used for cart management in this project.
- **TailwindCSS**: A utility-first CSS framework for styling the app.

### Backend

- **NestJS**: A progressive Node.js framework for building efficient, scalable server-side applications.
- **Prisma**: A modern ORM for working with databases in Node.js and TypeScript applications.
- **PostgreSQL**: A powerful, open-source relational database system.

## Features

- **User Authentication**: Secure login and registration with JWT-based authentication.
- **Product Management**: Display and manage products with various functionalities such as product details, images, and availability.
- **Cart Management**: Manage cart state using Redux, including adding/removing products and checking out.
- **Responsive Design**: Fully responsive UI optimized for both desktop and mobile users.

## Installation

### Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL (local or remote database)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ShopiFy.git
   cd ShopiFy
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Set up your PostgreSQL database and configure `.env`:

   - Create a PostgreSQL database.
   - Add the following environment variables in the `.env` file:
     ```
     DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/yourdatabase"
     JWT_SECRET="your-secret-key"
     ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the backend server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Configure API base URL in the frontend:

   - Create a `.env` file in the `frontend` folder and add:
     ```
     REACT_APP_API_URL=http://localhost:3001
     ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Usage

- Visit the frontend at `http://localhost:3000`.
- Use the authentication system to register and log in.
- Browse products, add them to your cart, and proceed with checkout.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes.
4. Commit and push your changes.
5. Open a pull request.

---

Thank you for checking out ShopiFy! 🎉
