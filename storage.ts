function getMemory() {
  const memory = process.memoryUsage().heapUsed
  console.log(memory / 1024 / 1024 + 'mb')
}

const size = 30 * 1024 * 1024 // 30mb

const arr1 = new Array(size)
getMemory()

const arr2 = new Array(size)
getMemory()

const arr3 = new Array(size)
getMemory()
