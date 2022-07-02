import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Grid from '@material-ui/core/Grid';

export default class VideoList extends React.Component {


    truncateDescription = (string) => {
        let truncated;
        if (string.length > 50) {
            truncated = string.substr(0, 50) + '...';
        } else {
            truncated = string;
        }
        return truncated;
    }

    render() {
        const { videos } = this.props;
        return (
            <Grid item md={4} sm={4} xs={12}>
                <ul className="list-group">
                    {
                        videos.length ?
                            videos.map((video, index) => {
                                if (video.snippet && video.snippet.title) {
                                    const videoId = `/watch?v=${video.id.videoId}`;
                                    return (
                                        <li key={index} className="list-group-item">
                                            <a href={videoId} className="video-list media">
                                                <div className="media-left">
                                                    <img alt={video.snippet.title} width="150" height="90" className="media-object" src={video.snippet.thumbnails.high.url} />
                                                </div>
                                                <div style={{ color: 'black' }} className="media-body">
                                                    <div className="media-heading">{this.truncateDescription(video.snippet.title)}</div>
                                                </div>
                                            </a>
                                        </li>
                                    );
                                }
                            })
                            :
                            <div>
                                <Skeleton duration={1} height={120} />
                                <Skeleton duration={1} height={20} width={100} />
                                <Skeleton duration={1} height={120} />
                                <Skeleton duration={1} height={20} width={100} />
                                <Skeleton duration={1} height={120} />
                                <Skeleton duration={1} height={20} width={100} />
                                <Skeleton duration={1} height={120} />
                                <Skeleton duration={1} height={20} width={100} />
                                <Skeleton duration={1} height={120} />
                                <Skeleton duration={1} height={20} width={100} />
                            </div>
                    }
                </ul>
            </Grid>
        );
    }
};