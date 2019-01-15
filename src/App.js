/** Modules */
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import _ from 'lodash'

/** Custom classes */
import XmlParser from './XmlParser'

/** UI components */
import { Segment } from 'semantic-ui-react'

/** Custom components */
import PictureGrid from './PictureGrid'
import ControlForm from './ControlForm'

/** Assets */
import 'semantic-ui-css/semantic.min.css'
import './styles.css'

/**
 * Typically, I would put the source URL in an environment variable
 * in case the source during development is not the same as in production.
 * For the sake of simplicity I'll put it here.
 */
const baseUrl = 'http://cats.watersmart.s3.amazonaws.com'

/** Main App class */
class App extends React.Component{
    /**
     * Initialize the state of the app with an empty array as the container for the cat pictures.
     * 
     * 
     */
    constructor(){
        super()
        this.state = {
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
        let response = await axios.get(baseUrl)
        let xml = response.data

        /** Extract the items of interest, converted to a collection of JS objects. */
        let items = XmlParser.getItems(xml, 'Contents')

        /** 
         * Save them to the state and add an extra parameter for visibility (used for filtering).
         * Also, add a full URL with the image address.
         */
        this.setState({
            images : items.map(item=>{
                return{
                    ...item,
                    url : `${baseUrl}/${item['Key']}`,
                    visible : true
                }
            })
        })
    }

    /**
     * Handler for when the sort order is set.
     * This will sort the collection based on a column name carried by "value"
     */
    setSortBy = (value) => {
        this.setState({
            sortBy : value,
            images : _.sortBy(this.state.images, [value])
        })
    }

    /**
     * Handler for the filter.
     * This will tag the images with a visibility flag so the PictureGrid will know which ones to show.
     * By using a visibility tag instead of filtering the image array itself we avoid any image reloads from server.
     */
    setFilter = (value) => {
        this.setState({
            filter : value,
            images : this.state.images.map(image => {
                return {
                    ...image,
                    visible : (image['Key'].includes(value))
                }
            })
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
                        images={this.state.images}
                    />
                </Segment>    
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))