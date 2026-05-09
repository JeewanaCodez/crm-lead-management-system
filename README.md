# CRM Lead Management System

A full-stack Customer Relationship Management application built with **React.js**, **Node.js**, **Express.js**, and **MySQL**. This system provides comprehensive lead tracking, management, analytics, and note-taking capabilities with search and filtering features.

## Features

- 🔐 **User Authentication** - Secure login system
- 📊 **Dashboard Analytics** - Real-time insights on leads and deal values
- 👥 **Lead Management** - Create, read, update, and delete leads
- 📝 **Notes System** - Add and manage notes for each lead
- 🔍 **Search & Filtering** - Filter leads by status, source, and salesperson
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React.js** (v19.2.6) - UI library
- **React Router DOM** (v7.15.0) - Client-side routing
- **Axios** (v1.16.0) - HTTP client
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v5.2.1) - Web framework
- **MySQL 2** (v3.22.3) - Database driver
- **CORS** (v2.8.6) - Cross-Origin Resource Sharing
- **Nodemon** (v3.1.14) - Development auto-reload

### Database
- **MySQL** - Relational database

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MySQL** (v5.7 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/crm-lead-management-system.git
cd crm-lead-management-system
```

### 2. Database Setup

#### Option A: Manual Setup

1. **Start MySQL Server**
   ```bash
   # On Windows
   net start MySQL80
   
   # On macOS (using Homebrew)
   brew services start mysql
   
   # On Linux
   sudo systemctl start mysql
   ```

2. **Create the Database and Tables**
   
   Open MySQL Command Line or MySQL Workbench and run:

   ```sql
   -- Create Database
   CREATE DATABASE crm_system;
   USE crm_system;

   -- Create Leads Table
   CREATE TABLE leads (
     lead_id INT PRIMARY KEY AUTO_INCREMENT,
     lead_name VARCHAR(255) NOT NULL,
     company_name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     phone VARCHAR(20),
     lead_source VARCHAR(100),
     assigned_salesperson VARCHAR(255),
     status ENUM('New', 'Qualified', 'Won', 'Lost') DEFAULT 'New',
     estimated_deal_value DECIMAL(10, 2),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );

   -- Create Notes Table
   CREATE TABLE notes (
     note_id INT PRIMARY KEY AUTO_INCREMENT,
     lead_id INT NOT NULL,
     note_content TEXT NOT NULL,
     created_by VARCHAR(255),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (lead_id) REFERENCES leads(lead_id) ON DELETE CASCADE
   );

   -- Create Index for Better Performance
   CREATE INDEX idx_status ON leads(status);
   CREATE INDEX idx_salesperson ON leads(assigned_salesperson);
   CREATE INDEX idx_lead_source ON leads(lead_source);
   ```

#### Option B: Database Connection Details

The application connects to MySQL using the following default configuration:

- **Host**: `localhost`
- **User**: `root`
- **Password**: (empty)
- **Database**: `crm_system`
- **Port**: `3306`

⚠️ **Important**: Update the credentials in [backend/config/db.js](backend/config/db.js) if you're using different MySQL credentials.

---

### 3. Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```
   
   Or with nodemon (auto-reload):
   ```bash
   npx nodemon server.js
   ```

   Expected output:
   ```
   ✅ MySQL Connected Successfully
   Server running on port 5000
   ```

   The backend will be available at: `http://localhost:5000`

### 4. Frontend Setup

1. **Navigate to the frontend directory** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   The application will automatically open in your browser at: `http://localhost:3000`

---

## Test Login Credentials

Once the application is running, use the following credentials to log in:

| Field | Value |
|-------|-------|
| **Email** | `admin@example.com` |
| **Password** | `password123` |

⚠️ **Note**: These are demo credentials for testing purposes. Implement proper authentication with a backend API for production use.

---

## API Endpoints

### Leads Endpoints
- `GET /api/leads` - Get all leads (with optional filters)
- `POST /api/leads` - Create a new lead
- `GET /api/leads/:id` - Get a specific lead
- `PUT /api/leads/:id` - Update a lead
- `DELETE /api/leads/:id` - Delete a lead

### Query Parameters for GET /api/leads:
- `status` - Filter by status (New, Qualified, Won, Lost)
- `source` - Filter by lead source
- `salesperson` - Filter by assigned salesperson
- `search` - Search by lead name, company, or email

### Notes Endpoints
- `GET /api/notes/:id` - Get notes for a lead
- `POST /api/notes/:id` - Add a note to a lead

### Dashboard Endpoints
- `GET /api/dashboard/stats` - Get dashboard analytics

---

## Project Structure

```
crm-lead-management-system/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── leadController.js     # Lead operations
│   │   ├── noteController.js     # Note operations
│   │   └── dashboardController.js# Dashboard analytics
│   ├── routes/
│   │   ├── leadRoutes.js         # Lead routes
│   │   ├── noteRoutes.js         # Note routes
│   │   └── dashboardRoutes.js    # Dashboard routes
│   ├── server.js                 # Main server file
│   └── package.json              # Backend dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Login.js          # Login page
│   │   ├── components/           # React components
│   │   ├── styles/
│   │   ├── App.js                # Main app component
│   │   └── index.js              # React entry point
│   ├── package.json              # Frontend dependencies
│   └── README.md                 # Frontend documentation
├── .gitignore                    # Git ignore rules
└── README.md                     # This file
```

---

## Common Issues & Troubleshooting

### MySQL Connection Failed
- Ensure MySQL server is running
- Verify credentials in [backend/config/db.js](backend/config/db.js)
- Check if the `crm_system` database exists
- Verify MySQL is listening on port 3306

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Port 5000 Already in Use
```bash
# Kill the process using port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Dependencies Installation Issues
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

---

## Development Workflow

### Running Both Frontend and Backend

**Terminal 1 - Backend**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm start
```

---

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
```

This creates a `build` folder with optimized production files.

### Backend Deployment
- Update database credentials in [backend/config/db.js](backend/config/db.js)
- Set up environment variables for production
- Use a process manager like PM2 to keep the server running

---

## Contributing

1. Create a new branch for your feature
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

---

## License

This project is licensed under the ISC License.

---

## Support

For issues or questions, please create an issue on the GitHub repository or contact the development team.

---

## Future Enhancements

- [ ] Backend authentication with JWT
- [ ] User roles and permissions
- [ ] Email notifications
- [ ] Advanced reporting and analytics
- [ ] Export leads to CSV/PDF
- [ ] Mobile app version
- [ ] Activity timeline
- [ ] Integration with email services

---

**Last Updated**: May 9, 2026
