import React from 'react';
import queryString from 'query-string';
import VideoList from './VideoList';
import VideoDetail from './videoDetail';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import { fetchSpesifikVideo, clearDataVideo, fetchStatsVideo } from "../../Redux/Action";

class DetailVideo extends React.Component {

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        let v = parsed.v;
        this.props.clearDataVideo();
        this.props.fetchStatsVideo();
        this.props.fetchSpesifikVideo(v);
        window.scrollTo(0, 0);
    }

    render() {
        const { relatedVideos, vParam, VideosSpesifc, statsVideos } = this.props;
        return (
            <Grid container spacing={3}>
                <VideoDetail statisticVideo={statsVideos} videoId={vParam} videoDetail={VideosSpesifc} />
                <VideoList
                    videos={relatedVideos} />
            </Grid>
        );
    }
}

const mapStateToProps = (prevState) => {
    return {
        relatedVideos: prevState.relatedVideos,
        vParam: prevState.vParam,
        VideosSpesifc: prevState.VideosSpesifc,
        statsVideos: prevState.statsVideos,
    }
}
const mapDispatchToProps = { fetchSpesifikVideo, clearDataVideo, fetchStatsVideo }
export default connect(mapStateToProps, mapDispatchToProps)(DetailVideo);