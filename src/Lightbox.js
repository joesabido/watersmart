/** Modules */
import React from 'react'
import filesize from 'filesize'

/** UI Components */
import { Modal, Button } from 'semantic-ui-react'

class Lightbox extends React.Component{
    /** Handlers will be uh... handled... by the parent. */
    closeModal = () => {
        this.props.onClose()
    }

    previousImage = () => {
        this.props.onPrevious()
    }

    nextImage = () => {
        this.props.onNext()
    }

    render(){
        return(
            <Modal basic={true} open={this.props.item !== false} onClose={()=>this.closeModal()}>
                <Modal.Content>
                    
                    {/** Main wrapper. */}
                    <div className='lightboxImageWrapper' style={{backgroundImage:`url(${this.props.item.url})`}}>

                        {/** Close button. */}
                        <div className='lightboxClose'>
                            <Button color='red' icon='close' circular={true} onClick={()=>this.closeModal()}/>
                        </div>

                        {/** PREVIOUS button. */}
                        <div className='lightboxPreviousWrap'>
                            <div className='lightboxPrevious'>
                                <Button primary icon='arrow left' circular={true} onClick={()=>this.previousImage()}/>
                            </div>
                        </div>

                        {/** NEXT button. */}
                        <div className='lightboxNextWrap'>
                            <div className='lightboxNext'>
                                <Button primary icon='arrow right' circular={true} onClick={()=>this.nextImage()}/>
                            </div>
                        </div>
                    </div>

                    {/** Footer with the image name and size. */}
                    <div className='lightboxFooter'>
                        <h2>{this.props.item['Key']} ({filesize(parseInt(this.props.item['Size']||0))})</h2>
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}

export default Lightbox