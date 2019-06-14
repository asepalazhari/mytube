import React from 'react';
import NumberFormat from 'react-number-format';
import Skeleton from 'react-loading-skeleton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ShowMore from 'react-show-more';

export default class VideoDetail extends React.Component {

    render() {
        const { videoId, videoDetail, statisticVideo } = this.props;
        const url = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        console.log(statisticVideo);
        
        return (
            <Grid item md={8} sm={8} xs={12}>
                {
                    videoDetail ?
                        <div>
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe title="{video.snippet.title}" className="embed-responsive-item" src={url}></iframe>
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography variant="subtitle1" color="textPrimary">
                                        {videoDetail[0].snippet.title}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography style={{ marginTop: 15 }} variant="subtitle2" color="textSecondary">
                                        <NumberFormat value={statisticVideo[0].statistics.viewCount} displayType={'text'} thousandSeparator={true} /> Views
                                        <NumberFormat style={{ marginLeft: 50 }} value={statisticVideo[0].statistics.likeCount} displayType={'text'} thousandSeparator={true} /> Likes
                                        <NumberFormat style={{ marginLeft: 10 }}  value={statisticVideo[0].statistics.dislikeCount} displayType={'text'} thousandSeparator={true} /> Disikes
                                    </Typography>
                                </Grid><hr />
                                <Grid item xs={12} sm={12} md={12}>
                                    <ShowMore
                                        lines={3}
                                        more='Show more'
                                        less='Show less'
                                    >
                                        <Typography style={{ marginTop: 15 }} variant="subtitle2" color="textSecondary">
                                            {videoDetail[0].snippet.description}
                                        </Typography>
                                    </ShowMore>
                                </Grid>
                            </div>
                        </div>
                    : 
                    <div>
                        <Grid item xs={12} sm={12}>
                            <Skeleton duration={1} height={350} />
                            <Skeleton duration={1} height={30} width={250} />
                        </Grid>
                        <Grid style={{marginTop:50}} item xs={12} sm={12}>
                            <Skeleton duration={1} height={30}/>
                            <Skeleton duration={1} height={30}/>
                            <Skeleton duration={1} height={30} width={200} />
                        </Grid>
                    </div>
                }
            </Grid>
        );
    }
};
