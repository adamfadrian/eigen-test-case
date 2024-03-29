import Layout from '@/components/Layout/Layout'
import Cards from '@/components/Card/Cards';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import useArticle from 'lib/hooks/useArticle';
import { Articles, setDetail } from 'store/reducers/detailArticle';
import useSecondArticle from 'lib/hooks/useSecondArticle';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
import useThirdArticle from 'lib/hooks/useThirdArticle';
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard';
import React, { useState } from 'react'


export const mockImage = 'https://www.babatpost.com/wp-content/uploads/2023/07/Breaking-News-Lando-Norris-Menikmati-Latihan-Pra-Balapan-di-Monako.jpeg'

export default function Home() {
  const dispatch = useDispatch()
  // articles from Top headlines from TechCrunch right now
  const { data: techCrunch, error, isLoading: isLoadingTechCrunch } = useArticle();
  // articles Top headlines from BBC News
  const { data: BBCNews, isLoading: isLoadingBBCNews } = useSecondArticle();
  // articles from another source
  const { data: trumpArticle, isLoading: isLoadingTrumpArticle } = useThirdArticle();

  const [count, setCount] = useState(10)

  // Handle to get the detail article & direct to detail page
  const handleGetDetail = ({ author, content, description, publishedAt, url, urlToImage, title }: Articles) => {
    dispatch(setDetail({ author, content, description, publishedAt, url, urlToImage, title }))
    router.push(`detail/${author}`)
  }



  const swiperParams = {
    loop: true,
    modules: [Navigation, Autoplay],
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },

  }

  return (
    <Layout>
      <div className='flex md:flex-row flex-col w-full md:gap-20 z-20 items-center justify-between md:px-8 '>

        <div className='flex flex-col p-2 z-20 md:w-2/3 w-full items-center h-full'>

          <div className='w-full md:mb-36 md:mt-10 md:p-10 '>
            <h1 className='text-2xl md:text-4xl underline font-semibold z-20  text-center mb-10'>Top headlines about Trump</h1>
            <Swiper
              slidesPerView={1}
              navigation
              {...swiperParams}
            >
              {isLoadingTrumpArticle ? (
                <SkeletonCard
                  count={1}

                />
              ) : (
                trumpArticle?.map(({ author, description, urlToImage, content, publishedAt, url, title }: Articles) => (
                  <SwiperSlide key={title} >
                    <div className='flex flex-col text-center hover:cursor-pointer'>
                      <h1 className='text-xl font-serif font-semibold mb-2'>{title}</h1>
                      <img
                        src={urlToImage ? urlToImage : mockImage}
                        alt={title}
                        width={0} // Set an appropriate width
                        height={0} // Set an appropriate height
                        sizes='100vw'
                        style={{ width: '100%', height: '500px', borderRadius: '8px', }}
                        onClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                      />
                    </div>

                  </SwiperSlide>

                ))
              )


              }
            </Swiper>
          </div>
          <h1 className='text-2xl md:text-4xl underline font-semibold z-20  text-center'>Top headlines from TechCrunch right now</h1>
          <div className="my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0 ">
            {isLoadingTechCrunch ?
              (
                Array.from({ length: count }, (_, index) => (
                  <SkeletonCard
                    key={index + 1}
                    large={index === 0 || index === 3 ? true : false}
                    count={count}
                  />
                ))

              ) :
              (
                techCrunch?.map(({ author, description, urlToImage, content, publishedAt, url, title }: Articles, index: number) => (
                  <Cards
                    large={index === 0 || index === 3 ? true : false}
                    key={title}
                    title={title}
                    description={description}
                    image={urlToImage !== null ? urlToImage : mockImage}
                    author={author}
                    onClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                    onCardClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                    isLoading={isLoadingTechCrunch}
                  />
                ))
              )

            }
          </div>
        </div>

        <div className='flex flex-col p-2 z-20 md:w-1/3  items-center'>
          <h1 className='text-2xl md:text-4xl underline font-semibold z-20 text-center'>Top headlines from BBC News</h1>
          <div className="my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-2 xl:px-0 ">
            {isLoadingBBCNews ?
              (
                Array.from({ length: count }, (_, index) => (
                  <SkeletonCard
                    key={index + 1}
                    large={index === 0 || index === 5 ? true : false}
                    count={count}
                  />
                ))
              ) :
              BBCNews?.map(({ author, description, urlToImage, content, publishedAt, url, title }: Articles, index: number) => (
                <Cards
                  large={index === 0 || index === 5 ? true : false}
                  key={title}
                  title={title}
                  description={description}
                  image={urlToImage !== null ? urlToImage : mockImage}
                  author={author}
                  onClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                  onCardClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                  isLoading={isLoadingBBCNews}
                />
              ))}
          </div>
        </div>
      </div>
    </Layout >

  )
}
