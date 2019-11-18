import React, { useState } from 'react'
import BlogService from '../services/blogs'

const CreateBlog = ({addBlog, showNotification}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const newBlog = await BlogService.createBlog({'title': title, 'author': author, 'url': url})
            newBlog['expanded'] = false
            setTitle('')
            setAuthor('')
            setUrl('')
            addBlog(newBlog)
            showNotification(`Successfully added ${title} (${url}) by ${author}`, 'success')
        } catch (error) {
            showNotification(`Adding ${title} failed. ${error}`, 'fail')
        }
    }

    return (
        <div>
            <h3>Create new blog</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    Title
                    <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    Author
                    <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    URL
                    <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateBlog