const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs').promises;

const uploadImageToImageBB = async (apiKey, imagePath) => {
    const endpoint = 'https://api.imgbb.com/1/upload';

    try {
        const imageData = await fs.readFile(imagePath, { encoding: 'base64' });

        const formData = new FormData();
        formData.append('key', apiKey);
        formData.append('image', imageData);
        formData.append('expiration', 600);

        const response = await axios.post(endpoint, formData, {
            headers: formData.getHeaders(),
        });

        if (response.status === 200) {
            const downloadURL = response.data.data.url;
            return downloadURL;
        } else {
            console.error('Unable to upload image to ImageBB');
            return null;
        }
    } catch (error) {
        console.error('Error uploading image:', error.message);
        return null;
    }
};

module.exports = { uploadImageToImageBB };
