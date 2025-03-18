import { StrictMode } from "react";
import { createRoot } from "react-dom/client";  // Correcto
import 'flowbite';
import App from './App';
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import { ThemeProvider } from './context/ThemeContext.jsx';

const root = createRoot(document.getElementById('root'));  // createRoot correcto
root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
      {/* <Login/> */}
    </ThemeProvider>
  </StrictMode>
);
