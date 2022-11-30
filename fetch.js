import fetch from 'node-fetch'

const data = await fetch('http://www.baidu.com', {
  method: 'POST',
  headers: {
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
    'Content-Type': 'application/json'
  },
  cache: 'no-cache',
  credentials: 'include' // 接受cookie, 默认不接收
})

const text = await data.text()
console.log('text: ', text)
