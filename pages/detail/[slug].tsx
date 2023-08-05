/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Layout from '@/components/Layout';
import { Button, Card } from 'antd';
import Image from 'next/image'
import { ArrowRightOutlined } from '@ant-design/icons';
import { RootState } from 'redux/store/store';

const index = () => {

    const router = useRouter()
    const { author } = router.query
    const article = useSelector((state: RootState) => state.article)

    const handleOpenSource = (url: string) => {
        window.open(`${url}`, '_blank')
    }
    return (
        <Layout>
            <div className='flex flex-col gap-8'>
                <h1 className='z-20 text-lg font-semibold font-mono'>{article?.title}</h1>
                <Card
                    hoverable
                    className='max-w-[800px]'
                    cover={
                        <Image src={article?.urlToImage!}
                            alt={article?.author!}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                            priority

                        />
                    }
                >
                    <div className='flex flex-col gap-2'>
                        <h2 className="text-black text-xl font-bold  md:text-2xl md:font-normal underline hover:opacity-75">
                            {article?.title}
                        </h2>
                        <p className='mt-4'>{article?.content}</p>
                        <p className='mt-1'>{article?.description}</p>

                        <div className='h-[1px] w-full bg-black' />
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-col'>
                                <h1 className='text-gray-400'>{article?.author}</h1>
                                {article?.publishedAt && (
                                    <h1>
                                        <span className='font-bold'>News</span> | {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </h1>
                                )}
                            </div>
                            <Button type='dashed' className='flex items-center' onClick={() => handleOpenSource(article?.url!)}>Source<ArrowRightOutlined style={{ marginLeft: '1px' }} /></Button>
                        </div>
                    </div>
                </Card>
            </div>
        </Layout>
    )
}

export default index