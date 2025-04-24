import { useParams, Link } from "react-router-dom";
import { useCharacter } from "../hooks/useHarryPotterApi";
import { useFavorites } from "../hooks/useFavorites";
import Loading from "../components/Loading";
import { useState } from "react";
import { Character } from "../types";

const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: character, isLoading, isError } = useCharacter(id || "");
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState("info");

  // Placeholder image if no character image is available
  const placeholderImage =
    "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18db84af697%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18db84af697%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.5390625%22%20y%3D%2297.5%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";

  // Helper function to get house color
  const getHouseColor = (house: string): string => {
    const colors: { [key: string]: string } = {
      Gryffindor: "var(--gryffindor)",
      Slytherin: "var(--slytherin)",
      Ravenclaw: "var(--ravenclaw)",
      Hufflepuff: "var(--hufflepuff)",
    };
    return colors[house] || "";
  };

  // Mock data for the biography and appearances (not provided by the API)
  const getBiography = (character: Character | undefined): string => {
    if (!character) return "";

    // Generate a biography based on available character data
    let bio = `${character.name} is `;

    if (character.alive) {
      bio += "a living ";
    } else {
      bio += "a deceased ";
    }

    if (character.species !== "human") {
      bio += `${character.species} `;
    }

    if (character.wizard) {
      bio += "wizard ";
    } else {
      bio += "character ";
    }

    if (character.house) {
      bio += `from ${character.house} house. `;
    } else {
      bio += "with no specific Hogwarts house. ";
    }

    if (character.ancestry) {
      bio += `${character.name} comes from a ${character.ancestry} family background. `;
    }

    if (character.hogwartsStudent) {
      bio += `${character.name} is a student at Hogwarts School of Witchcraft and Wizardry. `;
    } else if (character.hogwartsStaff) {
      bio += `${character.name} is a staff member at Hogwarts School of Witchcraft and Wizardry. `;
    }

    if (character.wand && (character.wand.wood || character.wand.core)) {
      bio += `Their wand is made of ${
        character.wand.wood || "unknown wood"
      } with a ${character.wand.core || "unknown"} core. `;
    }

    if (character.patronus) {
      bio += `Their Patronus takes the form of a ${character.patronus}. `;
    }

    return bio;
  };

  // Mock data for appearances
  const getAppearances = () => {
    return {
      books: [
        "Harry Potter and the Philosopher's Stone",
        "Harry Potter and the Chamber of Secrets",
        "Harry Potter and the Prisoner of Azkaban",
        "Harry Potter and the Goblet of Fire",
        "Harry Potter and the Order of the Phoenix",
        "Harry Potter and the Half-Blood Prince",
        "Harry Potter and the Deathly Hallows",
      ],
      films: [
        "Harry Potter and the Philosopher's Stone",
        "Harry Potter and the Chamber of Secrets",
        "Harry Potter and the Prisoner of Azkaban",
        "Harry Potter and the Goblet of Fire",
        "Harry Potter and the Order of the Phoenix",
        "Harry Potter and the Half-Blood Prince",
        "Harry Potter and the Deathly Hallows – Part 1",
        "Harry Potter and the Deathly Hallows – Part 2",
      ],
    };
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Character Not Found</h2>
          <p className="mb-6">
            The wizard you're looking for seems to have disapparated.
          </p>
          <Link to="/characters" className="button">
            Return to Characters
          </Link>
        </div>
      </div>
    );
  }

  // Only show those appearances that are likely for this character
  const appearances = getAppearances();
  const bio = getBiography(character);

  return (
    <div className="min-h-screen" style={{ paddingBottom: "60px" }}>
      {/* Hero Banner */}
      <div
        className="py-12"
        style={{
          backgroundColor: character.house
            ? getHouseColor(character.house) + "30"
            : "var(--wizard-blue)",
          borderBottom: `1px solid ${
            character.house
              ? getHouseColor(character.house)
              : "var(--wizard-gold)"
          }`,
        }}
      >
        <div className="container">
          {/* Improved Back Button with better hover effect */}
          <Link
            to="/characters"
            className="inline-flex items-center gap-1 mb-6 px-4 py-2 rounded-md"
            style={{
              color: "var(--wizard-gold)",
              border: "1px solid var(--wizard-gold)",
              background: "rgba(13, 27, 42, 0.7)",
              width: "fit-content",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(201, 166, 107, 0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(13, 27, 42, 0.7)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Characters
          </Link>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div style={{ maxWidth: "300px", width: "100%" }}>
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: "0.5rem",
                    border: `3px solid ${
                      character.house
                        ? getHouseColor(character.house)
                        : "var(--wizard-gold)"
                    }`,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <img
                    src={character.image || placeholderImage}
                    alt={character.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.currentTarget.src = placeholderImage;
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between gap-2">
                  <h1 className="mb-2">{character.name}</h1>
                  <button
                    onClick={() => toggleFavorite(character)}
                    // className="favorite-button"
                    style={{
                      backgroundColor: "var(--wizard-blue)",
                      border: "1px solid var(--wizard-gold)",
                      color: "var(--wizard-gold)",
                      padding: "0.25rem 0.25rem",
                      borderRadius: "2rem",
                      height: "3rem",
                      fontSize: "0.9rem",
                      transition: "all 0.2s ease",
                    }}
                    className="flex items-center justify-center"
                    aria-label={
                      isFavorite(character.id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <span style={{ fontSize: "1.2rem" }}>
                      {isFavorite(character.id) ? "★" : "☆"}
                    </span>
                    {isFavorite(character.id)
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </button>
                </div>
                <div className="flex gap-2 mt-2 mb-2">
                  {character.house && (
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        backgroundColor: getHouseColor(character.house),
                        color: "var(--wizard-parchment)",
                      }}
                    >
                      {character.house}
                    </span>
                  )}

                  {character.hogwartsStudent && (
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.875rem",
                        backgroundColor: "var(--wizard-blue)",
                        color: "var(--wizard-parchment)",
                        border: "1px solid var(--wizard-gold)",
                      }}
                    >
                      Student
                    </span>
                  )}

                  {character.hogwartsStaff && (
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.875rem",
                        backgroundColor: "var(--wizard-blue)",
                        color: "var(--wizard-parchment)",
                        border: "1px solid var(--wizard-gold)",
                      }}
                    >
                      Staff
                    </span>
                  )}

                  {character.alive ? (
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.875rem",
                        backgroundColor: "#10B981",
                        color: "white",
                      }}
                    >
                      Alive
                    </span>
                  ) : (
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.875rem",
                        backgroundColor: "#EF4444",
                        color: "white",
                      }}
                    >
                      Deceased
                    </span>
                  )}
                </div>

                <p className="mb-4" style={{ maxWidth: "600px" }}>
                  {bio}
                </p>

                {character.actor && (
                  <div className="mt-4">
                    <p>
                      <strong>Portrayed by:</strong> {character.actor}
                    </p>
                    {character.alternate_actors &&
                      character.alternate_actors.length > 0 && (
                        <p className="mt-1">
                          <strong>Also portrayed by:</strong>{" "}
                          {character.alternate_actors.join(", ")}
                        </p>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Improved Tabs Navigation with more spacing */}
      <div
        className="py-4"
        style={{
          backgroundColor: "var(--wizard-blue)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          marginBottom: "2rem",
        }}
      >
        <div className="container">
          <div
            className="flex justify-center gap-2"
            style={{ position: "relative", padding: "0.5rem" }}
          >
            {["info", "biography", "appearances"].map((tab) => {
              const isActive = activeTab === tab;
              const tabName =
                tab === "info"
                  ? "Details"
                  : tab === "biography"
                  ? "Biography"
                  : "Appearances";

              return (
                <button
                  key={tab}
                  className="py-4 px-8 mx-3 relative"
                  style={{
                    color: isActive
                      ? "var(--wizard-gold)"
                      : "var(--wizard-parchment)",
                    fontFamily: "var(--font-spellbook)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontSize: "0.95rem",
                    background: isActive
                      ? "rgba(201, 166, 107, 0.1)"
                      : "transparent",
                    border: "none",
                    borderTopLeftRadius: "4px",
                    borderTopRightRadius: "4px",
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                  }}
                  onClick={() => setActiveTab(tab)}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background =
                        "rgba(201, 166, 107, 0.05)";
                      e.currentTarget.style.color = "rgba(201, 166, 107, 0.8)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--wizard-parchment)";
                    }
                  }}
                >
                  {tabName}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "3px",
                        background: "var(--wizard-gold)",
                        boxShadow: "0 0 8px var(--wizard-gold)",
                      }}
                    ></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content - Fixed layout to avoid footer overlap */}
      <div
        className="container"
        style={{ minHeight: "50vh", marginBottom: "3rem" }}
      >
        {/* Details Tab - Improved layout */}
        {activeTab === "info" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column */}
            <div
              className="card"
              style={{
                padding: "1.5rem",
                height: "fit-content",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h3
                className="mb-6"
                style={{
                  borderBottom: "1px solid rgba(201, 166, 107, 0.3)",
                  paddingBottom: "0.75rem",
                  fontSize: "1.5rem",
                }}
              >
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem label="Full Name" value={character.name} />
                {character.alternate_names &&
                  character.alternate_names.length > 0 && (
                    <DetailItem
                      label="Alternate Names"
                      value={character.alternate_names.join(", ")}
                    />
                  )}
                <DetailItem
                  label="Species"
                  value={character.species || "Unknown"}
                />
                <DetailItem
                  label="Gender"
                  value={character.gender || "Unknown"}
                />
                <DetailItem
                  label="House"
                  value={character.house || "Unknown"}
                />
                <DetailItem
                  label="Date of Birth"
                  value={character.dateOfBirth || "Unknown"}
                />
                <DetailItem
                  label="Year of Birth"
                  value={
                    character.yearOfBirth
                      ? character.yearOfBirth.toString()
                      : "Unknown"
                  }
                />
                <DetailItem
                  label="Ancestry"
                  value={character.ancestry || "Unknown"}
                />
                <DetailItem
                  label="Eye Color"
                  value={character.eyeColour || "Unknown"}
                />
                <DetailItem
                  label="Hair Color"
                  value={character.hairColour || "Unknown"}
                />
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-8">
              {/* Wand Information */}
              {character.wand &&
                (character.wand.wood ||
                  character.wand.core ||
                  character.wand.length) && (
                  <div
                    className="card"
                    style={{
                      padding: "1.5rem",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <h3
                      className="mb-6"
                      style={{
                        borderBottom: "1px solid rgba(201, 166, 107, 0.3)",
                        paddingBottom: "0.75rem",
                        fontSize: "1.5rem",
                      }}
                    >
                      Wand
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <DetailItem
                        label="Wood"
                        value={character.wand.wood || "Unknown"}
                      />
                      <DetailItem
                        label="Core"
                        value={character.wand.core || "Unknown"}
                      />
                      <DetailItem
                        label="Length"
                        value={
                          character.wand.length
                            ? `${character.wand.length} inches`
                            : "Unknown"
                        }
                      />
                    </div>
                  </div>
                )}

              {/* Magical Abilities */}
              <div
                className="card"
                style={{
                  padding: "1.5rem",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                }}
              >
                <h3
                  className="mb-6"
                  style={{
                    borderBottom: "1px solid rgba(201, 166, 107, 0.3)",
                    paddingBottom: "0.75rem",
                    fontSize: "1.5rem",
                  }}
                >
                  Magical Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailItem
                    label="Wizard/Witch"
                    value={character.wizard ? "Yes" : "No"}
                  />
                  <DetailItem
                    label="Patronus"
                    value={character.patronus || "Unknown"}
                  />
                  <DetailItem
                    label="Hogwarts Student"
                    value={character.hogwartsStudent ? "Yes" : "No"}
                  />
                  <DetailItem
                    label="Hogwarts Staff"
                    value={character.hogwartsStaff ? "Yes" : "No"}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Biography Tab */}
        {activeTab === "biography" && (
          <div
            className="card"
            style={{
              padding: "2rem",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3
              className="mb-6"
              style={{
                borderBottom: "1px solid rgba(201, 166, 107, 0.3)",
                paddingBottom: "0.75rem",
                fontSize: "1.5rem",
              }}
            >
              Biography
            </h3>
            <p style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>{bio}</p>
            <p
              className="mt-6"
              style={{
                fontSize: "0.875rem",
                color: "var(--wizard-parchment)",
                opacity: 0.7,
                fontStyle: "italic",
                paddingTop: "1rem",
                borderTop: "1px solid rgba(201, 166, 107, 0.1)",
              }}
            >
              Note: Biography information is generated based on available data
              and may not reflect the complete canonical story.
            </p>
          </div>
        )}

        {/* Appearances Tab */}
        {activeTab === "appearances" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="card"
              style={{
                padding: "2rem",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h3
                className="mb-6"
                style={{
                  borderBottom: "1px solid rgba(201, 166, 107, 0.3)",
                  paddingBottom: "0.75rem",
                  fontSize: "1.5rem",
                }}
              >
                Book Appearances
              </h3>
              <ul style={{ listStyleType: "none", paddingLeft: "0.5rem" }}>
                {appearances.books.map((book, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "0.75rem",
                      paddingLeft: "1.5rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: "0",
                        top: "0.5rem",
                        width: "6px",
                        height: "6px",
                        backgroundColor: "var(--wizard-gold)",
                        borderRadius: "50%",
                      }}
                    ></span>
                    {book}
                  </li>
                ))}
              </ul>
              <p
                className="mt-6"
                style={{
                  fontSize: "0.875rem",
                  color: "var(--wizard-parchment)",
                  opacity: 0.7,
                  fontStyle: "italic",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(201, 166, 107, 0.1)",
                }}
              >
                Note: Appearances are generalized and may not be accurate for
                this specific character.
              </p>
            </div>

            <div
              className="card"
              style={{
                padding: "2rem",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h3
                className="mb-6"
                style={{
                  borderBottom: "1px solid rgba(201, 166, 107, 0.3)",
                  paddingBottom: "0.75rem",
                  fontSize: "1.5rem",
                }}
              >
                Film Appearances
              </h3>
              <ul style={{ listStyleType: "none", paddingLeft: "0.5rem" }}>
                {appearances.films.map((film, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "0.75rem",
                      paddingLeft: "1.5rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: "0",
                        top: "0.5rem",
                        width: "6px",
                        height: "6px",
                        backgroundColor: "var(--wizard-gold)",
                        borderRadius: "50%",
                      }}
                    ></span>
                    {film}
                  </li>
                ))}
              </ul>
              <p
                className="mt-6"
                style={{
                  fontSize: "0.875rem",
                  color: "var(--wizard-parchment)",
                  opacity: 0.7,
                  fontStyle: "italic",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(201, 166, 107, 0.1)",
                }}
              >
                Note: Appearances are generalized and may not be accurate for
                this specific character.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Detail Item component for consistent formatting
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div style={{ marginBottom: "1rem" }}>
    <span
      style={{
        display: "block",
        fontSize: "0.875rem",
        color: "var(--wizard-gold)",
        marginBottom: "0.25rem",
        fontWeight: "bold",
      }}
    >
      {label}
    </span>
    <span
      style={{
        display: "block",
        paddingLeft: "0.5rem",
        borderLeft: "2px solid rgba(201, 166, 107, 0.3)",
      }}
    >
      {value}
    </span>
  </div>
);

export default CharacterDetailPage;
