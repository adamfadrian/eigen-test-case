import Layout from '@/components/Layout/Layout'
import Cards from '@/components/Card/Cards';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import useArticle, { Articles } from 'hooks/useArticle';
import { setDetail } from 'store/reducers/detailArticle';
import useSecondArticle from '@/hooks/useSecondArticle';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'
import useThirdArticle from '@/hooks/useThirdArticle';
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard';


export const mockImage = 'https://www.babatpost.com/wp-content/uploads/2023/07/Breaking-News-Lando-Norris-Menikmati-Latihan-Pra-Balapan-di-Monako.jpeg'

export default function Home() {
  const dispatch = useDispatch()
  // articles from Top headlines from TechCrunch right now
  const { data: articles, error, isLoading: isLoadingArticles } = useArticle();
  // articles Top headlines from BBC News
  const { data: secondArticles, isLoading: isLoadingSecondArticles } = useSecondArticle();
  // articles from another source
  const { data: thirdArticles, isLoading: isLoadingThirdArticles } = useThirdArticle();

  
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
          {/*  Remove the swiper because it needs to add the image domain for every new article  */}

          <div className='w-full md:mb-36 md:mt-10 md:p-10 '>
            <h1 className='text-2xl md:text-4xl underline font-semibold z-20  text-center mb-10'>Top headlines about Trump</h1>
            <Swiper
              slidesPerView={1}
              navigation
              {...swiperParams}
            >
              {thirdArticles?.map(({ author, description, urlToImage, content, publishedAt, url, title }: Articles) => (
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

              ))}
            </Swiper>
          </div>
          <h1 className='text-2xl md:text-4xl underline font-semibold z-20  text-center'>Top headlines from TechCrunch right now</h1>
          <div className="my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0 ">
            { isLoadingArticles ? 
            (
            
                <SkeletonCard
                  large={true}
                  count={10}
                />
             
            ) :
            (
              articles?.map(({ author, description, urlToImage, content, publishedAt, url, title }: Articles, index: number) => (
                <Cards
                  large={index === 0 || index === 3 ? true : false}
                  key={title}
                  title={title}
                  description={description}
                  image={urlToImage}
                  author={author}
                  onClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                  onCardClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                  isLoading={isLoadingArticles}
                />
              ))
            )
            
           }
          </div>
        </div>

        <div className='flex flex-col p-2 z-20 md:w-1/3  items-center'>
          <h1 className='text-2xl md:text-4xl underline font-semibold z-20 text-center'>Top headlines from BBC News</h1>
          <div className="my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-2 xl:px-0 ">
            {isLoadingSecondArticles ? 
            (
                <SkeletonCard
                  large={true}
                  count={10}
                />
            ) :
            secondArticles?.map(({ author, description, urlToImage, content, publishedAt, url, title }: Articles, index: number) => (
              <Cards
                large={index === 0 || index === 5 ? true : false}
                key={title}
                title={title}
                description={description}
                image={urlToImage}
                author={author}
                onClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                onCardClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                isLoading={isLoadingSecondArticles}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout >

  )
}
