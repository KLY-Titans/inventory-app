import React, {useState} from 'react'
import apiURL from "../api";

export const AddItemForm = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newItem = {
            name,
            price,
            description,
            category,
            image
        }

        try{
            const response = await fetch(`${apiURL}/item/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newItem)
            })
            if(response.ok){
                console.log('Item added successfully')
            }else{
                console.log('Failed to add item')
            }
        }catch(err){
            console.error('Error:', err)
        }
    }

    return(
        <form>
            <div>
                <label>Product name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>
            <div>
                <label>Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
            <div>
                <label>Image URL:</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
            </div>

            <button type="submit">Add Item</button>
        </form>
    )
}