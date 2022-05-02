import { SearchBar } from "./SearchBar";
import "../App.css"

export default function Header() {
    return (
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-screen">
            <div className="bg-landing-background bg-cover bg-center absolute top-0 w-full h-full" />
            <div className="container max-w-8xl relative mx-auto">
                <div className="items-center flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4 mx-auto text-center">
                        <main className="MainLogo">
                            <img src="MainLogo.png" alt="logo" className="Logo"/>
                        </main>  
                        <div className="text-black">
                            <div className="Search">
                                <SearchBar/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}