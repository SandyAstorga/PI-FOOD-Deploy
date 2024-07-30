import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipeName } from "../../redux/actions";
import style from "./NavBar.module.css"

const NavBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handlerInputChange = (e) => { // Captura el nombre ingresado por el usuario y actualiza el estado 
        e.preventDefault();
        setName(e.target.value);
    };

    const handlerSubmit = (e) => { // Realiza la búsqueda por nombre 
        e.preventDefault();
        setName(""); // Limpia el input después de prevenir el comportamiento por defecto
        dispatch(searchRecipeName(name));
    };

    const handleMenu = () => {
        setIsMenuVisible(!isMenuVisible); // Alterna la visibilidad del menú
    };

    return (
        <div className={style.mynavbar}>
            <div className={style.menu}>
                <Link to='/'>
                    <div className={style.container_img}>
                        <img className={style.img} src={"https://t4.ftcdn.net/jpg/05/02/53/39/240_F_502533967_327rjdiBU76R3Xu4jfBSKkCPv7MBv9Lz.jpg"} alt="" />
                    </div>
                </Link>
                <Link to='/about'>
                    <button>
                        <span>About Me</span>
                    </button>
                </Link>
                <Link to='/create'>
                    <button>
                        <span>Create New Recipe</span>
                    </button>
                </Link>
                <div className={style.container_search}>
                    <button className={style.search} type="submit" onClick={handlerSubmit}>
                        <span>🔍</span>
                    </button>
                    <input type="text" value={name} placeholder="Search Recipe" onChange={handlerInputChange} />
                </div>
            </div>
            <div className={style.icon_menu}>
                <Link to='/' className={style.link}>
                    <span>Bon Apetit</span>
                </Link>
                <svg onClick={handleMenu} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: '20px' }}>
                    <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
                </svg>
            </div>
            {isMenuVisible && ( // Solo muestra el menú si isMenuVisible es true
                <div className={style.responsive_menu}>
                    <Link to='/about'>
                        <button>
                            <span>About Me</span>
                        </button>
                    </Link>
                    <Link to='/create'>
                        <button>
                            <span>Create New Recipe</span>
                        </button>
                    </Link>
                    <div className={style.container_search}>
                        <button className={style.search} type="submit" onClick={handlerSubmit}>
                            <span>🔍</span>
                        </button>
                        <input type="text" value={name} placeholder="Search Recipe" onChange={handlerInputChange} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
