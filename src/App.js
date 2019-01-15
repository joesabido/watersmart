import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import _ from 'lodash'

import { Button } from 'semantic-ui-react'

import XmlParser from './XmlParser'

import 'semantic-ui-css/semantic.min.css'

/**
 * Typically, I would put this URL in an environment variable
 * in case the source during development is not the same as production.
 */
const catSource = 'http://cats.watersmart.s3.amazonaws.com'

class App extends React.Component{
    /**
     * Initialize the state of the app with an empty array as the container for the cat pictures.
     */
    constructor(){
        super()
        this.state = {
            catPictures : []
        }
    }

    /**
     * Upon App startup, retrieve XML and parse into array.
     */
    componentDidMount = async () => {
        /** Get the XML from the source. */
        let response = await axios.get(catSource)
        let xml = response.data

        /** Extract the items of interest, converted to a collection of JS objects. */
        let catPictures = XmlParser.getItems(xml, 'Contents')

        /** Save them to the state */
        this.setState({
            catPictures
        })
    }

    render(){
        return(
            <Button basic={true} icon='heart' content='Test' />
            
        )
    }
}
/**
 * Mount the App component onto the root div.
 */

ReactDOM.render(<App />, document.getElementById('root'))