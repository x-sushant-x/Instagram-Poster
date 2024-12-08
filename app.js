const fs = require('fs')
const path = require('path')
const { uploadImageToImageBB } = require('./image_service')
const { createInstagramPost, publishPostToInstagram } = require('./instagram_service')

const IMAGE_BB_API_KEY = ''
const INSTAGRAM_USER_ID = ''
const INSTAGRAM_ACCESS_TOKEN = ''

function postToInstagram() {
    const folder = 'images'

    fs.readdir(folder, async (err, files) => {
        if (err) {
            console.error('Error reading folder:', err)
            return
        }

        files.forEach(async file => {
            const filePath = path.join(folder, file)

            const ext = path.extname(file).toLowerCase();
            if (ext === '.jpg' || ext === '.png') {
                const imageURL = await uploadImageToImageBB(IMAGE_BB_API_KEY, filePath)

                const caption = 'Hi this is test caption. #testing'

                const creationID = await createInstagramPost(INSTAGRAM_USER_ID, INSTAGRAM_ACCESS_TOKEN, imageURL, caption)

                const isPublished = await publishPostToInstagram(INSTAGRAM_USER_ID, INSTAGRAM_ACCESS_TOKEN, creationID)

                if(isPublished) {
                    console.log(`File: ${file} published`)
                }
            }
        })
    })
}

postToInstagram()