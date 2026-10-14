from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Student System backend is running!"