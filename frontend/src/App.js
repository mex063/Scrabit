import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import "@/App.css";
import Layout from "@/components/Layout";
import LandingPage from "@/pages/LandingPage";
import PricingPage from "@/pages/PricingPage";
import BookingPage from "@/pages/BookingPage";
import TrackingPage from "@/pages/TrackingPage";

function App() {
  return (
    <div className="App font-body">
      <BrowserRouter>
        <Toaster
          theme="light"
          position="top-right"
          toastOptions={{
            style: {
              background: '#fff',
              border: '1px solid #e5e5e5',
              fontFamily: 'Manrope, sans-serif',
            }
          }}
        />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/track" element={<TrackingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
