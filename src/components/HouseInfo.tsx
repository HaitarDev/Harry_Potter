import React from "react";

type HouseName = "Gryffindor" | "Slytherin" | "Ravenclaw" | "Hufflepuff";

interface HouseData {
  colors: string[];
  animal: string;
  element: string;
  traits: string[];
  founder: string;
  description: string;
  symbol: string;
}

interface HouseDataMap {
  [key: string]: HouseData;
}

interface HouseInfoProps {
  house: HouseName | string;
}

const HouseInfo: React.FC<HouseInfoProps> = ({ house }) => {
  // House data
  const houseData: HouseDataMap = {
    Gryffindor: {
      colors: ["Scarlet", "Gold"],
      animal: "Lion",
      element: "Fire",
      traits: ["Bravery", "Courage", "Nerve", "Chivalry"],
      founder: "Godric Gryffindor",
      description:
        "Gryffindor values courage, bravery, nerve, and chivalry. Gryffindor's mascot is the lion, and its colors are scarlet and gold. The house emphasizes the traits of courage and chivalry, and its members are typically brave and fearless in the face of adversity.",
      symbol: "♌",
    },
    Slytherin: {
      colors: ["Green", "Silver"],
      animal: "Serpent",
      element: "Water",
      traits: ["Ambition", "Cunning", "Leadership", "Resourcefulness"],
      founder: "Salazar Slytherin",
      description:
        "Slytherin values ambition, cunning, leadership, and resourcefulness. Slytherin's mascot is the serpent, and its colors are green and silver. The house emphasizes traits of ambition and cunning, and its members are typically shrewd and determined to achieve their goals.",
      symbol: "🐍",
    },
    Ravenclaw: {
      colors: ["Blue", "Bronze"],
      animal: "Eagle",
      element: "Air",
      traits: ["Intelligence", "Creativity", "Learning", "Wit"],
      founder: "Rowena Ravenclaw",
      description:
        "Ravenclaw values intelligence, creativity, learning, and wit. Ravenclaw's mascot is the eagle, and its colors are blue and bronze. The house emphasizes traits of wisdom and intelligence, and its members are typically academically motivated and scholarly.",
      symbol: "🦅",
    },
    Hufflepuff: {
      colors: ["Yellow", "Black"],
      animal: "Badger",
      element: "Earth",
      traits: ["Hard work", "Patience", "Justice", "Loyalty"],
      founder: "Helga Hufflepuff",
      description:
        "Hufflepuff values hard work, patience, justice, and loyalty. Hufflepuff's mascot is the badger, and its colors are yellow and black. The house emphasizes the traits of hard work and dedication, and its members are typically reliable, loyal, and have a strong sense of fair play.",
      symbol: "🦡",
    },
  };

  if (!house || !houseData[house]) {
    return null;
  }

  const info = houseData[house];
  const houseColor = getHouseColor(house);

  return (
    <div
      className="house-info-card"
      style={{
        backgroundColor: "var(--wizard-blue)",
        border: `2px solid ${houseColor}`,
        borderRadius: "0.5rem",
        padding: "1.5rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className="house-symbol"
        style={{
          position: "absolute",
          top: "-15px",
          right: "-5px",
          fontSize: "6rem",
          opacity: "0.2",
          transform: "rotate(15deg)",
          color: houseColor,
          zIndex: 0,
        }}
      >
        {info.symbol}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h3
          style={{
            fontFamily: "var(--font-spellbook)",
            fontSize: "1.75rem",
            marginBottom: "1rem",
            color: houseColor,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "1.5rem",
              marginRight: "0.5rem",
            }}
          >
            {info.symbol}
          </span>
          House {house}
        </h3>

        <div className="house-details">
          <div
            className="house-colors"
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "1rem",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "bold", color: "var(--wizard-gold)" }}>
              Colors:
            </span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {info.colors.map((color: string, index: number) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "1rem",
                      height: "1rem",
                      backgroundColor: color.toLowerCase(),
                      borderRadius: "50%",
                      border: "1px solid var(--wizard-parchment)",
                    }}
                  ></span>
                  <span>{color}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "0.75rem" }}>
            <span style={{ fontWeight: "bold", color: "var(--wizard-gold)" }}>
              Founded by:
            </span>{" "}
            {info.founder}
          </div>

          <div style={{ marginBottom: "0.75rem" }}>
            <span style={{ fontWeight: "bold", color: "var(--wizard-gold)" }}>
              Mascot:
            </span>{" "}
            {info.animal}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <span style={{ fontWeight: "bold", color: "var(--wizard-gold)" }}>
              Element:
            </span>{" "}
            {info.element}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                fontWeight: "bold",
                color: "var(--wizard-gold)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Values:
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {info.traits.map((trait: string, index: number) => (
                <span
                  key={index}
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    border: `1px solid ${houseColor}`,
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <p style={{ lineHeight: "1.6" }}>{info.description}</p>
        </div>
      </div>
    </div>
  );
};

// Helper function to get house color
const getHouseColor = (house: string): string => {
  const colors: { [key: string]: string } = {
    Gryffindor: "var(--gryffindor)",
    Slytherin: "var(--slytherin)",
    Ravenclaw: "var(--ravenclaw)",
    Hufflepuff: "var(--hufflepuff)",
  };
  return colors[house] || "var(--wizard-gold)";
};

export default HouseInfo;
