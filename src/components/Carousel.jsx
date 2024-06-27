import React, {useState, useEffect} from 'react';
import CarouselItem from '@/src/components/CarouselItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Mousewheel } from "swiper"
import { useRouter } from 'next/router'
import { axiosTMDBGet } from '../hooks/useAxios'
import styles from '@/styles/Home.module.css'
import "swiper/css";
import "swiper/css/navigation";

const Carousel = ({
    title,
    type,
    tmdbQuery,
    queryParams
}) => {
    const navigate = useRouter();

    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const retValue = await fetch(`/api/get/comment/active`);
            const results = await retValue.json();
            setItems(results);
        }

        if (type === 'active') {
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (tmdbQuery?.length > 0) {
            if (queryParams) {
                axiosTMDBGet(tmdbQuery, `&query=${queryParams}`).then((response) => {
                    if (response?.data?.results) {
                        setItems(response.data.results);
                    }
                })
            } else {
                axiosTMDBGet(tmdbQuery).then((response) => {
                    if (response?.data?.results) {
                        setItems(response.data.results);
                    }
                })
            }
        }
    }, [tmdbQuery]);

    return (
        <>
            <h4 className={styles.swiperTitle}>{title}</h4>
            {<div className={styles.swiperCarousel}>
                {<Swiper
                    key={title}
                    modules={[FreeMode, Navigation, Mousewheel]}
                    mousewheel={{
                        "forceToAxis": true
                    }}
                    direction='horizontal'
                    slidesPerView={6}
                    spaceBetween={30}
                    navigation={true}
                    freeMode={true}
                    loop={true}
                    breakpoints={{
                        "@0.00": {
                          slidesPerView: 4,
                          spaceBetween: 10,
                        },
                        "@0.75": {
                          slidesPerView: 5,
                          spaceBetween: 20,
                        },
                        "@1.00": {
                          slidesPerView: 5,
                          spaceBetween: 30,
                        },
                        "@1.50": {
                          slidesPerView: 6,
                          spaceBetween: 30,
                        },
                    }}
                    style={{
                        '--swiper-navigation-size': '20px',
                        '--swiper-navigation-sides-offset': '4px',
                        '--swiper-theme-color': 'whitesmoke'
                    }}
                >{
                    items.map((item) =>
                        item.poster_path?.length > 0 && <React.Fragment key={`${item.id}${title}`}>
                            <SwiperSlide key={`${item.id}${title}`}>
                                <div 
                                    key={`${item.id}${title}`}
                                    className={styles.posterContainer}
                                    onClick={() => navigate.replace(`/takes/${item.media_type}/${item.id}`)}
                                >
                                    <CarouselItem
                                        key={item.id}
                                        item={item}
                                        image={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                    />
                                </div>
                            </SwiperSlide>
                        </React.Fragment>
                    )
                }</Swiper>}
            </div>}
        </>
    )
}

export default Carousel;