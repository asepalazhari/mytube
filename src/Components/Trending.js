import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { fetchTrendingVideos, clearDataVideo } from "../Redux/Action";

class Trending extends React.Component {

    componentDidMount() {
        this.props.clearDataVideo();
        this.props.fetchTrendingVideos();
        window.scrollTo(0, 0);
    }

    truncateDescription = (string) => {
        let truncated;
        if (string.length > 50) {
            truncated = string.substr(0, 200) + '...';
        }else{
            truncated = string;
        }
        return truncated;
    }

    render() {
        const { trendingVideos, countVideos } = this.props;
        return (
            <div>
                {/* <SearchBar onSearchTermChange={searchTerm => this.videoSearch(searchTerm)} /> */}
                <Grid style={{padding:20}}>
                    {
                        trendingVideos.length ?
                            trendingVideos.map((result, index) => {
                                const videoId = `/watch?v=${result.id}`;
                                return (
                                    <Grid container spacing={3} key={index} >
                                        <Grid item xs={12} sm={3}>
                                            <Card component={Link} to={videoId} style={{ height: 230 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        height="140"
                                                        image={result.snippet.thumbnails.high.url}
                                                        title={result.snippet.title}
                                                    />
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                        <Grid style={{ padding: 15 }}  component={Link} to={videoId} xs={12} sm={9}>
                                            <Typography variant="subtitle1" color="textPrimary">
                                                {result.snippet.localized.title} 
                                            </Typography>
                                            <Typography variant="subtitle2" color="textPrimary">
                                                {result.snippet.channelTitle} • <Moment fromNow>{result.snippet.publishedAt}</Moment>
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {this.truncateDescription(result.snippet.localized.description)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                );
                            })
                            :
                            countVideos.map((result, index) => {
                                return (
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={3}>
                                            <Skeleton duration={1} height={150} />
                                        </Grid>
                                        <Grid item xs={12} sm={9}>
                                            <Skeleton duration={1} height={25} />
                                            <Skeleton duration={1} height={25} />
                                            <Skeleton duration={1} width={100} height={25} />
                                        </Grid>
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
        trendingVideos: prevState.trendingVideos,
        countVideos: prevState.countVideos,
    }
}

const mapDispatchToProps = { fetchTrendingVideos, clearDataVideo }


export default connect(mapStateToProps, mapDispatchToProps)(Trending);