// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";  // Correcto
// import App from './App';
// import "./index.css";
// import "swiper/swiper-bundle.css";
// import "simplebar-react/dist/simplebar.min.css";
// import { ThemeProvider } from './context/ThemeContext.jsx';
// import { AuthProvider } from "./context/AuthContext.jsx";

// const root = createRoot(document.getElementById('root'));  // createRoot correcto
// root.render(
//   <StrictMode>
//     <AuthProvider>
//     <ThemeProvider>
//       <App />
//     </ThemeProvider>
//     </AuthProvider>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom"; 

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);