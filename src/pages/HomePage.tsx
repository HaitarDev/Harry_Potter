import { Link } from "react-router-dom";
import {
  useHogwartsStudents,
  useHouseMembers,
} from "../hooks/useHarryPotterApi";
import CharacterCard from "../components/CharacterCard";
import Loading from "../components/Loading";

const HomePage = () => {
  // Fetch a few students to feature on the homepage
  const { data: students, isLoading } = useHogwartsStudents();
  // Fetch Slytherin house members for the showcase
  const { data: slytherinMembers, isLoading: isLoadingSlytherin } =
    useHouseMembers("Slytherin");

  // Get the first 4 students to feature
  const featuredStudents = students?.slice(0, 4) || [];
  // Get 4 prominent Slytherin members for showcase
  const slytherinShowcase = slytherinMembers?.slice(0, 4) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="py-16"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13, 27, 42, 0.9), rgba(13, 27, 42, 0.95)), url(/src/assets/images/parchment-texture.jpg)",
        }}
      >
        <div className="container text-center py-16">
          <h1 className="mb-6" style={{ fontSize: "3.8rem" }}>
            Harry Potter World
          </h1>
          <p
            className="mb-8"
            style={{ fontSize: "1.25rem", maxWidth: "800px", margin: "0 auto" }}
          >
            Explore the magical universe of Harry Potter characters, spells, and
            lore from the wizarding world.
          </p>
          <div className="flex justify-center">
            <Link to="/characters" className="button">
              Explore Characters
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Characters Section */}
      <div className="py-16" style={{ backgroundColor: "var(--wizard-blue)" }}>
        <div className="container">
          <h2 className="text-center mb-12">Featured Hogwarts Students</h2>

          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 grid-cols-sm-2 grid-cols-lg-4">
              {featuredStudents.map((student) => (
                <CharacterCard key={student.id} character={student} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/characters" className="button">
              View All Characters
            </Link>
          </div>
        </div>
      </div>

      {/* House Spotlight: Slytherin Showcase */}
      <div
        className="py-16"
        style={{
          backgroundColor: "var(--wizard-dark)",
          backgroundImage:
            "radial-gradient(circle, rgba(26, 71, 42, 0.2) 0%, rgba(13, 27, 42, 0.9) 70%)",
          borderTop: "1px solid rgba(26, 71, 42, 0.5)",
          borderBottom: "1px solid rgba(26, 71, 42, 0.5)",
        }}
      >
        <div className="container">
          <div className="mb-12">
            <h2 className="text-center mb-3">House Spotlight</h2>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div
                style={{
                  height: "2px",
                  width: "40px",
                  backgroundColor: "var(--slytherin)",
                }}
              ></div>
              <h3
                style={{
                  color: "#9CA3AF",
                  letterSpacing: "3px",
                  fontSize: "1.8rem",
                  textTransform: "uppercase",
                }}
              >
                Slytherin
              </h3>
              <div
                style={{
                  height: "2px",
                  width: "40px",
                  backgroundColor: "var(--slytherin)",
                }}
              ></div>
            </div>
            <p
              className="text-center"
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                color: "var(--wizard-parchment)",
              }}
            >
              Home to some of the most cunning and ambitious wizards, Slytherin
              house values ambition, leadership, resourcefulness, and cunning.
            </p>
          </div>

          {isLoadingSlytherin ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 grid-cols-sm-2 grid-cols-lg-4">
              {slytherinShowcase.map((member) => (
                <CharacterCard key={member.id} character={member} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/characters"
              className="button"
              style={{
                backgroundColor: "var(--slytherin)",
                color: "var(--wizard-parchment)",
              }}
              onClick={() => {
                // Store Slytherin filter preference in sessionStorage
                sessionStorage.setItem("activeHouse", "Slytherin");
              }}
            >
              View All Slytherin Members
            </Link>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="py-16">
        <div className="container text-center">
          <blockquote
            className="mb-4"
            style={{
              fontSize: "1.5rem",
              fontStyle: "italic",
              borderLeft: "4px solid var(--wizard-gold)",
              paddingLeft: "1.5rem",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            "Happiness can be found even in the darkest of times, if one only
            remembers to turn on the light."
          </blockquote>
          <p style={{ color: "var(--wizard-gold)" }}>— Albus Dumbledore</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
