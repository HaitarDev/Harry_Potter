import { Link } from "react-router-dom";
import { Character } from "../types";
import { useFavorites } from "../hooks/useFavorites";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  // House colors mapping
  const getHouseClass = (house: string): string => {
    const houseMap: { [key: string]: string } = {
      Gryffindor: "gryffindor-border",
      Slytherin: "slytherin-border",
      Ravenclaw: "ravenclaw-border",
      Hufflepuff: "hufflepuff-border",
    };
    return houseMap[house] || "";
  };

  // Placeholder image if no character image is available
  const placeholderImage =
    "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18db84af697%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18db84af697%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.5390625%22%20y%3D%2297.5%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(character);
  };

  const isFav = isFavorite(character.id);

  // Determine faculty status
  const getFacultyStatus = () => {
    if (character.hogwartsStudent) return "Student";
    if (character.hogwartsStaff) return "Staff";
    return null;
  };

  return (
    <Link to={`/characters/${character.id}`}>
      <div
        className={`card ${
          character.house ? getHouseClass(character.house) : ""
        }`}
      >
        <div className="card-image">
          <img
            src={character.image || placeholderImage}
            alt={character.name}
            onError={(e) => {
              e.currentTarget.src = placeholderImage;
            }}
          />
          {character.house && (
            <div className="card-house-badge">{character.house}</div>
          )}
          <button
            className={`favorite-button ${isFav ? "favorite" : ""}`}
            onClick={handleFavoriteClick}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            style={{
              transform: `scale(${isFav ? 1.1 : 1})`,
              transition: "all 0.2s ease",
            }}
          >
            {isFav ? "★" : "☆"}
          </button>
        </div>
        <div className="card-content">
          <h3 className="card-title">{character.name}</h3>
          <div className="card-details">
            {character.species !== "human" && (
              <p>Species: {character.species}</p>
            )}
          </div>
          <div className="card-info">
            {getFacultyStatus() && (
              <div style={{ marginBottom: "0.25rem" }}>
                <strong>Faculty:</strong> {getFacultyStatus()}
              </div>
            )}
            {character.patronus && (
              <div>
                <strong>Patronus:</strong> {character.patronus}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
