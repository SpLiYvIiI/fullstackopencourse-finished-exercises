import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render , fireEvent} from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('test for blog component' , ()=>{
    let component;
    const mockHandler = jest.fn()
    beforeEach(()=>{
        const racxa = {
            likes: 0,
            title: "asdas",
            author: "ascasc",
            url: "ascasc",
            user: {
                username: "xella",
                name: "Michael Chan",
                id: "5f9587e1fcc4d93220d53f91"
            },
            id: "5f9ec328f50b4b0864d51229"
        }
        component = render(
            <Blog blog={racxa} handleBlogDelete={mockHandler} handleBlogUpdate={mockHandler}/>
        )
    })
    test('at start the url,likes,user->name is not displayed but title and author is',()=>{
        const div0 = component.container.querySelector('.togglableContent0')
        expect(div0).not.toHaveStyle('display: none')
        const div1 = component.container.querySelector('.togglableContent1')
        expect(div1).toHaveStyle('display: none')
    })
    test('url and number of likes are shown when the button has been clicked', ()=>{
        const button = component.getByText('view')
        fireEvent.click(button)
        const div1 = component.container.querySelector('.togglableContent1')
        expect(div1).not.toHaveStyle('display: none')
    })
    test('when like button is pressed eventhandler is called twice', ()=>{
        const button = component.getByText('add')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
