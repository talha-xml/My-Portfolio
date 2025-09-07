import React, { useState } from "react";
import "./pokedex.css";

function PokemonFetcher()
 {
  const [searchValue, setSearchValue] = useState("");
  const [pokemonData, setPokemonData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPokemon = async (e) => 
    {
     e.preventDefault();
    if (!searchValue.trim()) 
        {
      setError("Please enter a Pokémon name or ID.");
      return;
    }

    setLoading(true);
    setError("");
    setPokemonData(null);

    try {
      const query = searchValue.toLowerCase().trim();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

      if (!response.ok){
        throw new Error("Pokémon not found!");
      }

      const data = await response.json();
      setPokemonData(data);

    } catch (err)
     {
      setError(err.message);
    } finally 
    {
      setLoading(false);
    }
  };

  return (
    <div className="pokedex-container">
      <h1 className="pokedex-title">Pokédex</h1>
      <form className="search-box" onSubmit={fetchPokemon}>
        <input autoFocus type="text" placeholder="Enter Pokémon name or ID" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {pokemonData && (
        <div className="pokemon-card">
          <h2 className="pokemon-name">
            #{pokemonData.id} {pokemonData.name}
          </h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="pokemon-image"/>
          <p>
            <strong>Type:</strong>
            {pokemonData.types.map((t) => t.type.name).join(", ")}
          </p>
          <h3>Base Stats:</h3>
          <ul>
            {pokemonData.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default PokemonFetcher