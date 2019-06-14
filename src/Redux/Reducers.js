
const myData = {
    videos: [],
    relatedVideos: [],
    vParam: '',
    VideosSpesifc: '',
    trendingVideos: '',
    searchVideos: '',
    statsVideos: '',
    countVideos: [1, 2, 3, 4]
}

const myReducer = (prevState = {...myData}, action) =>  {
    switch (action.type) {
        case 'GET_FEED':
            return ({
                ...prevState,
                videos: action.data
            })
        case 'GET_RELATED_VIDEO':
            return ({
                ...prevState,
                relatedVideos: action.data
            })
        case 'REPLACE_PARAM':
            return ({
                ...prevState,
                vParam: action.data
            })
        case 'GET_SPESIFIC_VIDEO':
            return ({
                ...prevState,
                VideosSpesifc: action.data
            })
        case 'CLEAR_VIDEO':
            return ({
                ...prevState,
                VideosSpesifc: '',
                trendingVideos: '',
                searchVideos: '',
                relatedVideos: []

            })
        case 'GET_TRENDING_VIDEO':
            return ({
                ...prevState,
                trendingVideos: action.data
            })
        case 'GET_SEARCH_VIDEO':
            return ({
                ...prevState,
                searchVideos: action.data
            })
        case 'SET_REDIRECT_SEARCH':
            return ({
                ...prevState
            })
        case 'GET_STATS_VIDEO':
            return ({
                ...prevState,
                statsVideos: action.data
            })
        default:
            return prevState
    }
}

export default myReducer;