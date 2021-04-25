// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import path from 'path'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

export default async (req, res) => {
  await fs.readFile(path.join(serverRuntimeConfig.PROJECT_ROOT, './public/verbs.json'), (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data)
    res.status(200).json({yes:'yes'})
  })
}
