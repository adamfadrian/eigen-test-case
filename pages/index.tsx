import { Col, Row, Skeleton } from 'antd';
import Layout from '@/components/Layout/Layout'
import Cards from '@/components/Card/Cards';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import useArticle, { Articles } from 'hooks/useArticle';
import { setDetail } from 'store/reducers/detailArticle';
import useSecondArticle from '@/hooks/useSecondArticle';
import { data } from 'autoprefixer';

export default function Home() {
  const dispatch = useDispatch()
  // articles from Top headlines from TechCrunch right now
  const { data: articles, error, isLoading } = useArticle()
  // articles Top headlines from BBC News
  const { data: secondArticles } = useSecondArticle()


  // Handle to get the detail article & direct to detail page
  const handleGetDetail = ({ author, content, description, publishedAt, url, urlToImage, title }: Articles) => {
    dispatch(setDetail({ author, content, description, publishedAt, url, urlToImage, title }))
    router.push(`detail/${author}`)
  }



  return (
    <Layout>
      <div className='flex md:flex-row flex-col w-full md:gap-20 z-20 items-center justify-between md:px-10'>
        <div className='flex flex-col p-4 z-20 md:w-3/4  items-center'>
          <h1 className='text-2xl md:text-4xl underline font-semibold z-20  text-center'>Top headlines from TechCrunch right now</h1>
          <div className="my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0 ">
            {articles?.map(({ author, description, urlToImage, content, publishedAt, url, title }: Articles, index: number) => (
              <Cards
                large={index === 0 || index === 3 ? true : false}
                key={title}
                title={title}
                description={description}
                image={urlToImage}
                author={author}
                onClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                onCardClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>

        <div className='flex flex-col p-2 z-20 md:w-2/5  items-center'>
          <h1 className='text-2xl md:text-4xl underline font-semibold z-20 text-center'>Top headlines from BBC News</h1>
          <div className="my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0 ">
            {secondArticles?.map(({ author, description, urlToImage, content, publishedAt, url, title }: Articles, index: number) => (
              <Cards
                large={index === 0 || index === 5  ? true : false}
                key={title}
                title={title}
                description={description}
                image={urlToImage}
                author={author}
                onClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                onCardClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout >

  )
}
