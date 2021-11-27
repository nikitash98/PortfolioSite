from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template('index.html')

@app.route("/experiences")

def experiences():
    return "<h1> experiences</h1>"