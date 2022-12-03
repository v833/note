function memory(f, size = 10) {
  const cache = []

  return function (...args) {
    const hash = args.join(',')

    const item = cache.find((item) => item.hash === hash)
    if (item) {
      return item.value
    }
    const result = f(...args)
    cache.push({ hash, value: result })
    if (cache.length > size) {
      cache.shift()
    }
    return result
  }
}

function _fib(n) {
  if (n == 1 || n == 2) {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}

const fib = memory(_fib, 30)

console.log(fib(60))
