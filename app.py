from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/view')
def view():
    return render_template('view.html')

def run(port, devmode=False):
    if devmode:
        app.run(debug=True, port=port)
    else:
        app.run(host='0.0.0.0', port=port)

if __name__ == "__main__":
    run(8998)
