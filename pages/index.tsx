import { Col, Row } from 'antd';
import Layout from '@/components/Layout'
import Cards from '@/components/Cards';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import { setDetail } from 'redux/reducers/detailArticle';
import useArticle, { Articles } from 'hooks/useArticle';

export default function Home() {
  const dispatch = useDispatch()
  const { data: articles, error } = useArticle()

  if (error) return alert('failed to get the data')

  const handleGetDetail = ({ author, content, description, publishedAt, url, urlToImage, title }: Articles) => {
    dispatch(setDetail({ author, content, description, publishedAt, url, urlToImage, title }))
    router.push(`detail/${author}`)
  }

  return (
    <Layout>
      <div className='flex flex-col p-2 z-20 w-full  justify-center items-center'>
        <h1 className='text-2xl font-semibold z-20'>Top headlines from TechCrunch right now</h1>
        <div className="my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0 ">
          {
            articles?.map(({ author, description, urlToImage, content, publishedAt, url, title }: Articles, index: number) => (
              <>
                <Cards
                  large={index === 0 || index === 3 ? true : false}
                  // onCardClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                  key={author}
                  title={title}
                  description={description}
                  image={urlToImage}
                  author={author}
                  onClick={() => handleGetDetail({ author, content, description, publishedAt, url, urlToImage, title })}
                />
              </>
            ))
          }
        </div>
      </div>
    </Layout >

  )
}
