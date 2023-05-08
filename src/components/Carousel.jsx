import React, {useState, useEffect} from 'react';
import CarouselItem from '@/src/components/CarouselItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from "swiper"
import { useRouter } from 'next/router'
import { axiosTMDBGet } from '../hooks/useAxios'
import styles from '@/styles/Home.module.css'
import "swiper/css";
import "swiper/css/navigation";

const Carousel = ({
    title,
    tmdbQuery
}) => {
    const navigate = useRouter();

    const [items, setItems] = useState([]);

    useEffect(() => {
        axiosTMDBGet(tmdbQuery).then((response) => {
            if (response?.data?.results) {
                setItems(response.data.results);
            }
        });
    }, []);

    return (
        <>
            <h4 className={styles.swiperTitle}>{title}</h4>
            {<div className={styles.swiperCarousel}>
                {<Swiper
                    modules={[Navigation]}
                    slidesPerView={6}
                    slidesPerGroupSkip={3}
                    spaceBetween={30}
                    navigation={true}
                    scrollable="true"
                    loop={true}
                    breakpoints={{
                        "@0.00": {
                          slidesPerView: 4,
                          slidesPerGroup: 4,
                          spaceBetween: 10,
                        },
                        "@0.75": {
                          slidesPerView: 5,
                          slidesPerGroup: 5,
                          spaceBetween: 20,
                        },
                        "@1.00": {
                          slidesPerView: 5,
                          slidesPerGroup: 5,
                          spaceBetween: 30,
                        },
                        "@1.50": {
                          slidesPerView: 6,
                          slidesPerGroup: 6,
                          spaceBetween: 30,
                        },
                      }}
                >{
                    items.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                <SwiperSlide key={item.id}>
                                    <div 
                                        key={item.id}
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
                    })
                }</Swiper>}
            </div>}
        </>
    )
}

export default Carousel;