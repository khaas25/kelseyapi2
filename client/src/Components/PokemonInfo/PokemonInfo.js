import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export default function PokemonInfo() {
  var location = useLocation();
  var url = location.state.url;
  var [pokemonInfo, setPokemonInfo] = useState({});

  // !! ======== Axios.get
  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response);
      setPokemonInfo(response.data);
    });
  }, [url]);
  // !! ======== Axios.get

  // useEffect(() => {
  //   async function getData() {
  //     var response = await fetch(url);
  //     var data = await response.json();
  //     setPokemonInfo(data);
  //     console.log(data);
  //   }
  //   getData();
  // }, [url]);
  return (
    <div>
      {" "}
      <h1>{pokemonInfo.name}</h1>
      <p>Height: {pokemonInfo.height}</p>
      <p>Weight: {pokemonInfo.weight}</p>
      <p>Base Experience: {pokemonInfo.base_experience}</p>
      <img src={pokemonInfo.sprites?.front_default} alt={pokemonInfo.name} />
      <img src={pokemonInfo.sprites?.back_default} alt={pokemonInfo.name} />
    </div>
  );
}
