# 💼 Financial Dashboard Frontend

A sleek and responsive frontend for the Penta Financial Dashboard project. Built using React, TypeScript, TailwindCSS, and Recharts to visualize user transactions with charts, filters, search, and CSV export.

---

## 🚀 Features

* 🔐 **Authentication**: Signup/Login with JWT integration
* 📋 **Transaction Table**: Filter, search, sort, and paginate user transactions
* 📈 **Charts**: Dynamic line charts showing income vs. expenses by month
* 📤 **CSV Export**: Export selected columns of data with a styled modal UI
* 🌙 **Dark Mode UI**: Modern theme built with TailwindCSS and ShadCN components
* 🔁 **Reactive State**: All filters & charts update live with user input

---

## 🛠️ Tech Stack

* **React** + **Vite** + **TypeScript**
* **TailwindCSS** + **ShadCN UI** + **Radix UI**
* **Recharts** for charts
* **Axios** for API communication

---

## 📁 Project Structure

```
LOOPR-Frontend/
├── src/
│   ├── components/            # Reusable UI components (table, chart, cards, etc.)
│   ├── pages/                 # Page-level views (Index.tsx)
│   ├── data/                  # Static transaction.json
│   ├── hooks/                
│   ├── styles/
│   └── App.tsx               # Main application root
```

---

## 📦 Installation

```bash
cd LOOPR-Frontend
npm install
```

---

## 🧪 Running the Frontend

```bash
npm run dev
```

Starts the frontend app on:

```
http://localhost:8080
```

Ensure your backend is running at `http://localhost:5000`

---

## 🔄 Integration

* Reads from `transactions.json` for demo purposes
* Fully integrates with backend via Axios for authentication and user data
* Charts automatically update based on filtered transactions

---

## 📊 Components Overview

* `TransactionTable.tsx`: Search, sort, filter, CSV export
* `ChartSection.tsx`: Income vs. Expenses over time
* `DashboardCards.tsx`: Key financial metrics
* `SignupForm.tsx` / `LoginForm.tsx`: Auth UI
* `CSVExportModal.tsx`: Column selection and export

---

## 🌍 Environment Variables

For CORS and API calls:

```ts
VITE_BACKEND_URL=http://localhost:5000
```

Use in axios instance:

```ts
axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });
```

---

## 🧑‍💻 Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build production-ready app
```

---

## 🧠 Assignment Highlights

* Fully dynamic UI ✅
* Auth-integrated dashboard ✅
* Chart and table sync ✅
* CSV Export ✅
* Dark mode responsive layout ✅

---

Built with ❤️ using React, TypeScript, and TailwindCSS.
