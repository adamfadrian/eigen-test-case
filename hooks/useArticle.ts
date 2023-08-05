import axios from 'axios'
import useSWR from 'swr'

export interface Articles {
    author: string
    title: string
    content?: string
    description: string;
    publishedAt?: string;
    url: string;
    urlToImage: string;
    source?: {
        name: string
        id: string
    }
}

const fetcher = async (url: string) => await axios.get(url).then((res) => res.data.articles)
export default function useArticle() {
    const KEY = process.env.NEXT_PUBLIC_KEY!
    const { data, error, isLoading } = useSWR(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=ec33c6ed3f5044b79a1c28d5c3cbbeec`, fetcher)
    
    if(error) alert('failed to get data')
    return { data, error }
}
