/** Modules */
import React from 'react'

/** UI Components */
import { Card, Input } from 'semantic-ui-react'

/** Custom Components */
import ImageCard from './ImageCard'

class PictureGrid extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Card.Group itemsPerRow={this.props.itemsPerPage}>
                    {this.props.images.map(image => {
                        return (
                            <ImageCard 
                                imageUrl={`${this.props.baseUrl}/${image['Key']}`}
                                imageName={image['Key']}
                                lastModified={image['LastModified']}
                            />
                        )
                    })}
                </Card.Group>
            </React.Fragment>
        )
    }
}

export default PictureGrid