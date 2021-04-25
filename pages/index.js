import { useState } from 'react'
import Head from 'next/head'
import { verbs } from '../verbs'

import { postData } from '../utils/api'

import Container from '../components/Container'

const Home = () => {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const getRandomData = (query) => {
    setLoading(true)
    postData('/api/qrng', query)
    .then(res => {
      const dir = getDirection(res.data[0])
      console.log(res.data[0], isInSeq(1, res.data[1]), res.data[2])
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

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const getSteps = (t) => {
    if (isInSeq(1, t)) {
      return 1
    } else if (isInSeq(2, t)) {
      return 2
    } else if (isInSeq(3, t)) {
      return 3
    } else if (isInSeq(4, t)) {
      return 4
    }
  }

  const getDirection = (t) => {
    const steps = getSteps(t)
    const plural = steps > 1 ? 's' : ''
    let movement
    if (isInSeq(1, t)) {
      movement = 'forward'
    } else if (isInSeq(2, t)) {
      movement = 'to the right'
    } else if (isInSeq(3, t)) {
      movement = 'to the left'
    } else if (isInSeq(4, t)) {
      movement = 'backwards'
    }
    return `move ${movement} ${steps} step${plural} and ${verbs[getRandomInt(0, verbs.length)].present}`
  }

  return (
    <>
      <Head>
        <title>broccoli spider volleyball</title>
      </Head>
      <div className='absolute inset-0 flex flex-col justify-between text-center p-12 bg-green-500'>
          <div className="">
            <span>Imagine you're a quantum fluctuation in a vacuum in Australia</span>
          </div>
          <div className='text-3xl text-center flex items-center justify-center'>
            <div><span>{loading ? (
              '...'
            ) : result}</span></div>
          </div>
          <div>
            <button
              className='border-4 border-red-500 rounded-full p-4'
              disabled={loading}
              onClick={() => getRandomData({
                length: 3,
                type: 'uint8'
              })}>🥦🕷🏐</button>
          </div>
      </div>
    </>
  )
}

export default Home
