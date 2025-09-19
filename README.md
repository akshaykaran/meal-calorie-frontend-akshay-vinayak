This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# 🍏 NutriCount – Nutrition Counter Application

NutriCount is a nutrition tracking application built with **Next.js**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **Zustand**.  
It helps users register, log in, search for dishes, and view their nutritional values powered by the **USDA FoodData API**.

---

## 🚀 Features

- 🔐 User registration & login (JWT authentication with API key)
- 🌓 Light/Dark theme toggle (using `next-themes`)
- 📊 Dashboard to search dishes & servings
- 🔎 Fetch calories and nutritional values via API
- 🗂️ Search history stored in Zustand (shown in modal)
- 🐳 Docker support for easy deployment
- ✅ Tested with React Testing Library + Jest

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** Zustand
- **Notifications:** Sonner (toast)
- **Testing:** Jest + React Testing Library
- **Deployment:** Docker

---

## 📂 Project Structure

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
