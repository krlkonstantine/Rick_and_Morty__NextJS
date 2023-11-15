import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.KfILnCKwQLCd) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // тут указываем файл, который хотим ревалидировать
    await res.revalidate('/test')
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}