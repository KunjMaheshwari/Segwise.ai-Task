# Segwise Frontend Test

## 🚀 Project Overview
This project is a **React.js** application that transforms a **Figma design** into a fully functional UI. It includes interactive filtering, sorting, and data display features based on a given **CSV dataset**.

## 🎯 Features
- **Filters**: Users can apply multiple filters to refine data.
- **Sortable Table**: Supports sorting columns in ascending/descending order.
- **Search Functionality**: Enables users to quickly find data.
- **Interactive Row Preview**: Clicking a row displays a small preview of its details in the bottom-right corner.
- **Expandable Modal (Bonus Feature)**: Clicking the preview expands it into a full modal with complete row details.

## 🏗️ Tech Stack
- **React.js** (Frontend framework)
- **TypeScript** (Ensures type safety)
- **Tailwind CSS** (For styling)
- **Papaparse** (For parsing CSV data)
- **React Table** (For table management)
- **Vercel/Netlify** (For deployment)

## 📂 File Structure
```
├── src
│   ├── components
│   │   ├── FilterDropdown.tsx
│   │   ├── Table.tsx
│   │   ├── RowPreview.tsx
│   │   ├── Modal.tsx
│   ├── utils
│   │   ├── parseCSV.ts
│   ├── App.tsx
│   ├── index.tsx
│   ├── styles.css
├── public
│   ├── assets
├── README.md
```

## 📥 Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/segwise-frontend.git
   cd segwise-frontend
   ```
2. **Install dependencies**
   ```sh
   npm install  # or yarn install
   ```
3. **Start the development server**
   ```sh
   npm run dev  # or yarn dev
   ```
4. **Open in Browser**
   ```
   http://localhost:5173
   ```

## 🗄️ Loading & Parsing CSV Data
- The CSV file (`segwise_report.csv`) is loaded and parsed using `papaparse`.
- Data is converted into JSON and stored in **React state**.

## 🔍 How Filters Work
1. Click on the **Filters** button.
2. Select a **category** (e.g., Country, OS, Tags).
3. Choose a **value** or condition (e.g., “Equals”, “Lesser than”).
4. Apply the filter and see results update dynamically.

## 🚀 Deployment
Deploy the project using **Vercel** or **Netlify**:
1. **Build the project:**
   ```sh
   npm run build
   ```
2. **Deploy on Vercel**:
   ```sh
   vercel
   ```

## 📜 License
This project is **open-source** and available under the **MIT License**.

## ✨ Contact
For questions, reach out via GitHub issues or email at [kunj.maheshwari2021@vitbhopal.ac.in](mailto:kunj.maheshwari2021@vitbhopal.ac.in).

