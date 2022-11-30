const PENDING = 1
const FULFILLED = 2
const REJECTED = 3

class MyPromise {
  constructor(executor) {
    this.state = PENDING
    this.fulfills = []

    const resolver = (value) => {
      if (this.state === PENDING) {
        this.value = value
        this.state = FULFILLED
        this.fulfills.forEach((cb) => cb())
      }
    }

    const rejester = (error) => {
      if (this.state === PENDING) {
        this.error = error
        this.state = REJECTED
      }
    }

    try {
      executor(resolver, rejester)
    } catch (e) {
      rejester(e)
    }
  }

  then(onFulFill) {
    return new MyPromise((resolve, reject) => {
      switch (this.state) {
        case FULFILLED:
          const x = onFulFill(this.value)
          resolve(result)
          break

        case REJECTED:
          break

        case PENDING:
          this.fulfills.push(() => resolve(onFulFill(this.value)))
          break
      }
    })
  }

  catch() {}
}

const p = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(100)
  }, 1000)
})
  .then((res) => {
    console.log('then1', res)
    return new MyPromise((resolve) => resolve('200'))
  })
  .then((res) => {
    console.log('then2', res)
  })
