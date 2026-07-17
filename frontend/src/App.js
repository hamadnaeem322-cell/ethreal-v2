import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Navigation } from "@/components/Navigation";
import { HeroScroll } from "@/components/HeroScroll";
import { Story } from "@/components/Story";
import { VisualProcess } from "@/components/VisualProcess";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Landing = () => {
  return (
    <main data-testid="landing-page" className="bg-[#050505] text-[#f2ebe5]">
      <Navigation />
      <HeroScroll />
      <Story />
      <VisualProcess />
      <Contact />
      <Footer />
      <Toaster
        position="bottom-center"
        theme="dark"
        toastOptions={{
          style: {
            background: "#0a0a0a",
            color: "#f2ebe5",
            border: "1px solid rgba(200,159,112,0.3)",
            borderRadius: 0,
            fontFamily: "Manrope, sans-serif",
            letterSpacing: "0.04em",
          },
        }}
      />
    </main>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
