# Survio Frontend

This is the frontend for **Survio**, a survey building and distribution platform for indie game developers.

## 📌 Features
- **User Authentication** (Custom auth with JWT & Role-Based Access)
- **Team Management** (Assign users to teams, manage permissions)
- **Survey Management** (Create, update, delete surveys)
- **Dashboard UI** (Role-based UI with restricted views)

## 🚀 Tech Stack
- **Next.js 15** (React Framework with App Router)
- **TypeScript** (Strong typing)
- **Tailwind CSS** (Styling)
- **Zustand** (State management)
- **Vercel** (Hosting)
- **Fetch API** (For API requests)

## 📂 Project Structure
```
frontend/
│── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── store/         # Zustand state management
│── public/            # Static assets
│── package.json       # Dependencies
│── .env.local         # Environment variables
```

## ⚙️ Setup & Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/survio-frontend.git
cd survio-frontend
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env.local` file in the root and configure:
```ini
NEXT_PUBLIC_API_URL=http://localhost:5000
```
For production, use your deployed API URL:
```ini
NEXT_PUBLIC_API_URL=https://survio-backend.onrender.com
```

### **4️⃣ Run the Frontend**
```sh
npm run dev
```
The app should now be running at **http://localhost:3000** 🚀

## 🌍 Deployment
### Deploy to **Vercel**
1. **Push code to GitHub**
2. **Go to [Vercel](https://vercel.com/)** → Create new project
3. **Set Environment Variables** (NEXT_PUBLIC_API_URL)
4. **Deploy!** 🚀

## 📜 License
MIT License © 2025 Your Name
