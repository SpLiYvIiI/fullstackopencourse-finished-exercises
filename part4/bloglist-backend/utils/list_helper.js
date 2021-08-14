const allLikes = (Blogs) =>{
    let ans = Blogs.reduce((sum,item)=>{
        return sum + item.likes
    },0)
    return ans
}

const favoriteBlog = (Blogs) =>{
    let z = -1
    let obj = {}
    for(let i = 0; i < Blogs.length; i++){
        if(Blogs[i].likes > z){
            z = Blogs[i].likes
            obj = Blogs[i]
        }
    }
    return {
        "title" : obj.title,
        "author" : obj.author,
        "likes" : obj.likes
    }
}

const mostBlogs = (Blogs) =>{
    let ans = Blogs.reduce((helper,item)=>{
        helper[item.author] = (helper[item.author] || 0) + 1
        return helper
    },{})
    let z = -1
    let obj = {}
    for(x in ans){
        if(ans[x] > z){
            z= ans[x]
            obj = {
                "author" : x,
                "blogs" : z
            }
        }
    }
    return obj
}

const mostLikes = (Blogs)=>{
    let ans = Blogs.reduce((helper,item)=>{
        helper[item.author] = (helper[item.author] || 0) + item.likes
        return helper
    },{})
    let z = -1
    let obj = {}
    for(x in ans){
        if(ans[x] > z){
            z= ans[x]
            obj = {
                "author" : x,
                "likes" : z
            }
        }
    }
    return obj
}
module.exports={
    allLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}