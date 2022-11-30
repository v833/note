import fetch from 'node-fetch'

// 指数补偿
function request(url) {
  let resolved = false
  let t = 1

  return new Promise((resolve) => {
    function doFetch() {
      if (resolved || t > 16) {
        return
      }
      fetch(url)
        .then((resp) => resp.text())
        .then((data) => {
          if (!resolved) {
            resolve(data)
            resolved = true
          }
        })
    }

    setTimeout(() => {
      doFetch()
      t *= 2
    }, t * 100)
  })
}

;```

## 时间窗口

```
import fetch from 'node-fetch'

// 时间窗口
function window_it(f, time = 50) {
  let w = {}
  let flag = false
  return (...args) => {
    return new Promise((resolve) => {
      if (!w[hash(args)]) {
        w[hash(args)] = {
          func: f,
          args,
          resolvers: []
        }
      }
      if (!flag) {
        flag = true
        setTimeout(() => {
          Object.keys(w).forEach((key) => {
            const { func, args, resolvers } = w[key]
            console.log('once')
            const promise = func(...args)
              .then((resp) => {
                return resp.text()
              })
              .then((text) => {
                resolvers.forEach((resolve) => {
                  console.log(1)
                  resolve(text)
                })
              })
            w = {}
            flag = false
          })
        }, time)
      }
      w[hash(args)].resolvers.push(resolve)
    })
  }
}

function hash(...args) {
  return args.join(',')
}

const request = window_it(fetch, 20)

// 只发一次请求
request('http://www.baidu.com')
request('http://www.baidu.com')
request('http://www.baidu.com')
request('http://www.baidu.com')
request('http://www.baidu.com')
