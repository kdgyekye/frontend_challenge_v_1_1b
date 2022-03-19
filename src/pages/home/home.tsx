import React, {useEffect, Fragment} from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    return (
        <Fragment>
            <div className="absolute flex justify-center items-center w-full h-full bg-gray-700 text-gray-100">
                <div className="flex justify-center">
                    <button className='bg-yellow-500 p-4 border-white' onClick={() => navigate("/select-character")}>
                        Start Game
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default Home