import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [isMobile] = useMobile()
    const params = useLocation()
    const searchText = params.search.slice(3)

    useEffect(() => {
        const isSearchPage = location.pathname === '/search'
        setIsSearchPage(isSearchPage)
    }, [location])

    const redirectSearchPage = () => {
        navigate("/search")
    }

    const handleOnChange = (e) => {
        const value = e.target.value
        const url = `/search?q=${value}`
        navigate(url)
    }

    return (
        <div className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-amber-300'>
            {
                (isMobile && isSearchPage) ? (
                    <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 text-neutral-600 group-focus-within:text-amber-300 bg-white rounded-full shadow-md'>
                        <FaArrowLeft size={22} />
                    </Link>
                ) : (
                    <button className='flex justify-center items-center h-full p-3 text-neutral-600 group-focus-within:text-amber-300'>
                        <IoSearchSharp size={22} className='cursor-pointer' />
                    </button>
                )
            }
            <div className='w-full h-full'>
                {
                    !isSearchPage ? (
                        // Not in search page
                        <div onClick={redirectSearchPage} className='w-full h-full flex items-center'>
                            <TypeAnimation
                                sequence={[
                                    'Search "milk"',
                                    1000,
                                    'Search "bread"',
                                    1000,
                                    'Search "sugar"',
                                    1000,
                                    'Search "panner"',
                                    1000,
                                    'Search "chocolate"',
                                    1000,
                                    'Search "curd"',
                                    1000,
                                    'Search "rice"',
                                    1000,
                                    'Search "egg"',
                                    1000,
                                    'Search "chips"',
                                    () => {
                                        console.log('Sequence completed');
                                    },
                                ]}
                                wrapper="span"
                                cursor={true}
                                repeat={Infinity}
                            />
                        </div>

                    ) : (
                        // in search page
                        <div className='w-full h-full'>
                            <input onChange={handleOnChange} type="text" placeholder='Search for milk, sugar, atta, dal and more.' autoFocus defaultValue={searchText} className='bg-transparent w-full h-full outline-none' />
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Search