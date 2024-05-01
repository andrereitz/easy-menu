import os
import sqlite3
from flask import g
from .helpers import get_project_root

class DictConnection(sqlite3.Connection):
  def __init__(self, *args, **kwargs):
    kwargs['detect_types'] = sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES
    super().__init__(*args, **kwargs)
    self.row_factory = sqlite3.Row
    
def get_db():
  path = f"{get_project_root()}/data/default.db"
  
  if not os.path.exists(path):
    conn = sqlite3.connect(path, factory=DictConnection)
    initialization_query = '''
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
      );

      CREATE TABLE medias (
          id INTEGER PRIMARY KEY ASC,
          url TEXT UNIQUE,
          alt TEXT,
          user INTEGER,

          FOREIGN KEY (user) REFERENCES id (users)
      );
    '''
    
    conn.executescript(initialization_query)
    conn.commit()
    
    return conn
  
  return sqlite3.connect(path, factory=DictConnection)