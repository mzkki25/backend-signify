# Backend Signify

## Prerequisites
Before using this API, make sure you have **Node.js** and **npm** installed on your system.

- Node.js (v20 or newer)
- npm (v10 or newer)

## Installation

1. **Clone this repository** to your local machine:
    ```bash
    git clone https://github.com/mzkki25/backend-signify.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd backend-signify
    ```
3. **Install the necessary dependencies**:
    ```bash
    npm install
    ```

## Running the Application

To run the application locally, use the following command:
```bash
npm start
```

Project Structure
Here is the directory structure of this project:
```bash
backend-signify/
├── quiz-lessons-api-signify/
│   ├── src/
│   ├── tests/
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
├── handgesture/
│   ├── src/
│   ├── models/
│   ├── controllers/
│   ├── utils/
│   ├── tests/
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
└── README.md
```


Quiz Lessons API
Prerequisites
Before using this API, make sure you have Node.js and npm installed on your system.

Node.js (v20 or newer)
npm (v10 or newer)

## Installation

Clone this repository to your local machine:
```bash
git clone https://github.com/mzkki25/quiz-lessons-api-signify.git
```

Hand Gesture Recognition
Prerequisites
Before using this part of the project, make sure you have Python and necessary libraries installed on your system.

Python (v3.8 or newer)
Required Python libraries (specified in requirements.txt)

Installation
Navigate to the handgesture directory:

```bash
cd handgesture
```
## Install the necessary Python dependencies:
```bash
pip install -r requirements.txt
```

## Running the Hand Gesture Application
To run the hand gesture application locally, use the following command:
```bash
python src/main.py
API Endpoints
```
```bash
Auth
POST /auth/register - Register a new user
POST /auth/login - User login
```

```bash
User
GET /users - Get a list of all users
GET /users/:id - Get user details by ID
```
```bash
Quiz
GET /quizzes - Get a list of all quizzes
POST /quizzes - Add a new quiz
GET /quizzes/:id - Get quiz details by ID
PUT /quizzes/:id - Update a quiz by ID
DELETE /quizzes/:id - Delete a quiz by ID
```
