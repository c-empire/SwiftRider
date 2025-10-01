# SwiftRider — Backend (Capstone Project)

**SwiftRider** is a dispatch rider backend built with Node.js, Express and MongoDB.  
This repo contains the full backend, API docs (Swagger), database schema, migrations, tests and deployment instructions.

---

## Features (backend)
- JWT authentication (roles: `customer`, `rider`, `admin`)
- Delivery requests lifecycle (pending → accepted → in-progress → completed)
- Mock payments (sandbox simulation)
- Rider tracking (simulate GPS updates)
- Mock notifications (console or pluggable services)
- Admin APIs and basic analytics

---

## Quick start (local)

1. Clone
```bash
git clone https://github.com/<you>/swiftrider-backend.git
cd swiftrider-backend

README Documentation (For GitHub Users)

# SwiftRider API 🚴‍♂️

## Base URL
http://localhost:3000/api


## Authentication
All protected routes require JWT Bearer Token.



---

### Auth Endpoints
- **POST** `/auth/register` → Register new user  
- **POST** `/auth/login` → Login & receive token  

### Delivery Endpoints
- **POST** `/deliveries/` → Create delivery (customer only)  
- **GET** `/deliveries/available` → List available deliveries (rider only)  
- **POST** `/deliveries/{id}/accept` → Rider accepts delivery  
- **PATCH** `/deliveries/{id}/status` → Rider updates delivery status  

### Admin Endpoints
- **GET** `/admin/users` → Get all users  
- **GET** `/admin/deliveries` → Get all deliveries  
- **GET** `/admin/analytics` → Platform analytics  

### Rider Endpoints
- **PATCH** `/riders/location` → Update rider location  
- **GET** `/riders/{riderId}/location` → Get one rider’s location (customer/admin)  
- **GET** `/riders/locations/all` → Get all riders’ locations (admin only)  

### Payments
- **POST** `/payments/` → Make payment (customer only)  


---

### Auth Endpoints
- **POST** `/auth/register` → Register new user  
- **POST** `/auth/login` → Login & receive token  

### Delivery Endpoints
- **POST** `/deliveries/` → Create delivery (customer only)  
- **GET** `/deliveries/available` → List available deliveries (rider only)  
- **POST** `/deliveries/{id}/accept` → Rider accepts delivery  
- **PATCH** `/deliveries/{id}/status` → Rider updates delivery status  

### Admin Endpoints
- **GET** `/admin/users` → Get all users  
- **GET** `/admin/deliveries` → Get all deliveries  
- **GET** `/admin/analytics` → Platform analytics  

### Rider Endpoints
- **PATCH** `/riders/location` → Update rider location  
- **GET** `/riders/{riderId}/location` → Get one rider’s location (customer/admin)  
- **GET** `/riders/locations/all` → Get all riders’ locations (admin only)  

### Payments
- **POST** `/payments/` → Make payment (customer only)  


