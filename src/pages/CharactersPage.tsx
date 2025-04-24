import { useState, useEffect } from "react";
import { useCharacters } from "../hooks/useHarryPotterApi";
import CharacterCard from "../components/CharacterCard";
import Loading from "../components/Loading";
import HouseInfo from "../components/HouseInfo";

const CharactersPage = () => {
  const { data: characters, isLoading } = useCharacters();
  const [activeHouse, setActiveHouse] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 12;

  // Check for stored house filter preference
  useEffect(() => {
    const storedHouse = sessionStorage.getItem("activeHouse");
    if (storedHouse) {
      setActiveHouse(storedHouse);
      // Clear the stored preference after using it
      sessionStorage.removeItem("activeHouse");
    }
  }, []);

  // Filter characters based on selected house and search term
  const filteredCharacters = characters?.filter((character) => {
    const matchesHouse = activeHouse ? character.house === activeHouse : true;
    const matchesSearch = searchTerm
      ? character.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesHouse && matchesSearch;
  });

  // Calculate pagination values
  const totalPages = filteredCharacters
    ? Math.ceil(filteredCharacters.length / charactersPerPage)
    : 0;

  // Get current page characters
  const currentCharacters = filteredCharacters
    ? filteredCharacters.slice(
        (currentPage - 1) * charactersPerPage,
        currentPage * charactersPerPage
      )
    : [];

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Show a window of pages around the current page instead of all pages
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Houses for filtering
  const houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <h1 className="text-center mb-12">Wizarding Characters</h1>

        {/* Filters */}
        <div
          className="mb-8"
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div className="flex" style={{ flexWrap: "wrap", gap: "0.5rem" }}>
            <button
              onClick={() => {
                setActiveHouse("");
                setCurrentPage(1);
              }}
              className="button"
              style={{
                backgroundColor:
                  activeHouse === ""
                    ? "var(--wizard-gold)"
                    : "var(--wizard-blue)",
                borderRadius: "9999px",
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                color:
                  activeHouse === ""
                    ? "var(--wizard-dark)"
                    : "var(--wizard-parchment)",
              }}
              aria-pressed={activeHouse === ""}
            >
              All
            </button>
            {houses.map((house) => (
              <button
                key={house}
                onClick={() => {
                  setActiveHouse(house);
                  setCurrentPage(1);
                }}
                className="button"
                style={{
                  backgroundColor:
                    activeHouse === house
                      ? getHouseColor(house)
                      : "var(--wizard-blue)",
                  borderRadius: "9999px",
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
                  color: "var(--wizard-parchment)",
                  border:
                    activeHouse === house
                      ? "none"
                      : "1px solid var(--wizard-gold)",
                }}
                aria-pressed={activeHouse === house}
              >
                {house}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="character-search" className="sr-only">
              Search characters
            </label>
            <input
              id="character-search"
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search characters..."
              style={{
                width: "100%",
                maxWidth: "300px",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                backgroundColor: "var(--wizard-blue)",
                border: "1px solid rgba(201, 166, 107, 0.3)",
                color: "var(--wizard-parchment)",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Display House Information if a house is selected */}
        {activeHouse && (
          <div className="mb-10">
            <HouseInfo house={activeHouse} />
          </div>
        )}

        {/* Characters Grid */}
        {isLoading ? (
          <Loading />
        ) : filteredCharacters?.length ? (
          <>
            <div className="grid grid-cols-1 grid-cols-sm-2 grid-cols-lg-4">
              {currentCharacters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div
                className="flex items-center justify-center gap-2"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="button"
                  style={{
                    backgroundColor: "var(--wizard-blue)",
                    padding: "0.5rem 0.75rem",
                    opacity: currentPage === 1 ? 0.5 : 1,
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    border: "1px solid var(--wizard-gold)",
                    color: "var(--wizard-parchment)",
                    fontSize: "1.4rem",
                  }}
                  aria-label="Go to first page"
                >
                  &laquo;
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="button"
                  style={{
                    backgroundColor: "var(--wizard-blue)",
                    padding: "0.5rem 0.75rem",
                    opacity: currentPage === 1 ? 0.5 : 1,
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    border: "1px solid var(--wizard-gold)",
                    color: "var(--wizard-parchment)",
                    fontSize: "1.4rem",
                  }}
                  aria-label="Go to previous page"
                >
                  &lsaquo;
                </button>

                {getPageNumbers()[0] > 1 && (
                  <>
                    <button
                      onClick={() => handlePageChange(1)}
                      className="button"
                      style={{
                        backgroundColor: "var(--wizard-blue)",
                        padding: "0.5rem 0.75rem",
                        border: "1px solid var(--wizard-gold)",
                        color: "var(--wizard-parchment)",
                      }}
                      aria-label={`Go to page 1`}
                    >
                      1
                    </button>
                    {getPageNumbers()[0] > 2 && (
                      <span
                        className="mx-1"
                        style={{ color: "var(--wizard-parchment)" }}
                      >
                        ...
                      </span>
                    )}
                  </>
                )}

                {getPageNumbers().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className="button"
                    style={{
                      backgroundColor:
                        pageNumber === currentPage
                          ? "var(--wizard-gold)"
                          : "var(--wizard-blue)",
                      padding: "0.5rem 0.75rem",
                      border: "1px solid var(--wizard-gold)",
                      color:
                        pageNumber === currentPage
                          ? "var(--wizard-blue)"
                          : "var(--wizard-parchment)",
                    }}
                    aria-label={`Go to page ${pageNumber}`}
                    aria-current={
                      pageNumber === currentPage ? "page" : undefined
                    }
                  >
                    {pageNumber}
                  </button>
                ))}

                {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                  <>
                    {getPageNumbers()[getPageNumbers().length - 1] <
                      totalPages - 1 && (
                      <span
                        className="mx-1"
                        style={{ color: "var(--wizard-parchment)" }}
                      >
                        ...
                      </span>
                    )}
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="button"
                      style={{
                        backgroundColor: "var(--wizard-blue)",
                        padding: "0.5rem 0.75rem",
                        border: "1px solid var(--wizard-gold)",
                        color: "var(--wizard-parchment)",
                      }}
                      aria-label={`Go to page ${totalPages}`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="button"
                  style={{
                    backgroundColor: "var(--wizard-blue)",
                    padding: "0.5rem 0.75rem",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    cursor:
                      currentPage === totalPages ? "not-allowed" : "pointer",
                    border: "1px solid var(--wizard-gold)",
                    color: "var(--wizard-parchment)",
                    fontSize: "1.4rem",
                  }}
                  aria-label="Go to next page"
                >
                  &rsaquo;
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p style={{ fontSize: "1.25rem" }}>
              No characters found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper to get house color for buttons
const getHouseColor = (house: string): string => {
  const colors: { [key: string]: string } = {
    Gryffindor: "var(--gryffindor)",
    Slytherin: "var(--slytherin)",
    Ravenclaw: "var(--ravenclaw)",
    Hufflepuff: "var(--hufflepuff)",
  };
  return colors[house] || "";
};

export default CharactersPage;
