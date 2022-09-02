process.on('message', (msg) => {
  const result = getRandom(msg)
  process.send(result)

  setTimeout(() => {
    process.exit()
  }, 5000)
})

const getRandom = (nums) => {
  const obj  = {}
  for (let i = 0; i < nums; i++) {
      let random = Math.floor(Math.random() * 1000) + 1
      if (obj[random]) obj[random] += 1
      else obj[random] = 1
  }
  return obj
}
