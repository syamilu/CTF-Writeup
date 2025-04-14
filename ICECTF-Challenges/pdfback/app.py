from flask import Flask, render_template, request, send_file
import os
from weasyprint import HTML
import uuid
from jinja2 import Template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    feedback = request.form.get("feedback", "")
    return render_template("preview.html", feedback=feedback)


@app.route("/generate_pdf", methods=["POST"])
def generate_pdf():
    feedback = request.form.get("feedback", "")
    template = Template(feedback)
    html = template.render()
    
    filename = f"/tmp/{uuid.uuid4()}.pdf"
    HTML(string=html).write_pdf(filename)

    return send_file(filename, mimetype='application/pdf', as_attachment=True, download_name='feedback.pdf')



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3004)
