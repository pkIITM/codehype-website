from flask import Flask, render_template,url_for,Response
import os

from extensions import db
from models import Tutorial


app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "sqlite:///" + os.path.join(basedir, "codehype.db")
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# Connect the SQLAlchemy instance from extensions.py
# to this Flask application
db.init_app(app)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/codehype")
def codehype():
    return render_template("codehype.html")


@app.route("/labs")
def labs():

    tutorials = Tutorial.query.filter_by(
        published=True
    ).order_by(
        Tutorial.created_at.desc()
    ).all()

    return render_template(
        "labs.html",
        tutorials=tutorials
    )


@app.route("/labs/<slug>")
def tutorial(slug):

    tutorial = Tutorial.query.filter_by(
        slug=slug,
        published=True
    ).first_or_404()

    return render_template(
        "tutorial.html",
        tutorial=tutorial
    )


@app.route("/projects")
def projects():
    return render_template("projects.html")
@app.route("/projects/hospital-management-system")
def hospital_management_system():
    return render_template("project_hms.html")
@app.route("/projects/trekking-management-system")
def trekking_management_system():
    return render_template("project_trekking.html")

@app.route("/sitemap.xml")
def sitemap():

    pages = [
        url_for("home", _external=True),
        url_for("about", _external=True),
        url_for("codehype", _external=True),
        url_for("labs", _external=True),
        url_for("projects", _external=True)
    ]

    sitemap_xml = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"""

    for page in pages:
        sitemap_xml += f"""    <url>
        <loc>{page}</loc>
    </url>
"""

    sitemap_xml += """</urlset>"""

    return Response(
        sitemap_xml,
        mimetype="application/xml"
    )

if __name__ == "__main__":

    with app.app_context():
        db.create_all()

    app.run(debug=True)