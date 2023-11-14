// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

type Data = BookType[]

const booksDB = [
    {id: 1, title: 'name 1'},
    {id: 2, title: 'title 1'},
    {id: 3, title: 'nametitlehahah'},
]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
        res.status(200).json(booksDB)

    }
    }


//Types
type BookType = {
    id: number
    title: string
}