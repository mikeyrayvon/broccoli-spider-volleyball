import { useState } from 'react'
import Head from 'next/head'

import { postData } from '../utils/api'

import Container from '../components/Container'

const Home = () => {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const getRandomData = (query) => {
    setLoading(true)
    postData('/api/qrng', query)
    .then(res => {
      console.log(res)
      const dir = getDirection(res.data[0])
      setResult(dir)
      setLoading(false)
    })
    .catch(error => {
      console.error(error)
      setResult('Error')
      setLoading(false)
    })
  }

  const isInSeq = (s, t) => Number.isInteger((t - s) / 4)

  const getDirection = (t) => {
    console.log(t)
    if (isInSeq(1, t)) {
      return 'Forward'
    } else if (isInSeq(2, t)) {
      return 'Right'
    } else if (isInSeq(3, t)) {
      return 'Backward'
    } else if (isInSeq(4, t)) {
      return 'Left'
    }
  }

  return (
    <div className='absolute inset-0 flex flex-col justify-center bg-black'>
      <section className='py-8 text-center'>
        <Container>
          <div className='h-8 mb-48 bg-blue-400 p-20 text-white'><span>{loading ? (
            'Generating...'
          ) : result}</span></div>
          <div>
            <button
              className='border-2 p-2 rounded-md text-white'
              disabled={loading}
              onClick={() => getRandomData({
                length: 1,
                type: 'uint8'
              })}>Quantum Random Direction</button>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Home
