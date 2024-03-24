import sqlite3
from flask import g
from .helpers import get_project_root

class DictConnection(sqlite3.Connection):
  def __init__(self, *args, **kwargs):
    kwargs['detect_types'] = sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES
    super().__init__(*args, **kwargs)
    self.row_factory = sqlite3.Row
    
def get_db():
  return sqlite3.connect(f"{get_project_root()}/data/default.db", factory=DictConnection)