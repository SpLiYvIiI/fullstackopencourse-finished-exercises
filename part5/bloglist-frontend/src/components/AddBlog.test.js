import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render , fireEvent} from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import AddBlog from './AddBlog'


describe('tests for AddBlog form', ()=>{
    const handleBlogAdd= jest.fn()
    let component
    beforeEach(()=>{
        component = render(
            <AddBlog handleBlogAdd={handleBlogAdd} />
        )
    })

    test('test new blog scheme event handler', ()=>{
        const author = component.container.querySelector('#author')
        const title = component.container.querySelector('#title')
        const url = component.container.querySelector('#url')
        const form = component.container.querySelector('form')
        fireEvent.change(author, { 
            target: { value: 'vincxa' } 
          })
        fireEvent.change(title, { 
            target: { value: 'racxa' } 
          })
        fireEvent.change(url, { 
            target: { value: 'xnxx.com' } 
          })
        const newBlog = {
            title : 'racxa',
            author : 'vincxa',
            url : 'xnxx.com',
            likes : 0
        }
        fireEvent.submit(form)
        expect(handleBlogAdd.mock.calls).toHaveLength(1)
        expect(handleBlogAdd.mock.calls[0][0]).toEqual(newBlog)
    })
})