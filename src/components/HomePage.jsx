import React from 'react'
import Carousel from '@/src/components/Carousel'
import Image from 'next/image'

const HomePage = () => {
    return (
        <React.Fragment>
            <Carousel 
                title={'Trending'}
                tmdbQuery={'trending/all/week'}
            />
            <hr />
            <Carousel 
                title={'TV'} 
                tmdbQuery={'trending/tv/week'}
            />
            <hr />
            <Carousel 
                title={'Movies'}
                tmdbQuery={'trending/movie/week'}
            />
            <br />
            <footer>
                <div>
                    Film data from 
                </div>
                <Image
                    src="/blue_long_TMDB.svg"
                    alt="TMDB Logo"
                    width={100}
                    height={24}
                    priority
                />
            </footer>
        </React.Fragment>
    )
}

export default HomePage;