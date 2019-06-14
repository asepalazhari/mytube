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
import { clearDataVideo } from "../Redux/Action";

class WatchHistory extends React.Component {

    state = {
        videoHistory: []
    }

    componentDidMount() {
        this.props.clearDataVideo();
        this.getDataWatchHistory();
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

    getDataWatchHistory = () => {
        let lastHistoryWatch = JSON.parse(localStorage.getItem('historyWatch'));
        setTimeout(() => {
            this.setState({videoHistory: lastHistoryWatch.reverse()})
        }, 1000);
    }

    render() {
        const { countVideos } = this.props;
        const { videoHistory } = this.state;
        return (
            <div>
                <Grid style={{padding:20}}>
                    {
                        videoHistory.length ?
                            videoHistory.map((result, index) => {
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
                                                        image={result.thumbnails}
                                                        title={result.title}
                                                    />
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                        <Grid style={{ padding: 15 }}  component={Link} to={videoId} xs={12} sm={9}>
                                            <Typography variant="subtitle1" color="textPrimary">
                                                {result.title} 
                                            </Typography>
                                            <Typography variant="subtitle2" color="textPrimary">
                                                {result.channelTitle} • <Moment fromNow>{result.watchDate}</Moment>
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {this.truncateDescription(result.description)}
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
        countVideos: prevState.countVideos,
    }
}

const mapDispatchToProps = { clearDataVideo }


export default connect(mapStateToProps, mapDispatchToProps)(WatchHistory);