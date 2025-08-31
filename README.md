# Social Media Content Analyzer (EngageSense):

This package includes:
- PDF parsing + image OCR (server)
- React multi-page UI: Home, Analyzer, About, Contact
- Atlas-ready: set MONGODB_URI in server/.env to use Atlas (no local MongoDB needed)
- UI improvements: better fonts, navigation, and stylish components


## EngageSense Approach:
EngageSense is a web application that provides AI-driven insights into social media content, emphasizing usability and efficiency. The frontend is built with React and TailwindCSS, offering a clean, responsive interface where users can navigate easily, upload PDFs or images, or paste text for direct analysis. React Router manages seamless page navigation.

The backend uses Node.js and Express to handle file uploads, text extraction, and API routing. Multer manages file uploads, while Tesseract.js and pdf-parse extract text from images and PDFs. Once extracted, the content is analyzed for word count, tone detection, and engagement suggestions using AI-driven logic. MongoDB is optionally used to store user data and analysis history, making the system extendable for future features.

The architecture separates frontend and backend concerns, ensuring modularity and maintainability. Using Vite for frontend development provides fast builds and hot reloading, while Nodemon improves backend development efficiency.

Future improvements include adding sentiment analysis charts, supporting multiple file uploads, creating user dashboards, and integrating with social media APIs for richer insights. Overall, EngageSense combines robust content processing with intelligent analysis in an intuitive interface, helping users optimize social media engagement efficiently and effectively.


## Run locally
1. Backend
   cd server
   cp .env.example .env
## edit server/.env with your Atlas URI if needed
   npm install
   npm run dev
2. Frontend
   cd ../web
   npm install
   npm run dev
Open http://localhost:5173
## Working url
https://github.com/shre-blip/EngageSense-Social-Media-Content-Analyzer-/tree/main
