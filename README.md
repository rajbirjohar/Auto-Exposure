# 🏎 Auto Exposure

<img alt="Build" src="https://img.shields.io/badge/Build-Passing-green?&style=for-the-badge&" />

> Authors:  
> Rajbir Johar  
> Danial Beg  
> Matthew Lee  
> Isaac Curiel

## Table of Contents

1. [Purpose](#purpose)
2. [Instructions](#instructions)
3. [Technologies](#technologies-used)
4. [File Structure](#file-structure)
5. [Third Party](#third-party-packages-and-libraries)

## Purpose

This is a social media web app with a focus on cars - uploading cars, sharing cars, liking cars.

### Features

Features included or will be included:

- [x] User profiles
- [x] Editing user profiles
- [x] Uploading image urls and captions
- [x] Authentication
- [x] Account verification
- [x] Sessions
- [ ] Deleting posts
- [x] Uploading direct images
- [ ] Commenting
- [x] Liking
- [x] Minimal and clean UI/UX
- [x] Footer

## Instructions

1. `git clone https://github.com/CS-UCR/Auto-Exposure.git`
2. `cd Auto-Exposure/`
3. `yarn`
4. `yarn run dev`
5. `localhost:3000` in your browser.

## Technologies Used

<img alt="Next JS" src="https://img.shields.io/badge/nextjs-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white"/> <img alt="Vercel" src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"/> <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>

What we used or will use to build this:

- Yarn
- Next.JS
- TailwindCSS
- MongoDB
- SendGrid
- Cloudinary

## File Structure

```bash
├── master
│   ├── branch frontend
│   │   ├── pages
│   │   │   ├── index.js
│   │   │   ├── _app.js
│   │   ├── ...
│   ├── branch backend
│   │   ├── api
│   │   │   ├── feed.js
│   │   │   ├── profile.js
│   │   ├── ...
│   ├── ...
└── .gitignore
```

There will be two separate branches for frontend and backend where we implement specific features within each branch and merge into master.

## Technologies Explained

- NextJS
  - Framework built on top of react but better in every way.
  - Hosted on Vercel where we also store the env variables.

## Third Party Packages and Libraries

- [TailwindCSS](https://tailwindcss.com)
  - Used for the majority of our styling
- [MongoDB](https://www.mongodb.com)
  - Used as our main database to hold all user-centric information including:
    - First/last names
    - Usernames
    - Emails
    - Passwords
    - urls to Profile Pictures
    - urls to Post Pictures
    - Posts attached to users
- [Cloudinary](https://cloudinary.com)
  - Used as our secondary database to hold all the physical images including:
    - Profile Pictures
    - Post Pictures
    - Default profile pictures come from [here](https://avatar.tobi.sh).
- [SendGrid](https://sendgrid.com)
  - Used as our account verification and password reset medium by sending the users emails.
