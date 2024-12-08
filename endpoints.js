export function getMediaContainerEndpoint(instagramUserID) {
    return `https://graph.instagram.com/v21.0/${instagramUserID}/media`
}

export function getMediaPublishEndpoint(instagramUserID) {
    return `https://graph.instagram.com/v21.0/${instagramUserID}/media_publish`
}