const fetch = require('node-fetch');

export default async (req, res) => {
  let url = 'https://qrng.anu.edu.au/API/jsonI.php?'

  Object.keys(req.body).forEach((key, index) => {
    url += `${key}=${req.body[key]}&`
  })

  await fetch(url, {
      method: 'get',
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(error => {
      res.status(422).json({ error: String(error) })
    })
}
