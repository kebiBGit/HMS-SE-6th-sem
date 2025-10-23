# 🏨 Hotel Management System (HMS)

A full-featured **Hotel Management System** built with  **Django** , designed to manage hotel rooms, bookings, users, and profiles efficiently.

It includes a smooth UI, real-time booking validation, and role-based access for admin and normal users.

## 🚀 Features

### 🧑‍💼 User Features

* Sign up, sign in, and manage user profile.
* Book rooms with custom check-in/check-out dates.
* View all past and active bookings in the profile page.
* Cancel bookings anytime.
* **“Book More”** option visible only for canceled bookings.
* Dynamic total price calculation based on number of nights.
* Validation to prevent selecting checkout dates earlier than check-in.
* Smooth UI transitions between room type and room number selection.
* Special request box with enhanced UI styling.

### 🛠️ Admin/Manager Features

* Manage users, rooms, and bookings through Django admin panel.
* Manually toggle room availability (`is_available` True/False).
* Manage room types and pricing.
* Handle check-in/check-out or cancellations.
* Add/Edit/Delete data directly from the admin interface.

## 🧩 Tech Stack

| Component             | Technology                          |
| --------------------- | ----------------------------------- |
| Backend               | **Django (Python)**           |
| Frontend              | HTML, CSS, JavaScript               |
| Database (Local)      | **SQLite3**                   |
| Database (Production) | **PostgreSQL (Render Cloud)** |
| Deployment            | **Render**                    |
| Styling               | Custom CSS + Responsive Design      |

## ⚙️ Local Setup Guide

### 1️⃣ Clone the Repository

```
git clone git@github.com:kebiBGit/HMS-SE-6th-sem.git

```

### 2️⃣ Create and Activate Virtual Environment

```
python -m venv venv
# For Windows (Command Prompt/PowerShell)
venv\Scripts\activate
# For macOS/Linux (Bash/Zsh)
source venv/bin/activate
```

### 3️⃣ Install Dependencies

```
pip install -r requirements.txt
```

### 4️⃣ Apply Migrations

```
python manage.py migrate
```

### 5️⃣ Create Superuser

```
python manage.py createsuperuser
```

### 6️⃣ Run the Development Server

```
python manage.py runserver
```

Now open your browser and visit: `http://127.0.0.1:8000/`

## 🗃️ Project Structure

├── hotel/                 # Main app (rooms, bookings, models, views)
├── templates/             # HTML templates
├── static/                # CSS, JS, and image files
├── hms/                   # Project configuration (settings, urls, wsgi)
├── Pipfile
└── Pipfile.lock
└── README.md

### 🧱 Models Overview

| Model                 | Fields                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------- |
| **RoomType**    | `name`,`price_per_night`                                                                |
| **Room**        | `room_number`,`room_type (ForeignKey)`,`is_available (Boolean)`                       |
| **Booking**     | `user (ForeignKey)`,`check_in`,`check_out`,`status (ACTIVE / CANCELED / COMPLETED)` |
| **BookingItem** | `booking (ForeignKey)`,`room (ForeignKey)`,`special_request (TextField)`              |

## 🌐 Deployment Guide (Render + PostgreSQL)

### 1️⃣ Push Project to GitHub

Ensure all your code is pushed to your remote repository.

```
git init
git add .
git commit -m "Initial commit - HMS project"
git branch -M main
git remote add origin [https://github.com/](https://github.com/)<your_username>/<repo_name>.git
git push -u origin main
```

### 2️⃣ Create PostgreSQL Database on Render

1. Go to [https://render.com](https://render.com "null") and create an account.
2. Create a  **new PostgreSQL database** .
3. Copy the external connection string (it will be your `DATABASE_URL`).

### 3️⃣ Deploy Web Service

1. In Render, create a **New → Web Service** and connect your GitHub repository.
2. Set the environment to  **Python** .
3. Configure commands:
   * **Build Command:**
     ```
     pip install -r requirements.txt
     ```
   * **Start Command:**
     ```
     gunicorn hms.wsgi:application
     ```

### 4️⃣ Add Environment Variables

Add the following variables in your Render service settings:

| Key               | Value                          | Notes                            |
| ----------------- | ------------------------------ | -------------------------------- |
| `DATABASE_URL`  | `your_postgres_url`          | Connection string from Render DB |
| `SECRET_KEY`    | `your_django_secret`         | A long, random string            |
| `DEBUG`         | `False`                      | Must be `False`for production  |
| `ALLOWED_HOSTS` | `your-app-name.onrender.com` | Your live Render domain          |

### 5️⃣ Run Initial Migrations & Create Superuser

After the service deploys, you must run your migrations and create an admin user via the **Shell** tab in your Render dashboard.

```
# Run migrations
python manage.py migrate

# Create the admin user
python manage.py createsuperuser
```

### 6️⃣ (Optional) Load Local Data into Live Database

To transfer data from your local SQLite to the live PostgreSQL database:

```
# Dump data from your local environment (must be run locally)

# Copy data.json to your project root, then load it (must be run on Render Shell)
python manage.py loaddata data.json
```

## 🧩 Environment Variables

For local development, create a file named **`.env`** in your project root:

```
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=127.0.0.1,localhost
```

## 🔁 Updating Future Code

When you make updates:

1. Test locally.
2. Commit and push to GitHub (`git push`).
3. Render will automatically redeploy your service.
4. If you have added new database models, run `python manage.py makemigrations` locally, commit the changes, and then run `python manage.py migrate` on the Render Shell.

Your PostgreSQL database on Render will persist — no data loss.

## 🧠 Contributors

| Role               | Name           |
| ------------------ | -------------- |
| UI/UX Developer    | Arun Chaudary  |
| Backend Developer  | Jenish Ghimire |
| Frontend Developer | Bibek Kafle    |
| QA & Testing       | Deepak Tamang  |

## 💡 Future Enhancements

* Automatic availability management on check-in/check-out.
* Payment gateway integration.
* Email confirmation for bookings.
* Room gallery and review system.
* AI for admin page reports

## 📜 License

This project is developed for educational and project purposes under the  **MIT License** .

🌟 If you like this project, don’t forget to ⭐ the repo!
