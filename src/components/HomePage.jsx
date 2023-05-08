import React from 'react'
import Carousel from '@/src/components/Carousel'


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
        </React.Fragment>
    )
}

export default HomePage;