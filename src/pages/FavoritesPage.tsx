import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import CharacterCard from "../components/CharacterCard";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <h1 className="text-center mb-6">My Favorite Characters</h1>

        <div className="mb-8 text-center">
          <Link
            to="/characters"
            className="button"
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "var(--wizard-blue)",
              color: "var(--wizard-parchment)",
              border: "1px solid var(--wizard-gold)",
              borderRadius: "9999px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.9rem",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to All Characters
          </Link>
        </div>

        {favorites.length > 0 ? (
          <>
            <div className="grid grid-cols-1 grid-cols-sm-2 grid-cols-lg-4">
              {favorites.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </>
        ) : (
          <div
            className="py-16 text-center"
            style={{
              backgroundColor: "rgba(13, 27, 42, 0.2)",
              borderRadius: "0.5rem",
              border: "1px dashed rgba(201, 166, 107, 0.3)",
              padding: "2rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>☆</div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              No Favorites Yet!
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              You haven't added any characters to your favorites list.
            </p>
            <Link
              to="/characters"
              className="button"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "var(--wizard-gold)",
                color: "var(--wizard-dark)",
                borderRadius: "9999px",
                display: "inline-block",
                fontWeight: "bold",
              }}
            >
              Browse Characters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
