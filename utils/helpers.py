import os
import stringcase
from pathlib import Path
from flask import redirect, session
from functools import wraps

def usd(value):
    return f"${value:,.2f}"
  
def load_svg(filename):
  svg_path = os.path.join('static/images', filename)
  with open(svg_path, 'r') as svg_file:
    svg_content = svg_file.read()
  return svg_content  

def get_project_root() -> Path:
  return Path(__file__).parent.parent
  
def login_required(f):                                                                                                               
  """                                                                                                                              
  Decorate routes to require login.                                                                                                
                                                                                                                                  
  https://flask.palletsprojects.com/en/latest/patterns/viewdecorators/                                                             
  """                                                                                                                              
                                                                                                                                  
  @wraps(f)                                                                                                                        
  def decorated_function(*args, **kwargs):                                                                                         
    if session.get("user") is None:                                                                                           
      return redirect("/auth/login")                                                                                                
    return f(*args, **kwargs)                                                                                                    
                                                                                                                                  
  return decorated_function

def handle_errors(errors):
  error_messages = []
  for error in errors:
    error_field = error.schema_path[0]
    error_rule = error.schema_path[1]
    error_messages.append(get_custom_error_message(error_rule, error_field, error.constraint))

  return error_messages

def get_custom_error_message(rule, field, constraint = None):
  custom_messages = {
    'required': f'{stringcase.sentencecase(field)} - This field is required.',
    'minlength': f'{stringcase.sentencecase(field)} - Field length must be at least {constraint} characters.',
    'max_length': f'{stringcase.sentencecase(field)} - Field length cannot exceed {constraint} characters.',
    'regex': f'{stringcase.sentencecase(field)} - Invalid field format.',
    'empty': f'{stringcase.sentencecase(field)} - Field cannot be empty.'
  }

  if rule in custom_messages:
    return custom_messages[rule]

  return rule
