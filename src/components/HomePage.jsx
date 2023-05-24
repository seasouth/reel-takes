import React from 'react'
import Carousel from '@/src/components/Carousel'
import Image from 'next/image'
import { useStore } from '@/src/hooks/useStore'

const HomePage = () => {
    const showSearchResults = useStore((state) => state.showSearchResults);
    const searchValue = useStore((state) => state.searchValue);

    return (
        <>{
            showSearchResults && searchValue.length > 0 ?
                <React.Fragment key={'search'}>
                    <Carousel
                        title={'Search Results'}
                        tmdbQuery={'search/multi'}
                        queryParams={searchValue}
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
                </ React.Fragment>
                :
                <>
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
                </>
        }</>
    )
}

export default HomePage;