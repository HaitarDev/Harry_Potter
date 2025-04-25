import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CharactersPage from "./pages/CharactersPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import FavoritesPage from "./pages/FavoritesPage";

// Create a client with better configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Only retry once on failure
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/characters" element={<CharactersPage />} />
              <Route path="/characters/:id" element={<CharacterDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </main>
          <footer
            style={{
              backgroundColor: "var(--wizard-blue)",
              padding: "1rem 0",
              borderTop: "1px solid rgba(201, 166, 107, 0.2)",
            }}
          >
            <div className="container text-center">
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(245, 241, 227, 0.7)",
                }}
              >
                Harry Potter World &copy; {new Date().getFullYear()}
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
