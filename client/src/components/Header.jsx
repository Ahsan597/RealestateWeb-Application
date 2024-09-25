import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className='bg-slate-200'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-2'>
                <Link to="/">
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-pink-300'>Origin</span>
                        <span className='text-pink-500'>Estate</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-2 rounded-lg flex items-center '>
                    <input type='input' placeholder='search' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                    <FaSearch className="text-slate-600 " />
                </form>
                <ul className="flex gap-4">
                   <Link to="/home">
                   <li className="hidden sm:inline text-pink-500 hover:underline" >Home</li>
                   </Link> 
                    <Link to="/about">
                    <li className="hidden sm:inline text-pink-500 hover:underline">About</li>
                    </Link>
                    <Link to="/signin">
                    <li className=" text-pink-500 hover:underline">Signin</li>
                    </Link>
                </ul>
            </div>
        </header>
    )
}
