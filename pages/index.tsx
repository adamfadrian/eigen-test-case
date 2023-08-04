import Image from 'next/image'
import { Inter } from 'next/font/google'
import useArticle, { Articles } from '@/hooks/useArticle'
import Card from '@/components/Card'
import { title } from 'process'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const randomNum = Math.floor(Math.random() * 1000)

  const { data: getAll, error } = useArticle()
  console.log(getAll)
  return (
    <main
      className={`flex flex-col min-h-screen  justify-between p-24 `}
    >
      <div className='flex gap-10'>


      </div>
      <div className="my-10 grid w-full max-w-screen-xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0 ">
        {
          getAll?.map(({ author, description, urlToImage }: Articles, index: number) => (
            <>
               <Card title={author} description={description} demo={urlToImage} key={title} />
            </>
          ))
        }
      
      </div>
    </main>
  )
}
