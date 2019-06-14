import React from 'react';
import { withRouter } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from "react-redux";
import { clearDataVideo } from "../../Redux/Action";

class SearchForm extends React.Component {

    state = {
        keySearch: ''
    }

    componentDidMount() {
        this.props.clearDataVideo();
    }

    keyPress = (e) => {
        if (e.keyCode === 13) {
            let queryData = `/result?search_query=${e.target.value}`;
            this.props.history.push(queryData)
        }
    }

    searchYT = (e) => {
        let queryData = `/result?search_query=${this.state.keySearch}`;
        this.props.history.push(queryData)
    }

    render() {
        return (
            <div>
                <InputBase onChange={(e) => this.setState({ keySearch: e.target.value })} onKeyDown={(e) => this.keyPress(e)} placeholder="Search" />
                <IconButton onClick={this.searchYT} aria-label="Search">
                    <SearchIcon />
                </IconButton>
            </div>
        );
    }

}

const mapStateToProps = (prevState) => {
    return {
        paramSearch: prevState.paramSearch,
        redirectSearch: prevState.redirectSearch
    }
}
const mapDispatchToProps = { clearDataVideo }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm));