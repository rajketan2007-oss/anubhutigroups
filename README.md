# Anubhuti Group of Companies - Official Web Platform

> **"Building Trust. Creating Spaces. Delivering Dreams."**

A complete, production-ready, full-stack MERN application for **Anubhuti Group of Companies**, a premier Indian corporate conglomerate comprising three specialized business divisions:
1. **Anubhuti Construction** – Residential, commercial, industrial, and infrastructure civil contracting.
2. **Anubhuti Realtor** – Strategic property advisory, buying, selling, renting, leasing, and certified legal title due diligence.
3. **Anubhuti Interiors** – Bespoke luxury residential and commercial turnkey interior architecture.

---

## 🏛️ Brand Identity & Design System

The visual identity and design system are reproduced directly from the live reference website (`https://anubhuti-group-of-companies12.vercel.app/`):
- **Core Background**: `--bg: #FAF7F2` (Warm Ivory)
- **Card & Surface Background**: `--surface: #FFFFFF` (Pure White)
- **Primary Brand Color**: `--primary: #1F3D36` (Deep Forest Emerald / Heritage Green)
- **Metallic Accent**: `--accent: #B8935A` (Architectural Warm Gold)
- **Subtle Tint**: `--tint: #E7EEE9` (Soft Sage Tint)
- **Body Typography**: `--font-body: 'Manrope', system-ui, sans-serif`
- **Headings Typography**: `--font-heading: 'Cormorant Garamond', Georgia, serif`

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router DOM (v6)
- **Styling**: CSS3 with CSS Variables, Flexbox, and CSS Grid
- **Icons**: Lucide React
- **Typography**: Cormorant Garamond & Manrope Google Fonts
- **SEO & Structured Data**: Open Graph, Twitter Cards, Organization & LocalBusiness JSON-LD schemas, `robots.txt`, and `sitemap.xml`

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB Atlas with Mongoose (includes automatic resilient In-Memory Fallback store for instant local development and zero-downtime demos)
- **Authentication**: JWT (JSON Web Tokens) with `bcryptjs` password hashing
- **Security**: Helmet, CORS whitelist, Express Rate Limiting (general API and strict limiter on submissions)
- **Email Notifications**: Nodemailer setup with HTML email dispatch
- **Media Management**: Cloudinary integration configured

---

## 📂 Project Architecture

```
anubhuti-group/
├── client/
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/
│   │   │   ├── BackToTop.jsx         # Circular SVG scroll-progress button
│   │   │   ├── ContactForm.jsx       # Validated inquiry form (Indian 10-digit mobile)
│   │   │   ├── FAQAccordion.jsx      # Accessible keyboard-friendly accordion
│   │   │   ├── Footer.jsx            # 4-column rich footer with compliance links
│   │   │   ├── LightboxModal.jsx     # Accessible full-screen image preview modal
│   │   │   ├── Loader.jsx            # Branded loading spinner
│   │   │   ├── Navbar.jsx            # Sticky navbar with mobile touch drawer
│   │   │   ├── PageHero.jsx          # Hero with breadcrumb and luxury overlay
│   │   │   ├── ProjectCard.jsx       # Project showcase with zoom lightbox trigger
│   │   │   ├── PropertyCard.jsx      # Realtor card with BHK, area, price badge
│   │   │   ├── QuoteModal.jsx        # Universal "Get a Quote" consultation popup
│   │   │   ├── SectionHeading.jsx    # Standardized section titles & badges
│   │   │   ├── TestimonialSlider.jsx # Touch & autoplay reviews slider
│   │   │   └── WhatsAppButton.jsx    # Floating WhatsApp button with prefilled text
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       # Admin authentication & token state
│   │   │   └── ModalContext.jsx      # Quote and Lightbox modal state controls
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Hero, 3 divisions, stats counter, testimonials
│   │   │   ├── Construction.jsx      # 5 services, 6-step process, filtered projects, BOQ form
│   │   │   ├── Realtor.jsx           # Real property search, filter, pagination, site visits
│   │   │   ├── Interiors.jsx         # 5 services, 3D gallery, 5-step process, styles, form
│   │   │   ├── AboutContact.jsx      # Story, vision, values, leadership, milestones, map
│   │   │   ├── NotFound.jsx          # Luxury 404 error page
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx    # Secure admin login portal
│   │   │       └── AdminDashboard.jsx# Metrics, inquiry updates, CRUD properties & projects
│   │   ├── services/
│   │   │   └── api.js                # Centralized Fetch API client with Bearer auth
│   │   ├── styles/
│   │   │   ├── global.css            # Base typography, buttons, badges, modals
│   │   │   ├── responsive.css        # Breakpoints (375px, 768px, 1024px, 1260px)
│   │   │   └── variables.css         # Central CSS custom properties & color palette
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.html
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   ├── db.js                     # MongoDB Mongoose connector with in-memory fallback
│   │   └── cloudinary.js             # Cloudinary upload configuration
│   ├── controllers/
│   │   ├── authController.js         # Admin JWT login and verification
│   │   ├── enquiryController.js      # Public inquiry submission & admin management
│   │   ├── projectController.js      # Construction & interior projects CRUD
│   │   ├── propertyController.js     # Real estate listings with search/filters/pagination
│   │   └── testimonialController.js  # Client reviews management
│   ├── middleware/
│   │   ├── authMiddleware.js         # JWT verification middleware
│   │   ├── errorMiddleware.js        # 404 and central error handling
│   │   └── validateRequest.js        # Indian 10-digit mobile & email validation
│   ├── models/
│   │   ├── Admin.js                  # Admin schema with bcrypt password hashing
│   │   ├── Enquiry.js                # Inquiries collection
│   │   ├── Project.js                # Projects collection
│   │   ├── Property.js               # Properties collection
│   │   └── Testimonial.js            # Client testimonials collection
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── enquiryRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── propertyRoutes.js
│   │   └── testimonialRoutes.js
│   ├── utils/
│   │   ├── emailService.js           # Nodemailer notification service
│   │   ├── memoryStore.js            # Resilient in-memory fallback store
│   │   └── seedData.js               # Sample verified placeholders
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── package.json                      # Root workspace scripts
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v24 LTS recommended)
- **npm**: v9.0.0 or higher

### 2. Installation
From the root workspace directory (`anubhuti 5 web`):
```bash
# Install root, backend and frontend dependencies
npm run install-all
```
*(Or install individually)*:
```bash
cd server && npm install
cd ../client && npm install
```

### 3. Environment Variables Setup
Copy example files:
```bash
# Server configuration
cp server/.env.example server/.env

# Client configuration
cp client/.env.example client/.env
```

Default credentials in `.env`:
- **Admin Email**: `admin@anubhutigroup.com`
- **Admin Password**: `Admin@Anubhuti2026#`

### 4. Running the Application
Open two terminal windows:

**Terminal 1 (Backend API Server):**
```bash
cd server
npm run dev
# Server will run at http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# Frontend will run at http://localhost:5173
```

You can now open [http://localhost:5173](http://localhost:5173) in your browser!

---

## 📡 REST API Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/health` | Public | Server health & environment status |
| **POST** | `/api/auth/login` | Public | Admin login, returns JWT token |
| **GET** | `/api/auth/me` | Protected | Get authenticated admin profile |
| **POST** | `/api/enquiries` | Public | Submit new client inquiry (validates mobile & email) |
| **GET** | `/api/enquiries` | Protected | List inquiries (filter by division, status, search, pagination) |
| **PATCH** | `/api/enquiries/:id` | Protected | Update inquiry status (`Pending`, `Contacted`, `Resolved`, etc.) |
| **DELETE** | `/api/enquiries/:id` | Protected | Delete an inquiry record |
| **GET** | `/api/properties` | Public | Search & filter properties (`location`, `propertyType`, `purpose`, `sort`, `page`) |
| **GET** | `/api/properties/:id` | Public | Retrieve single property details |
| **POST** | `/api/properties` | Protected | Create a new property listing |
| **PUT** | `/api/properties/:id` | Protected | Update property details |
| **DELETE** | `/api/properties/:id` | Protected | Remove a property listing |
| **GET** | `/api/projects` | Public | List projects (`division`, `category`, `featured`, `page`) |
| **POST** | `/api/projects` | Protected | Add a new construction or interior project |
| **PUT** | `/api/projects/:id` | Protected | Update project details |
| **DELETE** | `/api/projects/:id` | Protected | Delete a project |
| **GET** | `/api/testimonials` | Public | List approved client testimonials |
| **POST** | `/api/testimonials` | Protected | Add a new client review |

---

## 🔐 Administrative Dashboard (`/admin`)

Access the protected portal at:
```
http://localhost:5173/admin
```
- **Login Email**: `admin@anubhutigroup.com`
- **Login Password**: `Admin@Anubhuti2026#`

### Dashboard Capabilities:
- **Inquiries Console**: Live tracking of inquiries received across all divisions with status controls (`Pending` ➔ `Contacted` ➔ `In Progress` ➔ `Resolved` ➔ `Closed`) and search.
- **Realtor Catalog Manager**: Add, edit, or delete verified real estate listings.
- **Project Showcase Manager**: Add or remove landmark construction and interior deliverables.
- **Testimonial Approvals**: Inspect client reviews and feedback.

---

## 🌐 Production Deployment Guide

### 1. MongoDB Atlas Setup
1. Create a free M0 or production cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a database user with read/write privileges.
3. Whitelist access (e.g., `0.0.0.0/0` for cloud deployments).
4. Copy the connection string into `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/anubhuti_group?retryWrites=true&w=majority
   ```

### 2. Backend Deployment (Render / Railway)
1. Push this repository to GitHub or GitLab.
2. In [Render](https://render.com) or [Railway](https://railway.app), create a new **Web Service**.
3. Set **Root Directory** to `server`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add Environment Variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `CLIENT_URL=https://your-frontend-domain.vercel.app`
   - `MONGODB_URI=your_mongodb_atlas_connection_string`
   - `JWT_SECRET=your_secure_random_jwt_secret`
   - `DEFAULT_ADMIN_EMAIL=admin@anubhutigroup.com`
   - `DEFAULT_ADMIN_PASSWORD=your_strong_password`
   - *(Optional)* Cloudinary and SMTP credentials.

### 3. Frontend Deployment (Vercel)
1. Import repository in [Vercel](https://vercel.com).
2. Set **Root Directory** to `client`.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Environment Variables:
   - `VITE_API_URL=https://your-backend-service.onrender.com/api`
   - `VITE_COMPANY_PHONE=+91 98765 43210`
   - `VITE_COMPANY_EMAIL=info@anubhutigroup.com`
   - `VITE_WHATSAPP_NUMBER=919876543210`
7. Click **Deploy**.

---

## ✅ Quality Assurance Verification

- [x] **Reference Visual Fidelity**: Exact palette (`#FAF7F2`, `#1F3D36`, `#B8935A`, `#E7EEE9`) and Cormorant Garamond / Manrope typography.
- [x] **All 5 Pages Implemented**: Home, Construction, Realtor, Interiors, and About & Contact.
- [x] **Real Backend Search & Filters**: Property search by location, type, purpose, and price sorting with real server queries.
- [x] **Form Validations**: Indian 10-digit mobile number format (`/^[6-9]\d{9}$/`), email validation, duplicate prevention, and MongoDB storage.
- [x] **Protected Admin Portal**: JWT authentication, bcrypt password hashing, and dashboard management.
- [x] **Responsiveness**: Tested across mobile (375px), tablet (768px), laptop (1024px), and desktop screens.
- [x] **Accessibility**: ARIA labels, semantic landmark elements, keyboard navigation, and contrast adherence.
- [x] **Production Build Cleanliness**: Built with Vite with 0 errors and 0 warnings.

