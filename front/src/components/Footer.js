import React from 'react'
import "../App.css"
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <>
            <footer className="relative bg-gray-100 pt-8 pb-6 h-[275px]">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap text-center lg:text-left pt-6">
                        <div className="w-full lg:w-6/12 px-4">
                            <h1 color="gray">AI Stock prediction program</h1>
                            <div className="mt-0">
                                <h2 className="text-xl text-pink-700 font-bold underline">
                                    Up or Down
                                </h2>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="flex flex-wrap items-top">
                                <div className="w-full lg:w-4/12 px-4 ml-auto md:mb-0 mb-8">
                                    <span className="block uppercase text-gray-900 text-sm font-serif font-medium mb-2">
                                        <Link to='/about'>About Us</Link>
                                    </span>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <span className="block uppercase text-gray-900 text-sm font-serif font-medium mb-2">
                                        <Link to='/contact'>Contact Us</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-300" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div className="text-sm text-gray-700 font-medium py-1">
                                Copyright © {new Date().getFullYear()} Up Or Down
                                Tailwind by <h2>Team U.O.D</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}