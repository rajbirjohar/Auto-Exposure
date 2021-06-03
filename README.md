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
6. [In Progress](#in-progress)  
7. [Contact](#more-work-and-contact)

## Purpose

Auto Exposure is a social media site designed for car enthusiasts in mind. You can upload and share photos of your cars or admire photos of other people's cars and bond over the thing we all love so much.

### Features

Features included or will be included:

- [x] Next.JS
- [x] Static Site Generation
- [x] Dynamic routes
- [x] Middleware
- [x] User profiles and visiting
- [x] Uploading image urls and captions
- [x] Authentication
- [x] Account verification
- [x] Sessions
- [x] Deleting posts
- [x] Uploading direct images
- [x] Commenting
- [x] Deleting comments
- [x] Liking
- [x] Minimal and clean UI/UX
- [x] Dark Mode
- [x] Search bar

**KISS** - Keep It Simple Stupid
- Serverless ready and no Express used at all
- No SASS, Redux, etc

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

## Third Party Packages and Libraries

- [TailwindCSS](https://tailwindcss.com)
  - Used for the majority of our styling. This was a good move from the start since it greatly speeds up the time it takes to develop and design clean UI without messing with custom CSS.
- [MongoDB](https://www.mongodb.com)
  - Used as our main database to hold all user-centric information including:
    - First/last names
    - Usernames
    - Emails
    - Passwords
    - urls to Profile Pictures
    - urls to Post Pictures
    - Posts attached to users
        - Comments
        - Likes
- [Cloudinary](https://cloudinary.com)
  - Used as our secondary database to hold all the physical images including:
    - Profile Pictures
    - Post Pictures
    - Default profile pictures come from [here](https://boringavatars.com).
- [SendGrid](https://sendgrid.com)
  - Used as our account verification and password reset medium by sending the users emails.

## In Progress

We decided to push some features to the end/abandon because we would rather serve a polished UI/UX rather than buggy code and broken features with lacking UI/UX. For instance:
- we had a `pagination` fetch in the beginning but it was interfering with our deleting and liking so we ended up disabling it for now until we figure out an elegant solution to the problem.

> When you're a carpenter making a beautiful chest of drawers,
> you're not going to use a piece of plywood on the back, even 
> though it faces the wall and nobody will ever see it. - Steve Jobs

## More Work and Contact

[Rajbir Johar](https://rajbirjohar.com)

[Danial Beg](https://danialbeg.vercel.app/)
