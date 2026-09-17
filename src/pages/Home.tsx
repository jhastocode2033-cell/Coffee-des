import axios  from "axios";
import { useEffect, useState } from "react";
import HeroImg from "../assets/HeroImg.png"
import coffea from "../assets/Coffea.png"
import searchImg from "../assets/searchImg.png"
import Categories from "../assets/Categories.png"


   export default function Home(){

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

        return(

            <>
            <section className="relative h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${HeroImg})` }}>
                <nav className="flex items-center justify-between pr-20 py-8 pl-50">
                    <img src={coffea} alt="" className="w-20 h-7" />

                    <ul className="flex items-center gap-8">
                        <li className="font-semibold text-sm text-white">HOME</li>
                        <li className="font-semibold text-sm text-white">COFFEE</li>
                        <li className="font-semibold text-sm text-white">BAKERY</li>
                        <li className="font-semibold text-sm text-white">SHOP</li>
                        <li className="font-semibold text-sm text-white">ABOUT</li>
                        <li className="font-semibold text-sm text-white">LOGIN</li>
                    </ul>

                    <img src={searchImg} alt="" className="w-10 h-10" />
                </nav>

                <section className="pl-50 mt-20 w-[35%]">
                    <p className="text-sm tracking-[0.2em] mb-2 text-white">WELCOME</p>
                    <p className="font-semibold text-4xl mb-5 text-white">We serve the richest coffee in the city!</p>
                    <p className="text-xs mb-5 text-white">Freshly brewed, beautifully balanced, irresistibly smooth.</p>
                    <button className="bg-white w-[120px] text-xs tracking-[0.1em] text-black p-3 rounded-3xl">Order Now</button>
                </section>
            </section>

            <section className="bg-[#E2D9C8] w-full h-[200px] flex items-center justify-center ">
                <img src={Categories} alt="" className="w-150 h-25"/>

            </section>

            <section className="bg-[#f1f0ee] w-full py-15">
                <div className="flex justify-center">
                <p className="font-semibold tracking-wide mb-10"> OUR HOT COFFEE </p>
                </div>

                <div className="grid grid-cols-4 gap-4 w-[80%] mx-auto">
                        {recipe.map((item) => (
                            <div key={item.id} className="bg-[#eeebe6] border border-[#e2d9c8] rounded-sm">
                                <img src={item.image} alt="" />

                                <div className="px-4">

                                <p className="font-semibold mt-3">{item.title}</p>
                                <p>{item.description}</p>

                                </div>

                            </div>
                        ))}


                </div>

            </section>

             <section className="bg-[#f1f0ee] w-full py-15">
                <div className="flex justify-center">
                <p className="font-semibold tracking-wide mb-10"> OUR COLD COFFEE </p>
                </div>

                <div className="grid grid-cols-4 gap-4 w-[80%] mx-auto">
                        {iced.map((piece) => (
                            <div key={piece.id} className="bg-[#eeebe6] border border-[#e2d9c8] rounded-sm">
                                <img src={piece.image} alt="" />

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