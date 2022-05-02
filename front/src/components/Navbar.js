import React from 'react';
import "../App.css"
import { SearchBar } from './SearchBar'
import {Link} from 'react-router-dom';
import logo from './HomeLogo.png';

export default function Navbar() {
    
    return (
        <div class="flex">
            {/* <!-- Nav --> */}
            <div
            class="flex flex-wrap justify-between w-screen h-20 text-white bg-gray-800 md:flex-nowrap"
            >
            {/* <!-- LOGO --> */}
            <div class="z-30 flex items-center h-full pl-3 bg-gray-800">
                <Link to='/'>
                    <img src={logo} alt="subLogo" height="33%" width="33%" />
                </Link>
            </div>
    
            {/* <!-- Menu --> */}
            <div
                class="flex flex-col items-stretch w-screen text-xl text-center transform bg-gray-800 md:flex-row md:translate-y-0 md:space-x-8 md:items-center md:justify-end"
            >
                <div class="mt-3 mr-7 content-center text-black w-[432px]">
                    <div class="Navbar_dropdown">
                        <SearchBar />
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}