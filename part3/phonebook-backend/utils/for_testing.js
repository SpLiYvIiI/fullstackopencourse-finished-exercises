const palindrome = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

const average = (array) => {
  let z = array.reduce((racxa,item)=>{
      return racxa+item
  },0)
  return z == 0 ? 0 : z / array.length
}

module.exports = {
  palindrome,
  average,
}
