import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Grid from '@material-ui/core/Grid';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { fetchSearchVideos, clearDataVideo } from "../Redux/Action";

class ResultSearch extends React.Component {

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        this.props.fetchSearchVideos(parsed.search_query);
    }

    componentDidUpdate(prevProps) {
        const parsed = queryString.parse(this.props.location.search);
        let prevParam = prevProps.location.search.slice(14);
        if (parsed.search_query !== prevParam) {
            this.props.clearDataVideo();
            this.props.fetchSearchVideos(parsed.search_query);
        }
    }

    truncateDescription = (string) => {
        let truncated;
        if (string.length > 50) {
            truncated = string.substr(0, 200) + '...';
        } else {
            truncated = string;
        }
        return truncated;
    }

    render() {
        const { searchVideos, countVideos } = this.props;
        return (
            <div>
                {/* <SearchBar onSearchTermChange={searchTerm => this.videoSearch(searchTerm)} /> */}
                <Grid style={{ padding: 20 }}>
                    {
                        searchVideos.length ?
                            searchVideos
                            .filter((result) => {
                                return result.id.videoId !== undefined;
                            })
                            .map((result, index) => {
                                const videoId = `/watch?v=${result.id.videoId}`;
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
                                        <Grid style={{ padding: 15 }} component={Link} to={videoId} xs={12} sm={9}>
                                            <Typography variant="subtitle1" color="textPrimary">
                                                {result.snippet.title}
                                            </Typography>
                                            <Typography variant="subtitle2" color="textPrimary">
                                                {result.snippet.channelTitle} • <Moment fromNow>{result.snippet.publishedAt}</Moment>
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {this.truncateDescription(result.snippet.description)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                );
                            })
                            :
                            countVideos.map((result, index) => {
                                return (
                                    <Grid key={index} container spacing={3}>
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
        searchVideos: prevState.searchVideos,
        paramSearch: prevState.paramSearch,
        countVideos: prevState.countVideos,
    }
}

const mapDispatchToProps = { fetchSearchVideos, clearDataVideo }


export default connect(mapStateToProps, mapDispatchToProps)(ResultSearch);