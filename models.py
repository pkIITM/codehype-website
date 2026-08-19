from extensions import db


class Tutorial(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200), nullable=False)

    slug = db.Column(db.String(200), unique=True, nullable=False)

    category = db.Column(db.String(100), nullable=False)

    description = db.Column(db.Text, nullable=False)

    youtube_url = db.Column(db.String(500), nullable=True)

    thumbnail = db.Column(db.String(500), nullable=True)

    published = db.Column(db.Boolean, default=False)

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    def __repr__(self):
        return f"<Tutorial {self.title}>"