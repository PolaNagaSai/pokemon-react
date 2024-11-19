import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import "./index.css";

function Pokemon() {
    const [pokemon,setPokemon]=useState([]);
    const[loading,setLoading]=useState(true);
    const [error, setError] = useState(null);
    const[search,setSearch]=useState("");

    const API="https://pokeapi.co/api/v2/pokemon?limit=124";

    const fetchPokemon=async()=>{
        try {
            const res= await fetch(API);
            const data=await res.json();
            // console.log(data);
            const pokemonData=data.results.map(async (currPokemon)=>{
                const res=await fetch(currPokemon.url);
                const data=await res.json();
                return data;   
            });
            const detailedResponse=await Promise.all(pokemonData);
            console.log(detailedResponse);
            
            setPokemon(detailedResponse);
            setLoading(false);
            
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
            
        }
    }

    useEffect(()=>{
        fetchPokemon();
    },[]);


    const searchData=pokemon.filter((currPokemon)=>
        currPokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
          <div>
            <h1>Loading....</h1>
          </div>
        );
    }

    if (error) {
        return (
          <div>
            <h1>{error.message}</h1>
          </div>
        );
    }

  return (
    <>
        <section className='container'>
            <header>
                <h1>Let's catch Pokemon</h1>
            </header>
            <div className='pokemon-search'>
                <input type='text'placeholder='search pokemon' value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <div>
                <ul className='cards'>
                    {/* {pokemon.map((curPokemon) => { */}
                    {searchData.map((currPokemon)=>{
                       return <PokemonCard key={currPokemon.id} pokemonData={currPokemon}/>
                    })}
                </ul>
            </div>
        </section>
    </>
  )
}

export default Pokemon