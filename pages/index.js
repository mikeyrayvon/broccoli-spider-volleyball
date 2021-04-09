import { useState } from 'react'
import Head from 'next/head'

import { postData } from '../utils/api'

import Container from '../components/Container'

const Home = () => {
  const [result, setResult] = useState('')
  const getRandomData = (query) => {
    console.log(query)
    postData('/api/qrng', query)
    .then(res => {
      console.log(res)
      setResult(res.data[0])
    })
    .catch(error => {
      console.error(error)
    })
  }

  return (
    <div className='absolute inset-0 flex flex-col justify-center'>
      <section className='py-8 text-center'>
        <Container>
          <div className='mb-4'>
            <button
              className='border-2 p-2 rounded-md'
              onClick={() => getRandomData({
                length: 1,
                type: 'uint16',
                size: 6
              })}>Get Random Data</button>
          </div>
          <div>{result}</div>
        </Container>
      </section>
    </div>
  )
}

export default Home
