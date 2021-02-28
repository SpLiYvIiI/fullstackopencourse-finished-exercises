import blogService from '../services/blogService'


const reducer = (state = [],action) => {
    switch(action.type){
        case 'INITIALIZE' : {
            action.data.sort((a, b) => a.likes < b.likes ? 1 : (a.likes  > b.likes ? -1 :0))
            return action.data;
        }
        case 'ADDBLOG' : {
            return state.concat(action.data)
        }
        case 'DELETEBLOG' : {
            const newblogs = state.filter(blog => blog.id !== action.blogId)
            return newblogs
        }
        case 'UPDATEBLOG' : {
            let newblogs = state.map(blog => blog.id === action.updObj.id ? action.updObj : blog)
            return newblogs.sort((a, b) => a.likes < b.likes ? 1 : (a.likes  > b.likes ? -1 :0))
        }
        case 'ADDCOMMENT' : {
            let newBlog = state.find(blog => blog.id === action.data.id)
            newBlog.comments = newBlog.concat(action.data.comment)
            return state.map(blog => blog.id === action.data.id ? newBlog : blog)
        }
        default : return state; 
    }
}

export const initializeBlogs = () => {
    return async dispatch =>{
        try{
        const blogs = await blogService.getAll()
        dispatch({
            type : 'INITIALIZE',
            data : blogs
        })
        }
        catch(error){
            throw error
        }     
    }
}
export const addBlog = (newObj) => {
    return async dispatch => {
        try{
        const resp = await blogService.addBlog(newObj)
        dispatch({
            type : 'ADDBLOG',
            data : resp
        })
        }
        catch(error){
            throw error
        }
    }
}
export const deleteBlog = (blogId) => {
    return async dispatch => {
        try{
        await blogService.deleteBlog(blogId)
        dispatch({
            type : 'DELETEBLOG',
            blogId : blogId
        })
        }
        catch(error){
            throw error
        }
    }
}
export const updateBlog = (newObj) =>{
    return async dispatch => {
        try{
        const resp = await blogService.updateBlog(newObj)
        dispatch({
            type :'UPDATEBLOG',
            updObj : resp
        })
        }
        catch(error){
        dispatch(initializeBlogs())
        throw error
        }
    }
}
export const addComment = (comment,id) =>{
    return async dispatch => {
        try{
            await blogService.addComment(id,comment)
            dispatch({
                type : 'ADDCOMMENT',
                data : {
                    id : id,
                    comment : comment
                }
            })
        }
        catch(error){
            throw error
        }
    }
}

export default reducer