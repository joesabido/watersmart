/** Modules */
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import _ from 'lodash'

/** Custom classes */
import XmlParser from './XmlParser'

/** UI components */
import { Segment, Input } from 'semantic-ui-react'

/** Custom components */
import PictureGrid from './PictureGrid'
import ControlForm from './ControlForm'

/** Assets */
import 'semantic-ui-css/semantic.min.css'
import './styles.css'

/** Main App class */
class App extends React.Component{
    /**
     * Initialize the state of the app with an empty array as the container for the cat pictures.
     * 
     * Typically, I would put the source URL in an environment variable
     * in case the source during development is not the same as in production.
     * For the sake of simplicity I'll put it in the state.
     */
    constructor(){
        super()
        this.state = {
            baseUrl : 'http://cats.watersmart.s3.amazonaws.com',
            images : [],
            sortBy : 'Key',
            filter : ''
        }
    }

    /**
     * Upon App startup, retrieve XML and parse into JS array.
     */
    componentDidMount = async () => {
        /** Get the XML from the source. */
        let response = await axios.get(this.state.baseUrl)
        let xml = response.data

        /** Extract the items of interest, converted to a collection of JS objects. */
        let items = XmlParser.getItems(xml, 'Contents')

        /** Save them to the state */
        this.setState({
            images : items
        })
    }

    /**
     * Handlers for the controls
     */
    setSortBy = (value) => {
        this.setState({
            sortBy : value
        })
    }

    setFilter = (value) => {
        this.setState({
            filter : value
        })
    }

    render(){
        return(
            <div className='mainContainer'>
                <ControlForm 
                    sortBy={this.state.sortBy}
                    filter={this.state.filter}
                    onChangeSortBy={value=>this.setSortBy(value)}
                    onChangeFilter={value=>this.setFilter(value)}
                />
                <Segment>
                    <PictureGrid 
                        itemsPerPage={4}
                        baseUrl={this.state.baseUrl}
                        images={this.state.images} 
                    />
                </Segment>    
            </div>
        )
    }
}
/**
 * Mount the App component onto the root div.
 */

ReactDOM.render(<App />, document.getElementById('root'))