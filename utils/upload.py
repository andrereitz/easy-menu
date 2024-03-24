import os
import datetime
import stringcase
from werkzeug.utils import secure_filename
from PIL import Image
import qrcode

from utils import get_project_root

ALLOWED_FILE_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
  return '.' in filename and \
    filename.rsplit('.', 1)[1].lower() in ALLOWED_FILE_EXTENSIONS
    
def upload_logo(file):
  if file.filename == '':
    raise ValueError('No file selected')
    
  if file and allowed_file(file.filename):
    filename = secure_filename(file.filename)
    path = os.path.join(f'{get_project_root()}/tmp', filename)
    file.save(os.path.join(path))
    
    image = Image.open(path)
    image.thumbnail((200, 80) , Image.LANCZOS)
    media_name =  f"logo-{stringcase.constcase(datetime.datetime.now())}-crop-{filename}"
    media_path = os.path.join(f'{get_project_root()}/static/media', media_name)
    image.save(media_path)
    os.remove(path)
    
    return media_name
  
def upload_item_image(file):
  if file.filename == '':
    raise ValueError('No file selected')
    
  if file and allowed_file(file.filename):
    filename = secure_filename(file.filename)
    path = os.path.join(f'{get_project_root()}/tmp', filename)
    file.save(os.path.join(path))
    
    image = Image.open(path)
    width, height = image.size
    ratio = round(height / width, 2)
    newheight = round(ratio * 200)
        
    resized = image.resize((200, newheight))
    media_name =  f"{stringcase.constcase(datetime.datetime.now())}-crop-{filename}"
    media_path = os.path.join(f'{get_project_root()}/static/media', media_name)
    resized.save(media_path)
    os.remove(path)
    
    return media_name
  
def generate_qr(user_id, business_url):
  url = os.path.join(f"{os.environ['PROJECT_URL']}/menu/", str(business_url))
  path = os.path.join(f'{get_project_root()}/static/qrcodes/', f"{str(user_id)}.png")
  img = qrcode.make(url)
  img.save(path)
  
def remove_qr(user_id):
  path = os.path.join(f'{get_project_root()}/static/qrcodes/', f"{str(user_id)}.png")
  try:
    os.remove(path)
    
    return True
  except:
    pass
  
  return False
