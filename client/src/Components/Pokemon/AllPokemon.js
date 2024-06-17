import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllPokemon.css";
import pokeball from "../images/pokeball.png";
import axios from "axios";
export default function AllPokemon() {
  var navigate = useNavigate();
  const [allPokemon, setAllPokemon] = useState([]);

  //!! ======= All pokemon =========
  useEffect(() => {
    async function getData() {
      var response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
      var data = await response.json();
      const results = data.results; //since data.results is already an array the const results will be an array.
      const promise = await results.map((item) => {
        //map through and call each seperate url
        //prmoise is an array of all the urls and their data in an unresolved state
        return axios.get(item.url);
      });
      const detailsArr = [];
      const response2 = await Promise.all(promise); //promise.all is used to resolve promise.
      // console.log(promise);
      response2.map((item) => detailsArr.push(item.data)); //here we took out only the details we wanted from array

      const finalArr = detailsArr.map((item, index) => {
        return {
          details: item,
          main: results[index],
        };
      });

      console.log(finalArr);
      setAllPokemon([...finalArr]);

      // const detailsArr = [];
      // for (let i = 0; i < data.results.length; i++) {
      //   axios
      //     .get(data.results[i].url)
      //     .then((res) => {
      //       detailsArr.push(res.data);
      //     })
      //     .catch((e) => {
      //       console.log(e);
      //     });
      // }

      // console.log(detailsArr);
      // setAllPokemon(data.results);
      // setPokemonDetails([...detailsArr]);
    }
    getData();
  }, []);
  //!! ======= All pokemon =========

  function goToSinglePokemon(url) {
    navigate("/singlepokemon", { state: { url: url } });
  }

  // !! Search Bar  ==================================
  function searchPokemon() {
    const value = document.getElementById("searchBar").value;

    const filterData = allPokemon.filter((poke) => {
      return poke.main.name.toLowerCase().includes(value.toLowerCase());
    });
    setAllPokemon([...filterData]);
  }
  // !! Search Bar  ==================================

  return (
    <div className="main">
      <div className="header">
        <button className="signup">Sign-Up</button>
        <img src={pokeball} alt="logo" id="pokeball" />
      </div>
      <div className="design"></div>
      <div className="searchContainer">
        {" "}
        <input
          style={{ color: "black" }}
          type="text"
          id="searchBar"
          placeholder="Search"
          onChange={searchPokemon}
        />
      </div>

      <div className="cards">
        {allPokemon.map((pokemon) => {
          return (
            <div className="card">
              <h1 onClick={() => goToSinglePokemon(pokemon.main?.url)}>
                {pokemon.main?.name}
              </h1>
              <img
                src={pokemon.details?.sprites?.front_default}
                alt={pokemon.main?.name}
              />
              <p>{pokemon.main?.url}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
