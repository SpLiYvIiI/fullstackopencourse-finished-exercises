const User = require('../modules/User')
const getAll = async()=>{
    const users = await User.find({})
    return users.map(user => user.toJSON())
}
const allUsers = [
    {
        username : "dodola",
        name : "kaira",
        passwordHash : "$2b$10$tl32suolD2acEgn9UIVfxOLUL7d7W6R5QarKg87PftZaHqUMsc7oa"
    },
    {
        username : "xvitqina",
        name : "wurbela",
        passwordHash : "$2b$10$tl32suolD2acEgn9UIVfxOLUL7d7W6R5QarKg87PftZaHqUMsc7oa"
    }
]

module.exports ={
    allUsers,
    getAll
}