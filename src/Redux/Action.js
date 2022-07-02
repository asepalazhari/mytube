
import axios from "axios";

export const fetchVideosHome = (param) => {
    return (dispatch) => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${param}&regionCode=ID&maxResults=5&key=${process.env.REACT_APP_KEY_GOOGLE}`)
            .then(response => {
                setTimeout(() => {
                    dispatch(getFeedVideos(response.data.items))
                }, 1000);
            });
    }
}

export const fetchSpesifikVideo = (videoId) => {
    return (dispatch) => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.REACT_APP_KEY_GOOGLE}`)
            .then(response => {
                let date = new Date();
                let saveData = {
                            id: response.data.items[0].id,
                            title: response.data.items[0].snippet.title,
                            channelTitle: response.data.items[0].snippet.channelTitle,
                            thumbnails: response.data.items[0].snippet.thumbnails.high.url,
                            description: response.data.items[0].snippet.description,
                            watchDate: date
                        }
                if (!!(localStorage.getItem('historyWatch'))) {
                    let lastHistoryWatch = JSON.parse(localStorage.getItem('historyWatch'));
                    lastHistoryWatch.push(saveData);
                    localStorage.setItem('historyWatch', JSON.stringify(lastHistoryWatch));
                }else{
                    let historyWatch = [];
                    historyWatch.push(saveData);
                    localStorage.setItem('historyWatch', JSON.stringify(historyWatch));
                }
                dispatch(fetchRelated(videoId));
                dispatch(fetchStatsVideo(videoId));
                setTimeout(() => {
                    dispatch(getSpesificVideos(response.data.items));
                }, 1000);
            });
    }
}

export const fetchRelated = (videoId) => {
    return (dispatch) => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=${process.env.REACT_APP_KEY_GOOGLE}`)
            .then(response => {
                setTimeout(() => {
                    dispatch(getRelatedVideos(response.data.items));
                    dispatch(replaceVParam(videoId))
                }, 1000);
            });
    }
}

export const fetchStatsVideo = (videoId) => {
    return (dispatch) => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${process.env.REACT_APP_KEY_GOOGLE}`)
            .then(response => {
                dispatch(getStatsVideo(response.data.items));
            });
    }
}

export const fetchTrendingVideos = () => {
    return (dispatch) => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=ID&maxResults=15&key=${process.env.REACT_APP_KEY_GOOGLE}`)
            .then(response => {
                setTimeout(() => {
                    dispatch(getTrendingVideo(response.data.items));
                }, 1000);
            });
    }
}

export const fetchSearchVideos = (param) => {
    return (dispatch) => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${param}&regionCode=ID&maxResults=12&key=${process.env.REACT_APP_KEY_GOOGLE}`)
            .then(response => {
                setTimeout(() => {
                    dispatch(getSeachVideo(response.data.items));
                }, 1000);
            });
    }
}

export const getFeedVideos = (valueData) => ({
    type: 'GET_FEED',
    data: valueData
})

export const getRelatedVideos = (valueData) => ({
    type: 'GET_RELATED_VIDEO',
    data: valueData
})

export const replaceVParam = (valueData) => ({
    type: 'REPLACE_PARAM',
    data: valueData
})

export const getSpesificVideos = (valueData) => ({
    type: 'GET_SPESIFIC_VIDEO',
    data: valueData
})

export const clearDataVideo = () => ({
    type: 'CLEAR_VIDEO'
})

export const getTrendingVideo = (valueData) => ({
    type: 'GET_TRENDING_VIDEO',
    data: valueData
})

export const getSeachVideo = (valueData) => ({
    type: 'GET_SEARCH_VIDEO',
    data: valueData
})

export const getStatsVideo = (valueData) => ({
    type: 'GET_STATS_VIDEO',
    data: valueData
})

