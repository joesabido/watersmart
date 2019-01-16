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
import ControlForm from './ControlForm'
import PictureGrid from './PictureGrid'
import Lightbox from './Lightbox'

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
     * Some initialization for the app.
     * images: Holds the parsed list of images from the XML.
     * sortBy: Holds the item property used for sorting.
     * filter: Holds the text used to tag images as visible or not.
     * lightboxItem: Holds the item currently being displayed in the lightbox. If set to false, the lighbox is hidden. 
     */
    constructor(){
        super()
        this.state = {
            images : [],
            sortBy : 'Key',
            filter : '',
            lightboxItem : false
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
     * By using a visibility tag instead of filtering the image array itself we avoid any image reloads.
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

    /**
     * Handle the user clicking an image.
     * We extract the item from the images array based on the imageName (assumed to be unique) 
     * and pass it to the lightbox component.
     */
    imageClicked = (imageName) => {
        let item = this.state.images.find(image=>image['Key']===imageName)
        this.setState({
            lightboxItem : item
        })
    }
    
    closeLightBox = () => {
        this.setState({
            lightboxItem : false
        })
    }

    lightboxNext = () => {

    }

    lightboxPrevious = () => {

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
                        onClick={imageName=>this.imageClicked(imageName)}
                    />
                </Segment>
                <Lightbox 
                    item={this.state.lightboxItem}
                    onClose={()=>this.closeLightBox()}
                    onNext={()=>this.lightboxNext()}
                    onPrevious={()=>this.lightboxPrevious()}
                />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))