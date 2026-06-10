# College Discovery Platform (Backend Service)

A production-grade, highly performant backend API engine for a college discovery, comparison, and admission predictor platform. Built using Node.js, Express, TypeScript, and PostgreSQL.

---

## 🛠️ Tech Stack

* **Language & Runtime:** Node.js, TypeScript (v5+)
* **Framework:** Express.js (Fast, un-opinionated routing)
* **Database ORM:** Prisma Client & Migrator
* **Database:** PostgreSQL (Neon Serverless)
* **API Documentation:** Swagger UI (`swagger-ui-express`)
* **Validation:** Zod (Type-safe runtime schema validation)

---

## 🏗️ Architecture Flow

```mermaid
graph TD
    Client[Client Request] --> Docs[Swagger UI /api/docs]
    Client --> GlobalMiddleware[CORS & Express JSON parser]
    GlobalMiddleware --> Router[Express Router]
    
    Router --> AuthRoute[Auth Route]
    Router --> CollegeRoute[Colleges Route]
    Router --> PredictorRoute[Predictor Route]
    
    AuthRoute --> ZodAuth[Zod Validation Schema]
    ZodAuth --> JWT[Auth Middleware / JWT Verify]
    JWT --> AuthController[Auth Controller]
    
    CollegeRoute --> CollegeController[College Controller]
    PredictorRoute --> ZodPredictor[Zod Validation Schema]
    ZodPredictor --> PredictorController[Predictor Controller]
    
    AuthController --> Prisma[Prisma ORM]
    CollegeController --> Prisma
    PredictorController --> Prisma
    
    Prisma --> DB[(PostgreSQL Database)]
```

---

## 📂 Project Structure

```text
backend/
├── prisma/
│   ├── schema.prisma       # Database schema models and relations
│   └── seed.ts             # Seeding script for mock dataset
├── src/
│   ├── config/
│   │   └── swagger.ts      # Swagger UI OpenAPI configuration
│   ├── controllers/        # Express handlers (Business logic)
│   ├── middleware/         # Auth, Zod Validation, Global Error Handling
│   ├── routes/             # API Endpoints matching track features
│   ├── validators/         # Zod schemas definitions
│   ├── app.ts              # Express initialization
│   └── server.ts           # Server runner and listener
├── Dockerfile              # Production multi-stage build configuration
├── .dockerignore           # Excludes local node_modules & env secrets
├── package.json
└── tsconfig.json
```

---

## 🛢️ Database Modeling (`schema.prisma`)

The system utilizes a relational PostgreSQL schema containing 6 models:

1. **`User`**: Manages signup records (`name`, `email`, hashed `password`).
2. **`College`**: The primary entity storing information (`name`, `location`, `fees`, `rating`).
3. **`Course`**: Associated with a college via a one-to-many relationship (`collegeId`).
4. **`Review`**: Enables feedback commentary and rating associated with a college.
5. **`SavedCollege`**: A junction table facilitating bookmarking (many-to-many relationship). Includes a compound unique constraint on `[userId, collegeId]` to prevent duplicates.
6. **`PredictorCutoff`**: Holds historical data for admission prediction criteria (`examName`, `category`, `cutoffRank`, `courseName`).

---

## 🚀 Key Features & Endpoints

### 1. College Listing + Search (`GET /api/colleges`)
* **Features:** Search by name/location, filters (`location`, `rating`, `minFees`, `maxFees`), and pagination (`page`, `limit`).
* **Implementation:** Performs a dynamic query builder query. Search performs case-insensitive containment lookup.

### 2. College Detail View (`GET /api/colleges/:id`)
* **Features:** Retrieves a single college record, automatically including nested `courses` and `reviews`.

### 3. Admission & Seat Predictor (`POST /api/predictor`)
* **Features:** Compares user exam metrics to historically recorded ranks to recommend matching colleges.
* **Logic:** Finds cutoff criteria matching target `examName` and `category` where `cutoffRank >= userRank` (higher or equal ranks qualify).

### 4. Side-by-Side Comparison (`POST /api/compare`)
* **Features:** Fetches full specifications for an array of input `collegeIds` to enable side-by-side frontend comparisons.

### 5. Bookmark Management (`/api/saved`)
* **Features:** Secure endpoints to save, retrieve, and delete saved colleges. Enforces request-scoping through JWTs.

---

## 🛡️ Robust Security & Validation

### Runtime Validation Layer (Zod)
We check requests using schemas like:
```typescript
export const predictorSchema = z.object({
  examName: z.string().min(1),
  category: z.string().min(1),
  rank: z.number().positive()
});
```
This is evaluated via a custom `validate` middleware. If a client sends malformed payloads, they receive a detailed JSON error response containing validation messages, keeping controllers clean and error-free.

### Session Authentication (JWT + Bcrypt)
* Sensitive actions are wrapped with a `protect` middleware parsing the authorization headers `Bearer <token>`.
* Passwords are encrypted with salt hashing via `bcrypt` (10 rounds) before hitting the user records database.

---

## 🐳 Running with Docker

This application contains a **multi-stage production-grade `Dockerfile`** to minimize image size and lock runtime node versions.

### 1. Build the Docker Image
```bash
docker build -t college-backend .
```

### 2. Run the Container
Utilize your local `.env` configuration file to seamlessly pass connection variables:
```bash
docker run -p 5000:5000 --env-file .env college-backend
```
* API base URL: `http://localhost:5000`
* Swagger Interactive Docs: `http://localhost:5000/api/docs`

---

## ⚙️ Local Installation & Setup (Without Docker)

### Prerequisites
* Node.js (v18 or higher)
* PostgreSQL Database URL

### Steps
1. **Clone and Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Setup environment variables:**
   Create a `.env` file in the `backend/` directory:
   ```env
   DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
   PORT=5000
   JWT_SECRET="your_jwt_signing_key_here"
   ```

3. **Generate Prisma Client and Run Migrations:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Seed Mock Data:**
   ```bash
   npm run seed
   ```

5. **Start Development Server:**
   ```bash
   npm run dev
   ```
   * Server runs at: `http://localhost:5000`
   * Interactive API docs: `http://localhost:5000/api/docs`
