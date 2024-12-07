# Project Setup
## Backend Setup
* Note: This project was made using python version `3.13.0`
1. Create a python virtual environment with: `python3 -m venv venv`
2. Activate the virtual environment. With mac the command is `source venv/bin/activate` for Windows using cmd.exe it should be `venv\Scripts\activate.bat`
3. Install the project requirements using `pip install -r requirements.txt`
4. Change directory to the backend directory using `cd ./backend`
5. Run the Django project using `python3 manage.py runserver`
6. Ensure that the server is running on `http://127.0.0.1:8000`
## Frontend Setup
1. Return to the home directory
2. From the home directory navigate to the frontend directory `cd ./frontend`
3. Run the command `npm install` to get the frontend dependencies
4. Create a .env file within the frontend directory
5. In the .env file paste the line `REACT_APP_API_URL='http://127.0.0.1:8000'`
6. Run the frontend using the command `npm start`
7. The project should not be working