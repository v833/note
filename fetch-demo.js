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
