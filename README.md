# Easy Menu

## About this project

Easy Menu is the final project of CS50X. To see a working version of the project check out: http://andrereitz.pythonanywhere.com/

## Running project

### Initial setup
Create a virtual environment with the desired python version `python3.12 -m venv .venv`  
Install dependecies `. .venv/bin/activate && pip install -r requirements.txt`  
Install node modules (For web components build) `npm install`

### Developing
The project is setted up to run in a Python virtual environment (venv).
Before running any command, activate python venv using ` . .venv/bin/activate `  
Init Flash ` flash run `

Alternatively you can run the npm script for the server `npm run dev:server`

### Compiling web components
To compile web components while developing just run `npm run dev:ts`  
To generate a production build run `npm run build` 

## Database Schema
```
CREATE TABLE users (
  id INTEGER PRIMARY KEY ASC,
  email TEXT UNIQUE NOT NULL,
  hash TEXT NOT NULL,
  business_name TEXT,
  business_url TEXT UNIQUE,
  business_color TEXT,
  business_logo TEXT
);

CREATE TABLE categories (
  id INTEGER PRIMARY KEY ASC,
  user INTEGER,
  title TEXT,
  
  FOREIGN KEY (user) REFERENCES id (users)
);

CREATE TABLE items (
  id INTEGER PRIMARY KEY ASC,
  category INTEGER,
  user INTEGER,
  media_id INTEGER,
  title TEXT,
  description TEXT,
  price REAL,

  FOREIGN KEY (user) REFERENCES id (users) 
  FOREIGN KEY (category) REFERENCES id (categories) 
  FOREIGN KEY (media_id) REFERENCES id (medias) 
)

CREATE TABLE medias (
    id INTEGER PRIMARY KEY ASC,
    url TEXT UNIQUE,
    alt TEXT,
    user INTEGER,

    FOREIGN KEY (user) REFERENCES id (users)
)
```
