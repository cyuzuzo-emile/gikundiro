# Rayon Sports FC - Official Website Specification

## 1. Project Overview

**Project Name:** Rayon Sports FC Official Website  
**Project Type:** Full-stack Web Application  
**Core Functionality:** A modern, responsive football club website featuring public information, fan engagement with ticket booking, and comprehensive admin management capabilities.  
**Target Users:** Football fans, club supporters, visitors, and club administrators

---

## 2. Technology Stack

### Frontend
- **Framework:** React.js 18+
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **File Upload:** Multer + Cloudinary (or local storage for demo)

---

## 3. UI/UX Specification

### Color Palette
| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary | #1E3A5F | Main brand color, headers |
| Secondary | #2E7D32 | Accent, buttons, highlights |
| Accent | #FFC107 | CTAs, important badges |
| Background | #0A0A0A | Dark mode background |
| Surface | #141414 | Cards, elevated surfaces |
| Text Primary | #FFFFFF | Main text on dark |
| Text Secondary | #A0A0A0 | Muted text |
| Success | #4CAF50 | Positive actions |
| Error | #F44336 | Errors, warnings |

### Typography
- **Primary Font:** "Oswald" (headings) - Bold, impactful
- **Secondary Font:** "Open Sans" (body) - Clean, readable
- **Font Sizes:**
  - H1: 48px / 3rem
  - H2: 36px / 2.25rem
  - H3: 24px / 1.5rem
  - Body: 16px / 1rem
  - Small: 14px / 0.875rem

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Layout Structure
- **Navbar:** Fixed top, transparent to solid on scroll
- **Hero Sections:** Full viewport height with parallax
- **Content Sections:** Max-width 1280px, centered
- **Footer:** Dark background with club info

---

## 4. Page Specifications

### 4.1 Public Pages (Visitors - No Login Required)

#### Home Page
- **Hero Section:**
  - Full-screen background with club banner image
  - Animated title "RAYON SPORTS FC"
  - Tagline "Pride of Rwanda, Glory in Africa"
  - CTA buttons: "Buy Tickets" | "Join Fan Club"
  
- **Latest News Section:**
  - 3-column grid of news cards
  - Image, title, date, excerpt
  
- **Upcoming Matches:**
  - Horizontal scroll or carousel
  - Match cards with date, opponent, venue
  
- **Featured Players:**
  - 4-player showcase grid
  - Player photo, name, position
  
- **Achievements:**
  - Trophy cabinet display
  - League titles, cups won
  
- **Sponsors:**
  - Logo grid of sponsors
  
- **Newsletter:**
  - Email input with subscribe button

#### About Page
- **History Timeline:**
  - Club founded year, major milestones
  
- **Vision & Mission:**
  - Statement cards
  
- **Stadium Info:**
  - Stadium name, capacity, location
  
- **Management:**
  - Admin/board member cards

#### Team Page
- **Squad List:**
  - Player cards in grid
  - Photo, name, position, jersey number, nationality, stats
  - Filter by position
  
- **Staff Section:**
  - Coach, assistant coaches, medical staff

#### Matches Page
- **Upcoming Matches:**
  - Date, time, opponent, venue, book ticket button
  
- **Past Results:**
  - Score, date, competition, match report link
  
- **Match Statistics:**
  - Goals, assists, clean sheets per player

#### News Page
- **News Grid:**
  - Category filters (Announcements, Reports, Transfers)
  - Paginated news cards
  
- **Featured Article:**
  - Large hero news item

#### Gallery Page
- **Photo Grid:**
  - Masonry layout
  - Lightbox on click
  
- **Video Section:**
  - Embedded videos
  
- **Match Highlights:**
  - Video cards

#### Shop Page
- **Product Categories:**
  - Jerseys, Scarves, Hats, Accessories
  
- **Product Cards:**
  - Image, name, price, add to cart
  
- **Cart:**
  - Slide-out cart drawer

#### Contact Page
- **Contact Form:**
  - Name, email, subject, message
  - Submit button
  
- **Location Map:**
  - Embedded Google Maps
  
- **Contact Info:**
  - Email, phone, address

---

### 4.2 Fan Pages (Authenticated Users)

#### Fan Dashboard
- **Welcome Section:**
  - Personalized greeting
  
- **Quick Stats:**
  - Tickets purchased, favorite players
  
- **Upcoming Tickets:**
  - Booked matches
  
- **Notifications:**
  - Unread alerts

#### Fan Profile
- **Profile Form:**
  - Edit name, email, phone
  - Profile photo upload
  
- **Password Change:**
  - Current, new, confirm password

#### Ticket Booking
- **Match List:**
  - Filter by date, competition
  
- **Booking Flow:**
  - Select seats
  - Payment (mock)
  - QR ticket generation

#### Fan Community
- **Discussion Posts:**
  - Create, comment, like
  
- **Fan Polls:**
  - Player of the match voting

---

### 4.3 Admin Pages

#### Admin Dashboard
- **Statistics Cards:**
  - Total fans, ticket sales, news articles, players
  
- **Charts:**
  - Monthly ticket sales graph
  
- **Recent Activity:**
  - Latest registrations, bookings

#### Manage Players
- **Player Table:**
  - Name, position, number, actions
  
- **Add/Edit Form:**
  - All player fields with photo upload

#### Manage Matches
- **Match Table:**
  - Date, opponent, score, actions
  
- **Create/Edit Form:**
  - Match details, result entry

#### Manage News
- **Article Table:**
  - Title, category, date, actions
  
- **Editor:**
  - Rich text editor for articles
  - Image upload

#### Manage Fans
- **User Table:**
  - Name, email, status, actions
  
- **Actions:**
  - View profile, block/unblock

#### Manage Tickets
- **Sales Overview:**
  - Revenue, tickets sold
  
- **Ticket Management:**
  - Price settings, availability

---

## 5. Authentication System

### User Roles
1. **Visitor** - No login, public pages only
2. **Fan** - Registered user, fan dashboard access
3. **Admin** - Full admin panel access

### Auth Features
- Registration with email/password
- Login with JWT tokens
- Token stored in localStorage
- Auto-logout on token expiry
- Protected routes based on role

---

## 6. API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Players
- `GET /api/players` - Get all players
- `GET /api/players/:id` - Get player by ID
- `POST /api/players` - Create player (admin)
- `PUT /api/players/:id` - Update player (admin)
- `DELETE /api/players/:id` - Delete player (admin)

### Matches
- `GET /api/matches` - Get all matches
- `GET /api/matches/upcoming` - Get upcoming matches
- `GET /api/matches/past` - Get past matches
- `POST /api/matches` - Create match (admin)
- `PUT /api/matches/:id` - Update match (admin)
- `DELETE /api/matches/:id` - Delete match (admin)

### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get news by ID
- `POST /api/news` - Create news (admin)
- `PUT /api/news/:id` - Update news (admin)
- `DELETE /api/news/:id` - Delete news (admin)

### Tickets
- `GET /api/tickets` - Get all tickets (admin)
- `GET /api/tickets/my-tickets` - Get user tickets (fan)
- `POST /api/tickets` - Book ticket (fan)
- `PUT /api/tickets/:id/validate` - Validate ticket (admin)

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin)

---

## 7. Data Models

### User
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: Enum['fan', 'admin'],
  avatar: String,
  favoritePlayers: [ObjectId],
  isBlocked: Boolean,
  createdAt: Date
}
```

### Player
```javascript
{
  name: String,
  position: Enum['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
  jerseyNumber: Number,
  nationality: String,
  dateOfBirth: Date,
  photo: String,
  bio: String,
  stats: {
    goals: Number,
    assists: Number,
    appearances: Number
  }
}
```

### Match
```javascript
{
  date: Date,
  opponent: String,
  venue: String,
  competition: String,
  homeOrAway: Enum['Home', 'Away'],
  result: {
    homeScore: Number,
    awayScore: Number
  },
  status: Enum['Scheduled', 'Live', 'Completed']
}
```

### News
```javascript
{
  title: String,
  content: String,
  category: Enum['Announcement', 'Match Report', 'Transfer', 'General'],
  image: String,
  author: ObjectId,
  publishedAt: Date
}
```

### Ticket
```javascript
{
  user: ObjectId,
  match: ObjectId,
  seatNumber: String,
  price: Number,
  qrCode: String,
  status: Enum['Valid', 'Used', 'Cancelled'],
  bookedAt: Date
}
```

---

## 8. Project Structure

```
rayon-sports-fc/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── features/
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   ├── fan/
│   │   │   └── admin/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   └── styles/
│   ├── package.json
│   └── tailwind.config.js
├── server/                    # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
└── README.md
```

---

## 9. Extra Features

- **Dark Mode:** Toggle between light/dark themes
- **Search:** Global search across pages
- **Live Scores:** WebSocket or polling for live match updates
- **Player of the Match:** Weekly fan voting
- **Social Media:** Share buttons on news/articles
- **Responsive:** Fully mobile-optimized

---

## 10. Acceptance Criteria

1. ✅ All public pages render correctly without login
2. ✅ User can register and login
3. ✅ Fans can access dashboard, book tickets
4. ✅ Admins can manage all content
5. ✅ Responsive design works on all devices
6. ✅ JWT authentication is secure
7. ✅ All API endpoints return proper responses
8. ✅ Dark mode toggle functions correctly
9. ✅ Search functionality works
10. ✅ No console errors in production
