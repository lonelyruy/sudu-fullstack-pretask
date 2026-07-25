# 📂 Note Manager - Full Stack File Management System

A full-stack, responsive note-taking application built with **Vue 3**, **Spring Boot**, and **MySQL**. This project allows users to seamlessly create, read, update, delete, and download text-based notes with a clean, modern Tailwind CSS interface.

---

## 🌟 Live Demo

* **Frontend (Vercel):** https://sudu-fullstack-pretask.vercel.app
* **Backend API (Render):** https://notes-backend-oa2b.onrender.com/api/notes

> ⚠️ **Note on Initial Load:** Render free instance tier services sleep after 15 minutes of inactivity. Please allow 30–40 seconds for the backend to wake up on your first request.

---

## 🛠️ Tech Stack

* **Frontend:** Vue 3 (Composition API / `<script setup>`), Vite, Axios, Tailwind CSS
* **Backend:** Java (Spring Boot, Spring Data JPA)
* **Database:** Aiven Cloud MySQL
* **Deployment:** Vercel (Frontend) & Render (Backend)

---

## ⚙️ Features

* ✍️ **Create Notes:** Add new notes with titles and content.
* 📋 **View Notes:** Responsive grid layout displaying all notes with real-time text searching.
* 🔄 **Update Notes:** Edit existing note titles and content inside a smooth modal overlay.
* 🗑️ **Delete Notes:** Remove notes with a browser confirmation prompt.
* ⬇️ **Download Notes:** Export notes directly to your local computer as standard `.txt` files.
* 🎨 **Modern UI:** Styled using Tailwind CSS with interactive hover effects and modal dialogs.

---

## 🔌 API Endpoints

| Method   | Endpoint          | Description                     |
| :------- | :---------------- | :------------------------------ |
| `GET`    | `/api/notes`       | Fetch all notes from MySQL database |
| `POST`   | `/api/notes`       | Create a new note                |
| `PUT`    | `/api/notes/{id}`  | Update an existing note by ID     |
| `DELETE` | `/api/notes/{id}`  | Delete a note by ID               |

---

## 🚀 Local Setup Instructions

Follow these steps to run the frontend and backend locally on your machine.

### Prerequisites

* **Node.js** (v18+ recommended)
* **Java Development Kit (JDK 17+)**
* **Maven** (optional, wrapper included)

---

### 1. Backend Setup (Spring Boot)

1. Clone the repository and navigate to the root directory:

   ```bash
   git clone https://github.com/lonelyruy/sudu-fullstack-pretask.git
   cd sudu-fullstack-pretask
   ```

2. Configure database credentials:

   Open `src/main/resources/application.properties` and verify your MySQL configuration:

   ```properties
   spring.datasource.url=jdbc:mysql://YOUR_DB_HOST:PORT/YOUR_DB_NAME
   spring.datasource.username=YOUR_USER
   spring.datasource.password=YOUR_PASSWORD
   spring.jpa.hibernate.ddl-auto=update
   ```

3. Run the Spring Boot application:

   * On Windows: `mvnw.cmd spring-boot:run`
   * On macOS/Linux: `./mvnw spring-boot:run`

   The backend server will start at `http://localhost:8080`.

---

### 2. Frontend Setup (Vue 3 + Vite)

1. Open a new terminal tab and ensure you are in the project folder.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory (optional for local testing):

   ```
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. Start the Vite development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

---

## 🤖 AI & Development Process

During the development of this project, AI tools (such as ChatGPT/Gemini) were used to streamline development, debug production issues, and optimize UI layouts.

### Example 1: Frontend Modal & Reactive State

* **Prompt Given:** "Generate a Vue 3 `<script setup>` template with Tailwind CSS for a note-taking dashboard featuring search filtering, modal editing, and Axios API integrations."
* **AI Output:** Provided boilerplate code featuring standard Vue reactive variables, modal toggles, and computed properties for text searching.
* **Modification & Verification:** Adjusted the template to use local storage text exports, refined the Tailwind CSS layout colors to modern slate and emerald tones, and mapped custom payloads to fit the Spring Boot REST contract.
* **Reasoning:** Simplified the UI layout while introducing a direct `.txt` file download helper to make card interactions more useful for users.

### Example 2: CORS Configuration & Production Debugging

* **Prompt Given:** "How do I resolve CORS issues in Spring Boot when sending requests from a hosted Vercel frontend?"
* **AI Output:** Recommended adding `@CrossOrigin(origins = "*")` to the `@RestController` class level or configuring a global `WebMvcConfigurer` bean.
* **Modification & Verification:** Added `@CrossOrigin(origins = "*")` directly to `NoteController.java` and pushed changes to trigger Render's auto-deployment pipeline.
* **Reasoning:** Enabled cross-origin HTTP requests between Vercel (`https://sudu-fullstack-pretask.vercel.app`) and Render (`https://notes-backend-oa2b.onrender.com`).

---

## 📄 License

This project was built for the SUDU.AI Full-Stack Intern Pre-Task.
