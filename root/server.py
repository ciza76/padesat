import psycopg2
from flask import Flask, jsonify, abort, render_template, redirect, url_for, send_file, request, flash, Response, send_from_directory, session
import random
import string
import os
import io
from collections import Counter
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, login_required, logout_user, UserMixin, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
import math
from typing import Dict, Union, List

app = Flask(__name__)
app.config['SECRET_KEY'] = '01e8b1c0bb4c2340d8d16db0d1ed43adf917858700e48391b06cfc5292ce99b1'

@app.route("/")
def index():
    return render_template('index.html')

@app.after_request
def add_no_cache_headers(response):
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

if __name__ == '__main__':
    if os.getenv("ENVIRONMENT")=="dev":
        app.run(debug=True, port=3000, host='0.0.0.0')
    else:
        from waitress import serve
        serve(app, host="0.0.0.0", port=3000)