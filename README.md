# Parking Slot Reservation System 🚗

A web-based parking slot booking application built with **Node.js**, **Express**, and **MySQL**.

## Features

- Book a parking slot with vehicle details and timing.
- Restricts overlapping bookings using server-side logic.
- View all active bookings.
- Delete existing bookings.
- Error prompts when no slots are available.
- Clean and responsive UI with EJS templating.

## Technologies Used

- Node.js
- Express.js
- MySQL
- EJS (Embedded JavaScript templates)
- HTML/CSS/JavaScript

## Setup Instructions

1. Clone the repository or download it.
2. Run `npm install` to install dependencies.
3. Create a MySQL database `mydb` and table `parking`:
   ```sql
   CREATE TABLE parking (
       id VARCHAR(255) PRIMARY KEY,
       vehicle_name VARCHAR(255),
       plate_no VARCHAR(255),
       in_time DATETIME,
       out_time DATETIME
   );
