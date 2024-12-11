# Backend Signify

## Installation
**Clone this repository** to your local machine:
```bash
git clone https://github.com/mzkki25/backend-signify.git
```

## Project Structure
Here is the directory structure of this project:
```bash
backend-signify/
├── quiz-lessons-api-signify/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── models/
│   ├── routes/
│   ├── app.yaml
│   ├── server.js
│   ├── package.json
│   └── README.md
├── hand-gesture-api-signify/
│   ├── main.py
│   ├── predict.py
│   ├── requirements.txt
│   ├── encode.json
│   ├── Dockerfile
│   ├── test.ipynb
│   └── README.md
└── README.md
```

# Quiz Lessons API Signify

## Prerequisites

Before using this API, make sure you have **Node.js** and **npm** installed on your system.

- Node.js (v20 or newer) 
- npm (v10 or newer) 

1. **Navigate to the project directory**:
    ```bash
    cd backend-signify/quiz-lessons-api-signify
    ```
2. **Install the necessary dependencies**:
    ```bash
    npm install
    ```

## Running the Application

To run the application locally, use the following command:
```bash
npm start
```

## Running the Quiz Lessons Application
To run the quiz lessons application locally, use the following command:
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


# Hand Gesture API Signify 

## Prerequisites 

Before using this API, make sure you have **Python** and **pip** installed on your system.

- Python (v3.20 or newer)     
- pip (v24.2 or newer) 

1. **Navigate to the project directory**:
    ```bash
    cd backend-signify/hand-gesture-api-signify
    ```
2. **Install the necessary dependencies**:
    ```bash
    pip install -r requirements
    ```
3. **Create an .env file and fill .env with:**
    ```bash
    PORT=8000
    ENV=production
    CREDENTIALS_URL='{get json format credentials from gcp}'
    GEMINI_API_KEY='{generate api key from api and service in gcp}'
    ```

## Running the Application

To run the application locally, use the following command:
```bash
gunicorn main:app --reload
```

## Running the Hand Gesture Application
To run the quiz lesson application locally, create a test.ipynb file and run the following command in each cell:

### **For Predictions**

```bash
import requests

url = "http://127.0.0.1:8000/predict"
file_path = "apalah.jpg"

with open(file_path, "rb") as f:
    files = {"file": f}
    response = requests.post(url, files=files)

response.json()
```

### **For Autocorrect**

```bash
import requests

url = "http://127.0.0.1:8000/autocorrect"
message = "AKU ANAK SEKOLAR"

response = requests.post(url, params={"message": message})

response.json()
```