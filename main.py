
import nmap
import csv
import json
from datetime import datetime
from manuf import manuf  # For MAC vendor lookup
from flask import Flask, jsonify, render_template, request, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///network_audit.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(1000), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        if user:
            return "Email address already exists" # Or render a template with an error message
        new_user = User(email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('signup.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for('home')) # Redirect to home page or a protected page
        else:
            return "Invalid email or password" # Or render a template with an error message
    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home')) # Redirect to home page or login page

@app.route('/protected')
@login_required
def protected_route():
    return "This is a protected route!"


@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Network Audit Application"})

@app.route('/phase1')
def phase1():
    return jsonify({"phase": 1, "name": "Planning & Scope Definition", "status": "Placeholder endpoint"})

@app.route('/phase2')
def phase2():
    return jsonify({"phase": 2, "name": "Network Discovery", "status": "Placeholder endpoint"})

@app.route('/phase3')
def phase3():
    return jsonify({"phase": 3, "name": "Port & Service Scanning", "status": "Placeholder endpoint"})

@app.route('/phase4')
def phase4():
    return jsonify({"phase": 4, "name": "OS and Device Fingerprinting", "status": "Placeholder endpoint"})

@app.route('/phase5')
def phase5():
    return jsonify({"phase": 5, "name": "Firewall & Access Control Testing", "status": "Placeholder endpoint"})

@app.route('/phase6')
def phase6():
    return jsonify({"phase": 6, "name": "DNS and Routing Checks", "status": "Placeholder endpoint"})

@app.route('/phase7')
def phase7():
    return jsonify({"phase": 7, "name": "Vulnerability Assessment", "status": "Placeholder endpoint"})

@app.route('/phase8')
def phase8():
    return jsonify({"phase": 8, "name": "Traffic & Bandwidth Monitoring", "status": "Placeholder endpoint"})

@app.route('/phase9')
def phase9():
    return jsonify({"phase": 9, "name": "Change Tracking & Anomaly Detection", "status": "Placeholder endpoint"})

@app.route('/phase10')
def phase10():
    return jsonify({"phase": 10, "name": "Reporting & Recommendations", "status": "Placeholder endpoint"})

@app.route('/phase11')
def phase11():
    return jsonify({"phase": 11, "name": "Automation & Re-Auditing", "status": "Placeholder endpoint"})
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password_hash, password):
            # Log the user in (we'll implement this properly with Flask-Login next)
            return "Login successful (Placeholder)" # Or redirect to a protected page
        else:
            return "Invalid email or password" # Or render a template with an error message
    return render_template('login.html')

if __name__ == '__main__':
    if not os.path.exists('site.db'):
        with app.app_context():
            db.create_all()
    app.run(debug=True)