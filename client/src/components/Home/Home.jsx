/* eslint-disable no-unused-vars */
// import React from "react";
// import { useEffect, useState } from "react"; //Hooks
// import { useDispatch, useSelector } from "react-redux"; //Hooks
// import { getRecipes, getDiets, filterRecipesByDiets, orderByName, orderByScore, filterCreate } from "../../redux/actions"; //Actions
// import Pagination from '../Pagination/Pagination'
// import { NavBar } from "../indexcomponents";
// import  API  from "../../api.json"
// import Card from "../Card/Card";
// import style from './Home.module.css'


// const Home = () => {
//     console.log(API)
//     console.log(API.results)

//     const dispatch = useDispatch();
//     const allRecipes = useSelector((state) => state.recipes);
//     const diets = useSelector(state => state.diets)

//     const [currentPage, setCurrentPage] = useState(1);
//     const [recipesPerPage] = useState(9);
//     const indexOfLastRecipe = currentPage * recipesPerPage;
//     const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
//     const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

//     const page = (pageNumber) => {
//         setCurrentPage(pageNumber)
//     }

//     useEffect(() => {
//         dispatch(getRecipes());
//         dispatch(getDiets());
//     }, [dispatch]);

//     const handleClick = (e) => {
//         e.preventDefault();
//         dispatch(getRecipes());
//         // window.location.reload();
//         // la página se recarga sin tener en cuenta el estado actual de la página. 
//     };

//     const handlerFilterCreate = (e) => {
//         dispatch(filterCreate(e.target.value))
//     }

//     const handlerFilterDiets = (e) => {
//         e.preventDefault();
//         dispatch(filterRecipesByDiets(e.target.value))
//     }

//     const handleSort = (e) => {
//         e.preventDefault();
//         dispatch(orderByName(e.target.value));
//     }

//     const handleScore = (e) => {
//         e.preventDefault();
//         dispatch(orderByScore(e.target.value));
//     }

//     return (
//         <div className={style.home_container}>
//             <NavBar />
//             <>
//                 <div className={style.container_select}>
//                     <select className={style.select} onChange={handleSort}>
//                         <option value="all">Ordering</option>
//                         <option value="up">A - Z</option>
//                         <option value="des">Z - A</option>
//                     </select>
//                     <select className={style.select} onChange={handleScore}>
//                         <option value="score">Health Score</option>
//                         <option value="higher">Higher</option>
//                         <option value="lower">Lower</option>
//                     </select>
//                     <select className={style.select} onChange={handlerFilterDiets}>
//                         <option value="all">Diets</option>
//                         {diets?.map((d, index) => (
//                             <option key={index} value={d.name}>{d.name}</option>
//                         ))
//                         }
//                     </select>
//                     <select className={style.select} onChange={handlerFilterCreate}>
//                         <option value="recipes">Recipes</option>
//                         <option value="api">API</option>
//                         <option value="created">Created</option>
//                     </select>
//                     <button onClick={handleClick}>Refresh</button>
//                 </div>
//                 <Pagination
//                     recipesPerPage={recipesPerPage}
//                     allRecipes={allRecipes.length}
//                     page={page}
//                     currentPage={currentPage}
//                     setCurrentPage={setCurrentPage}
//                 />
//                 {allRecipes.length > 0 ?
//                     <div>
//                         {currentRecipes?.map((r, index) => {
//                             return (
//                                 <Card
//                                     key={index}
//                                     id={r.id}
//                                     name={r.name}
//                                     image={r.image}
//                                     diets={r.diets}
//                                     healthScore={r.healthScore}
//                                     createdInDb={r.createdInDb}
//                                 />
//                             )
//                         })}
//                     </div>
//                     : 
//                     <div className={style.container_loading}>
//                         <img className={style.loading_image} src={"https://i.gifer.com/1Gzb.gif"} alt="" />
//                     </div>
//                     }
//             </>
//         </div>
//     )
// };

// export default Home;

import React from "react";
import { useState } from "react"; // Hooks
import { useSelector } from "react-redux"; // Hooks
// import { getRecipes, getDiets, filterRecipesByDiets, orderByName, orderByScore, filterCreate } from "../../redux/actions"; // Actions
import Pagination from '../Pagination/Pagination'
import { NavBar } from "../indexcomponents";
import API from "../../api.json";
import Card from "../Card/Card";
import style from './Home.module.css'

const Home = () => {
    const [apiData, setApiData] = useState(API.results || []);

    // const dispatch = useDispatch();
    const diets = useSelector(state => state.diets);

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = apiData.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const page = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // useEffect(() => {
    //     dispatch(getRecipes());
    //     dispatch(getDiets());
    // }, [dispatch]);

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     dispatch(getRecipes());
    // };

    const handlerFilterCreate = (e) => {
        // Filtrar apiData si es necesario
        const filteredData = API.results.filter(recipe => recipe.createdInDb === (e.target.value === 'created'));
        setApiData(filteredData);
    };

    const handlerFilterDiets = (e) => {
        e.preventDefault();
        // Filtrar apiData si es necesario
        const filteredData = API.results.filter(recipe => recipe.diets.includes(e.target.value));
        setApiData(filteredData);
    };

    const handleSort = (e) => {
        e.preventDefault();
        const sortedData = [...apiData].sort((a, b) => {
            if (e.target.value === 'up') return a.name.localeCompare(b.name);
            if (e.target.value === 'des') return b.name.localeCompare(a.name);
            return 0;
        });
        setApiData(sortedData);
    };

    const handleScore = (e) => {
        e.preventDefault();
        const sortedData = [...apiData].sort((a, b) => {
            if (e.target.value === 'higher') return b.healthScore - a.healthScore;
            if (e.target.value === 'lower') return a.healthScore - b.healthScore;
            return 0;
        });
        setApiData(sortedData);
    };

    return (
        <div className={style.home_container}>
            <NavBar />
            <>
                <div className={style.container_select}>
                    <select className={style.select} onChange={handleSort}>
                        <option value="all">Ordering</option>
                        <option value="up">A - Z</option>
                        <option value="des">Z - A</option>
                    </select>
                    <select className={style.select} onChange={handleScore}>
                        <option value="score">Health Score</option>
                        <option value="higher">Higher</option>
                        <option value="lower">Lower</option>
                    </select>
                    {/* <select className={style.select} onChange={handlerFilterDiets}>
                        <option value="all">Diets</option>
                        {diets?.map((d, index) => (
                            <option key={index} value={d.name}>{d.name}</option>
                        ))}
                    </select> */}
                    <select className={style.select} onChange={handlerFilterCreate}>
                        <option value="recipes">Recipes</option>
                        <option value="api">API</option>
                        <option value="created">Created</option>
                    </select>
                    {/* <button onClick={handleClick}>Refresh</button> */}
                </div>
                <Pagination
                    recipesPerPage={recipesPerPage}
                    allRecipes={apiData.length}
                    page={page}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                {apiData.length > 0 ?
                    <div className={style.my_cards}>
                        {currentRecipes?.map((r, index) => {
                            return (
                                <Card
                                    key={index}
                                    id={r.id}
                                    name={r.name}
                                    image={r.image}
                                    diets={r.diets}
                                    healthScore={r.healthScore}
                                    createdInDb={r.createdInDb}
                                />
                            )
                        })}
                    </div>
                    : 
                    <div className={style.container_loading}>
                        <img className={style.loading_image} src={"https://i.gifer.com/1Gzb.gif"} alt="" />
                    </div>
                }
            </>
        </div>
    )
};

export default Home;
