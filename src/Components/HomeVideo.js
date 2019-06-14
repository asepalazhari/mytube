import React from 'react';
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import Grid from '@material-ui/core/Grid'; 
import decode from 'decode-html';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
// import { fetchVideosHome } from "../Redux/Action";

class HomeVideo extends React.Component {

    state = {
        video1: '',
        video2: '',
        video3: '',
        video4: ''
    }

    fetchVideos = (param) => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${param}&regionCode=ID&maxResults=10&key=AIzaSyBdVut9QCzqAHBzfDEh30yUp4E529som6s`)
            .then(response => {
                setTimeout(() => {
                    this.setState({ video1: response.data.items })
                }, 1000);
            });
    }

    fetchVideos2 = (param) => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${param}&regionCode=ID&maxResults=10&key=AIzaSyBdVut9QCzqAHBzfDEh30yUp4E529som6s`)
            .then(response => {
                setTimeout(() => {
                    this.setState({ video2: response.data.items})
                }, 1000);
            });
    }

    fetchVideos3 = (param) => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${param}&regionCode=ID&maxResults=10&key=AIzaSyBdVut9QCzqAHBzfDEh30yUp4E529som6s`)
            .then(response => {
                setTimeout(() => {
                    this.setState({ video3: response.data.items })
                }, 1000);
            });
    }

    fetchVideos4 = (param) => {
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${param}&regionCode=ID&maxResults=10&key=AIzaSyBdVut9QCzqAHBzfDEh30yUp4E529som6s`)
            .then(response => {
                setTimeout(() => {
                    this.setState({ video4: response.data.items })
                }, 1000);
            });
    }

    componentDidMount() {
        // this.props.fetchVideosHome('Alan Walker');
        this.fetchVideos("Alan Walker");
        this.fetchVideos2("Hactiv8");
        this.fetchVideos3("PUBG Mobile");
        this.fetchVideos4("Arief Muhammad");
        window.scrollTo(0, 0);
    }

    truncateDescription = (string) => {
        let truncated;
        if (string.length > 50) {
            truncated = string.substr(0, 40) + '...';
        } else {
            truncated = string;
        }
        return truncated;
    }

    render() {
        const { countVideos } = this.props;
        const { video1, video2, video3, video4 } = this.state;
        
        return (
            <div>
                <Grid container spacing={3}>
                    {
                        video1.length ?
                            video1
                            .filter((result, index) => {
                                return index < 5 && result.id.videoId !== undefined;
                            })
                            .map((result, index) => {
                                const videoId = `/watch?v=${result.id.videoId}`;
                                const judul = decode(result.snippet.title)
                                return (
                                    <Grid key={index} item xs={12} sm={3}>
                                        <Card component={Link} to={videoId} style={{height:230}}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    alt="Contemplative Reptile"
                                                    height="140"
                                                    image={result.snippet.thumbnails.high.url}
                                                    title={judul}
                                                />
                                                <CardContent>
                                                    <Typography  variant="subtitle1" color="textPrimary">
                                                        {this.truncateDescription(judul)}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {result.snippet.channelTitle} • <Moment fromNow>{result.snippet.publishedAt}</Moment>
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                );
                            })
                        :
                            countVideos.map((result, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={3}>
                                        <Skeleton duration={1} height={150} />
                                        <Skeleton duration={1} height={25} />
                                        <Skeleton duration={1} width={100} height={25} />
                                    </Grid>
                                );
                            })
                    }
                    {
                        video2.length ?
                            video2
                                .filter((result, index) => {
                                    return index < 6 && result.id.videoId !== undefined;
                                })
                                .map((result, index) => {
                                    const videoId = `/watch?v=${result.id.videoId}`;
                                    const judul = decode(result.snippet.title)
                                    return (
                                        <Grid key={index} item xs={12} sm={3}>
                                            <Card component={Link} to={videoId} style={{ height: 230 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        height="140"
                                                        image={result.snippet.thumbnails.high.url}
                                                        title={judul}
                                                    />
                                                    <CardContent>
                                                        <Typography variant="subtitle1" color="textPrimary">
                                                            {this.truncateDescription(judul)}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {result.snippet.channelTitle} • <Moment fromNow>{result.snippet.publishedAt}</Moment>
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    );
                                })
                            :
                            countVideos.map((result, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={3}>
                                        <Skeleton duration={1} height={150} />
                                        <Skeleton duration={1} height={25} />
                                        <Skeleton duration={1} width={100} height={25} />
                                    </Grid>
                                );
                            })
                    }
                    {
                        video3.length ?
                            video3
                                .filter((result, index) => {
                                    return index < 6 && result.id.videoId !== undefined;
                                })
                                .map((result, index) => {
                                    const videoId = `/watch?v=${result.id.videoId}`;
                                    const judul = decode(result.snippet.title)
                                    return (
                                        <Grid key={index} item xs={12} sm={3}>
                                            <Card component={Link} to={videoId} style={{ height: 230 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        height="140"
                                                        image={result.snippet.thumbnails.high.url}
                                                        title={judul}
                                                    />
                                                    <CardContent>
                                                        <Typography variant="subtitle1" color="textPrimary">
                                                            {this.truncateDescription(judul)}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {result.snippet.channelTitle} • <Moment fromNow>{result.snippet.publishedAt}</Moment>
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    );
                                })
                            :
                            countVideos.map((result, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={3}>
                                        <Skeleton duration={1} height={150} />
                                        <Skeleton duration={1} height={25} />
                                        <Skeleton duration={1} width={100} height={25} />
                                    </Grid>
                                );
                            })
                    }
                    {
                        video4.length ?
                            video4
                                .filter((result, index) => {
                                    return index < 6 && result.id.videoId !== undefined;
                                })
                                .map((result, index) => {
                                    const videoId = `/watch?v=${result.id.videoId}`;
                                    const judul = decode(result.snippet.title)
                                    return (
                                        <Grid key={index} item xs={12} sm={3}>
                                            <Card component={Link} to={videoId} style={{ height: 230 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        height="140"
                                                        image={result.snippet.thumbnails.high.url}
                                                        title={judul}
                                                    />
                                                    <CardContent>
                                                        <Typography variant="subtitle1" color="textPrimary">
                                                            {this.truncateDescription(judul)}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {result.snippet.channelTitle} • <Moment fromNow>{result.snippet.publishedAt}</Moment>
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    );
                                })
                            :
                            countVideos.map((result, index) => {
                                return (
                                    <Grid key={index} item xs={12} sm={3}>
                                        <Skeleton duration={1} height={150} />
                                        <Skeleton duration={1} height={25} />
                                        <Skeleton duration={1} width={100} height={25} />
                                    </Grid>
                                );
                            })
                    }
                </Grid>
            </div>
        );
    }

}

const mapStateToProps = (prevState) => {
    return {
        videos: prevState.videos,
        countVideos: prevState.countVideos,
    }
}

// const mapDispatchToProps = { fetchVideosHome }


export default connect(mapStateToProps, null)(HomeVideo);