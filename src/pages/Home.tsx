
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HeroImg from "../assets/HeroImg.png"
import coffea from "../assets/Coffea.png"
import Categories from "../assets/Categories.png"

export default function Home() {

const { currentUser, logout } = useAuth();
const navigate = useNavigate();


    type Recipe = {
        id: number;
        title: string;
        description: string;
        ingredients: string;
        image: string;
    }

    const [recipe, setRecipe] = useState<Recipe[]>([])

    useEffect(() => {
        axios.get(`https://api.sampleapis.com/coffee/hot`)
        .then(response => setRecipe(response.data))
    }, [])

    const [iced, setIced] = useState<Recipe[]>([])

    useEffect(() => {
        axios.get(`https://api.sampleapis.com/coffee/iced`)
        .then(res => setIced(res.data))
    }, [])

    function handleOrder() {
    if (!currentUser) {
        navigate("/login");
        return;
    }

    navigate("/dashboard");
}

    return (
        <>
            <section
                className="relative h-[600px] sm:h-[600px] h-[500px] bg-cover bg-center"
                style={{ backgroundImage: `url(${HeroImg})` }}
            >
                <nav className="flex items-center justify-between px-5 sm:px-10 lg:pr-20 lg:pl-50 py-8">
                    <img src={coffea} alt="" className="w-20 h-7" />

                    <ul className="hidden md:flex items-center gap-4 lg:gap-8">
                        <li className="font-semibold text-sm text-white">HOME</li>
                        <li className="font-semibold text-sm text-white">COFFEE</li>
                        <li className="font-semibold text-sm text-white">BAKERY</li>
                        <li className="font-semibold text-sm text-white">SHOP</li>
                        <li className="font-semibold text-sm text-white">ABOUT</li>
                        
                    </ul>

                    {currentUser ? (
    <>
        <li
            className="font-semibold text-sm bg-red-600 hover:bg-red-700 text-white cursor-pointer px-4 py-2 rounded-full"
            onClick={() => navigate("/dashboard")}
        >
            DASHBOARD
        </li>

        <li
            className="font-semibold text-sm bg-red-600 hover:bg-red-700 text-white cursor-pointer px-4 py-2 rounded-full"
            onClick={async () => {
                await logout();
                navigate("/");
            }}
        >
            LOGOUT
        </li>
    </>
) : (
    <li
        className="font-semibold text-sm bg-red-600 hover:bg-red-700 text-white cursor-pointer px-4 py-2 rounded-full"
        onClick={() => navigate("/login")}
    >
        LOGIN
    </li>
)}
                </nav>

                <section className="px-5 sm:px-10 lg:pl-50 mt-16 sm:mt-20 w-full sm:w-[75%] lg:w-[35%]">
                    <p className="text-sm tracking-[0.2em] mb-2 text-white">WELCOME</p>
                    <p className="font-semibold text-3xl sm:text-4xl mb-5 text-white">We serve the richest coffee in the city!</p>
                    <p className="text-xs sm:text-sm mb-5 text-white">Freshly brewed, beautifully balanced, irresistibly smooth.</p>
                    <button className="bg-white w-[120px] text-xs tracking-[0.1em] text-black p-3 rounded-3xl">Order Now</button>
                </section>
            </section>

            <section className="bg-[#E2D9C8] w-full min-h-[150px] sm:h-[200px] flex items-center justify-center px-5 py-8">
                <img src={Categories} alt="" className="w-full max-w-[600px] h-auto object-contain"/>
            </section>

            <section className="bg-[#f1f0ee] w-full py-15">
                <div className="flex justify-center">
                    <p className="font-semibold tracking-wide mb-10"> OUR HOT COFFEE </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-[90%] sm:w-[85%] lg:w-[80%] mx-auto">
                    
{recipe.map((item) => (
    <div
        key={item.id}
        className="bg-[#eeebe6] border border-[#e2d9c8] rounded-sm flex flex-col h-full"
    >
        <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 sm:h-52 object-cover"
        />

        <div className="px-4 py-3 flex flex-col flex-1">
            <p className="font-semibold mt-3">{item.title}</p>

            <p>{item.description}</p>

            <button
                onClick={handleOrder}
                className="bg-[#6f4e37] text-white p-3 rounded-3xl mt-auto w-full"
            >
                Order Now
            </button>
        </div>
    </div>
))}

                </div>
            </section>

            <section className="bg-[#f1f0ee] w-full py-15">
                <div className="flex justify-center">
                    <p className="font-semibold tracking-wide mb-10"> OUR COLD COFFEE </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-[90%] sm:w-[85%] lg:w-[80%] mx-auto">
                    {iced.map((piece) => (
                        <div key={piece.id} className="bg-[#eeebe6] border border-[#e2d9c8] rounded-sm">
                            <img src={piece.image} alt="" className="w-full h-48 sm:h-52 object-cover" />

                            <div className="px-4">
                                <p className="font-semibold mt-3">{piece.title}</p>
                                <p>{piece.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
};
