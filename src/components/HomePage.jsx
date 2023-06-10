import React from 'react'
import Carousel from '@/src/components/Carousel'
import Image from 'next/image'
import { useStore } from '@/src/hooks/useStore'

import styles from '@/styles/Home.module.css'

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
                        <br />
                        <div>
                            This product uses
                        </div>
                        <Image
                            src="/blue_long_TMDB.svg"
                            alt="TMDB Logo"
                            width={100}
                            height={24}
                            priority
                        />
                        <div>
                            API but is not endorsed or certified by TMDB.
                        </div>
                        <br />
                    </footer>
                </React.Fragment>
                :
                <>
                    <Carousel
                        title={'Latest'}
                        type={'active'}
                    />
                    <hr />
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
                    <footer className={styles.appFooter}>
                        <p className={styles.tmdbDisclaimer}>
                            This product uses 
                            <Image
                                src="/blue_long_TMDB.svg"
                                alt="TMDB Logo"
                                width={100}
                                height={24}
                                priority
                                style={{paddingLeft: '4px', paddingRight: '4px', marginBottom: '-8px'}}
                            />
                             API but is not endorsed or certified by TMDB.
                        </p>
                    </footer>
                </>
        }</>
    )
}

export default HomePage;