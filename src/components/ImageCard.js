/** Modules */
import React from 'react'
import moment from 'moment'

/** UI Components */
import { Card, Image } from 'semantic-ui-react'

class ImageCard extends React.Component{
    /** 
     * Pass the click event to the parent every time the card is clicked and pass the image name. 
     * I'm assuming the image name is unique, otherwise we could use the ETag property or anything
     * else that we know to be unique.
     */
    cardClicked = (imageName) => {
        this.props.onClick(imageName)
    }

    render(){
        /** Format the lastModified attribute into a human friendly format. */
        let lastModified = moment(this.props.lastModified).format('MMM Do, YYYY h:m A')
        
        return(
            <Card onClick={e=>this.cardClicked(this.props.imageName, e)}>
                <div className='catImage'>
                    <Image src={this.props.imageUrl}/>
                </div>
                <Card.Content>
                    <Card.Meta>
                        <p><strong>{this.props.imageName}</strong></p>
                        <p>Modified:<br />{lastModified}</p>
                    </Card.Meta>
                </Card.Content>
            </Card>
        )
    }
}

export default ImageCard