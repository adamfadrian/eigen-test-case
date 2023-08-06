import { Col, Row, Skeleton } from 'antd';
import Layout from '@/components/Layout/Layout'
import Cards from '@/components/Card/Cards';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import useArticle, { Articles } from 'hooks/useArticle';
import { setDetail } from 'store/reducers/detailArticle';

export default function Home() {
  const dispatch = useDispatch()
  const { data: articles, error, isLoading } = useArticle()
  if (error) return alert('failed to get the data')


  // Handle to get the detail article & direct to detail page
  const handleGetDetail = ({ author, content, description, publishedAt, url, urlToImage, title }: Articles) => {
    // Save the data into redux
    dispatch(setDetail({ author, content, description, publishedAt, url, urlToImage, title }))
    // Push to detail page
    router.push(`detail/${author}`)
  }
  


  return (
    <Layout>
      <div className='flex flex-col p-2 z-20 w-full  justify-center items-center'>
        <h1 className='text-2xl font-semibold z-20'>Top headlines from TechCrunch right now</h1>
        <div className="my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0 ">
          {articles?.map(({ author, description, urlToImage, content, publishedAt, url, title }: Articles, index: number) => (
            <Cards
              large={index === 0 || index === 3 ? true : false}
              key={author}
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
    </Layout >

  )
}
