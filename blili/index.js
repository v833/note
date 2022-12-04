import puppeteer from 'puppeteer'

async function start() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.bilibili.com/')

  const cards = await page.evaluate(() => {
    const cards = document.querySelectorAll('#i_cecream')
    return Array.from(cards).map((card) => {
      console.log('card: ', card)
      return card.innerHTML
    })
  })
  console.log('cards: ', cards)
}

start()
