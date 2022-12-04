const render = require('./render')

const app = require('express')()

const node = {
  name: 'div',
  props: {
    onClick: () => {
      console.log('clicked')
    }
  },
  children: [
    {
      name: 'h1',
      children: 'Hello World'
    },
    {
      name: 'p',
      children: 'This is a paragraph'
    }
  ]
}

render(node, 'html')
