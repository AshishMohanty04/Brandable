# Brandable - Nutritva

Premium quick-commerce dry fruits, nuts, and superfoods frontend and backend platform inspired by Blinkit and Farmley aesthetics.

---

## 🌟 Highlights & Features

- **Modern Blinkit & Farmley UI**: Signature Blinkit vibrant palette (`#f8cb46` yellow, `#0c831f` emerald green), ultra-clean white product cards, and uncluttered layout.
- **15 Categories (5 × 3 Grid)**:
  1. Almonds (Badam)
  2. Cashews (Kaju)
  3. Pistachios (Pista)
  4. Walnuts (Akhrot)
  5. Raisins (Kishmish)
  6. Dates (Khajur)
  7. Dried Fruits
  8. Seeds
  9. Exotic Nuts
  10. Makhana
  11. Mixed Dry Fruits
  12. Roasted & Flavoured
  13. Trail Mix & Healthy Snacks
  14. Gift Hampers 🎁
  15. Combos & Offers
- **Real High-Resolution Photos**: 100% genuine dry fruit & nut photography stored locally for cashews, pistachios, walnuts, almonds, raisins, dates, figs, seeds, hazelnuts, makhana, and hampers.
- **Interactive Shopping Experience**:
  - Category filter pills with smooth scrolling to catalog
  - Dynamic weight variant switcher (250g, 500g, 1kg) with real-time price updates
  - Slide-out Cart Drawer with quantity adjustment and bill breakdown
  - Search bar filtering
- **Fullstack Ready**:
  - **Frontend**: React 18, TypeScript, Vite, Vanilla CSS responsive grid
  - **Backend**: Spring Boot (Java), REST API controller, CORS configured

---

## 📁 Project Structure

```
Brandable / new nutritva -an/
├── backend/                       # Spring Boot (Java) Backend
│   ├── mvnw & mvnw.cmd            # Maven Wrapper
│   ├── pom.xml                    # Maven configuration
│   └── src/main/java/com/nutritva/backend/
│       ├── NutritvaBackendApplication.java  # Main Spring Boot class
│       ├── config/
│       │   └── CorsConfig.java               # CORS setup for frontend
│       └── controller/
│           └── ApiController.java            # REST endpoint (/api/hello)
├── frontend/                      # React (TypeScript + Vite) Frontend
│   ├── public/images/             # Real product photos
│   ├── src/
│   │   ├── components/            # Navbar, CategoryPills, ProductCard, CartDrawer...
│   │   ├── data/                  # Products & categories dataset
│   │   ├── types/                 # TypeScript interfaces
│   │   ├── App.tsx                # Main application component
│   │   └── index.css              # Custom responsive stylesheet
│   ├── vite.config.ts             # Vite configuration
│   └── package.json
├── package.json                   # Root orchestrator scripts
└── README.md
```

---

## ⚡ How to Run

### Run Both Frontend & Backend Together
```bash
npm run dev
```
- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:8080`

### Run Frontend Only
```bash
cd frontend
npm run dev
```

### Run Backend Only
```bash
cd backend
.\mvnw.cmd spring-boot:run
```
