# Project Documentation

## Student: Wenjing Huang

## Educator: Jack Donaldson

---

## 1. Overview

### Project Name
**Online Movie Store CLI Application**

### Description
This project is a command-line interface (CLI) application that allows users to browse, search, and manage movies as well as manage user accounts while providing different functionalities for regular users and admin users. The system enables user authentication, account creation, logging in, and updates such as changing user details and passwords.

Built with **Node.js** (Inquirer.js for CLI interactions), **Express.js** (backend API), and **MySQL** (database storage), the application demonstrates how frontend and backend components communicate, handle user authentication, and perform CRUD operations on movie and user data.

### Technologies Used
- **Frontend:** TypeScript, Node.js, Inquirer.js
- **Backend:** TypeScript, Node.js, Express, MySQL
- **Database:** MySQL

---

## 2. Installation and Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (version 22.14.0)
- **MySQL**
- Dependencies: `express`, `mysql2`, `body-parser`, `cors`

### Step 1: Clone the Repository
```sh
git clone https://github.com/WenjingHuang-Portfolio/OnlineMovieStoreCLIApp.git
cd WenjingHuang-Project
```

### Step 2: Install Dependencies
```sh
npm install
```

### Step 3: Configure Database
1. Create a MySQL database named **“Online Movie Store”**.
2. Import the provided SQL file.

### Step 4: Run the Application
Open two terminals on your computer or VS Code.

#### Start Backend Server
```sh
cd backend
tsc index.ts
node index.js
```

#### Start Frontend (CLI)
```sh
cd frontend
tsc index.ts
node index.js
```

---

## 3. Code Structure

The main code files are located in:
- **`/backend/index.ts`** - Handles API requests, database communication, user authentication, and data updates.
- **`/frontend/index.ts`** - Handles user interaction and CLI-based inputs.

---

## 4. Features & Functionalities

### User Authentication
- Login and Logout
- Signup
- Role-based access (Admin/User)

### Movie Management
- Browse, Search (Regular user)
- Update Movies, Add New Movies, Delete Movies (Admin only)

### User Management
- Update password (Admin/User)
- Update user first name and last name, Delete users (Admin only)

---

## 5. Additional Notes

### 1. Viewing Detailed Movie Information
To allow users to view detailed information about a selected movie after browsing all available movies, a two-step process is implemented using `fetch()`.

**Step 1:** Fetch all movie data from the backend, return it in JSON format, and display the movie titles.

**Step 2:** When a user selects a specific movie, a second `fetch()` request is sent to retrieve the details of that movie.

This approach ensures efficient browsing and selection while minimizing redundant data transfers.

### 2. Restricting Password Updates to the Logged-in User
Only the account owner is allowed to update their password.

A global variable stores the `userID` on the frontend:
```ts
let currentUserID: string | null = null;
```
When a user logs in, the `userID` is retrieved and stored:
```ts
currentUserID = responseData.user.id;
```
Then, update requests use this `userID`:
```ts
const requestUpdatePassword = await fetch(`http://localhost:4000/users/${currentUserID}/updatepassword`, {...});
```
This prevents unauthorized password modifications.

### 3. Admin-Specific User Data Updates
Admins can update a user's **First Name** or **Last Name**.

1. The admin selects a **User ID**.
2. The system prompts the admin to choose which property to update.
3. An API request is sent to either of these backend routes:
   - `/users/:id/updatefirstname`
   - `/users/:id/updatelastname`

Handled on the frontend with an `if-else` statement:
```ts
if (updateUser.property === 'First Name') {
    // Go to update First Name
} else {
    // Go to update Last Name
}
```

### 4. Role-Based User Interfaces
The system differentiates user roles (admin and regular user) and customizes the interface accordingly.

When a user logs in, the backend responds with their role:
```ts
if (user.role === 'admin') {
    // Admin interface
} else {
    // Regular user interface
}
```
This ensures access control based on user permissions.

### Future Improvements
1. **Watchlist Feature** - Implementing a "watchlist" would allow users to save movies for later viewing via `POST` requests and MySQL `INSERT INTO` queries.
2. **Password Encryption** - Encrypt passwords using `bcrypt` to enhance security.

These enhancements would improve functionality and security, making the system more robust.

---

## 6. ERD (Entity-Relationship Diagram)

This project contains two entities: **users** and **movies**. Currently, these entities do not have a direct relationship and exist separately in the database.

The following diagram represents their structure:

```plaintext
+------------+      +------------+
|   Users    |      |   Movies   |
|------------|      |------------|
| user_id    |      | movie_id   |
| firstName  |      | title      |
| lastName   |      | country    |
| email      |      | rating     |
| password   |      | genre      |
| role       |      | description |
+------------+      +------------+
