from flask import Flask, render_template, send_from_directory, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/view')
def view():
    return render_template('view.html')

@app.route('/course/<course_id>')
def course_detail(course_id):
    return render_template('course.html', course_id=course_id)

@app.route('/courses/<path:filename>')
def course_files(filename):
    base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'courses')
    return send_from_directory(base_dir, filename)

def run(port, devmode=False):
    if devmode:
        app.run(debug=True, port=port)
    else:
        app.run(host='0.0.0.0', port=port)

if __name__ == "__main__":
    run(8998)
