/** Modules */
import React from 'react'
import _ from 'lodash'

/** UI Components */
import { Card, Message } from 'semantic-ui-react'

/** Custom Components */
import ImageCard from './ImageCard'

class PictureGrid extends React.Component{    
    render(){
        return(
            <React.Fragment>
                <Card.Group itemsPerRow={this.props.itemsPerPage}>
                    {this.props.images.map(image => {
                        return (
                            /** 
                             * Render only the elements with visibility tag set to true.
                             */
                            image.visible ? (
                                <ImageCard 
                                    imageUrl={`${this.props.baseUrl}/${image['Key']}`}
                                    imageName={image['Key']}
                                    lastModified={image['LastModified']}
                                />
                            ) : null
                        )
                    })}
                </Card.Group>

                {/** This conditional render will show an error if the filter is too strict by filtering the items with visibility tag set to true. */}
                
                {this.props.images.filter(image=>image.visible).length ? null : (
                    <Message negative={true}>
                        <p>The filter returned no results. Be less specific.</p>
                    </Message>
                )}
            </React.Fragment>
        )
    }
}

export default PictureGrid