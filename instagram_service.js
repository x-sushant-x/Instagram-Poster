const axios = require('axios')

const createInstagramPost = async (userID, accessToken, imageUrl, caption) => {
    const endpoint = `https://graph.instagram.com/v21.0/${userID}/media?access_token=${accessToken}`

    const headers = {
        'Content-Type' : 'application/json'
    }

    const body = {
        'image_url' : imageUrl,
        'caption' : caption
    }

    try {
        const response = await axios.post(endpoint, body, {
            headers: headers
        })

        if (response.status !== 200) {
            console.error('error while creating instagram post')
            return
        }

        return await response.data.id
    } catch (err) {
        console.error('Error uploading image to Instagram:', err)
        throw err
    }
}

const publishPostToInstagram = async (userID, accessToken, creationID) => {
    const endpoint = `https://graph.instagram.com/v21.0/${userID}/media_publish?access_token=${accessToken}&creation_id=${creationID}`

    const headers = {
        'Content-Type' : 'application/json'
    }

    try {
        const response = await axios.post(endpoint, {}, {
            headers: headers
        })

        if (response.status !== 200) {
            console.error('error while publishing instagram post')
            return
        }

        return true
    } catch (err) {
        console.error('Error publishing image to Instagram:', err)
        throw err
    }
}

module.exports = { createInstagramPost, publishPostToInstagram }