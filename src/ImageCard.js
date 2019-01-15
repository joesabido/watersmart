/** Modules */
import React from 'react'
import moment from 'moment'

/** UI Components */
import { Card, Image } from 'semantic-ui-react'

class ImageCard extends React.Component{
    render(){
        let lastModified = moment(this.props.lastModified).format('MMM Do, YYYY h:m A')
        return(
            <Card>
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