/** Modules */
import React from 'react'
import filesize from 'filesize'

/** UI Components */
import { Modal, Button } from 'semantic-ui-react'

class Lightbox extends React.Component{
    closeModal = () => {
        this.props.onClose()
    }

    render(){
        return(
            <Modal basic={true} open={this.props.item !== false} onClose={()=>this.closeModal()}>
                <Modal.Content>
                    <div className='lightboxImageWrapper' style={{backgroundImage:`url(${this.props.item.url})`}}>
                        <div className='lightboxClose'>
                            <Button color='red' icon='close' circular={true} onClick={()=>this.closeModal()}/>
                        </div>
                        <div className='lightboxPreviousWrap'>
                            <div className='lightboxPrevious'>
                                <Button primary icon='arrow left' circular={true} />
                            </div>
                        </div>
                        <div className='lightboxNextWrap'>
                            <div className='lightboxNext'>
                                <Button primary icon='arrow right' circular={true} />
                            </div>
                        </div>
                    </div>
                    <div className='lightboxFooter'>
                        <h2>{this.props.item['Key']} ({filesize(parseInt(this.props.item['Size']||0))})</h2>
                    </div>
                </Modal.Content>
            </Modal>
        )
    }
}

export default Lightbox