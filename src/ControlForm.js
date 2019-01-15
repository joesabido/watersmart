/** Modules */
import React from 'react'

/** UI Components */
import { Grid, Input, Dropdown } from 'semantic-ui-react'

const sortOptions = [{
    text : 'Sort by Name',
    value : 'name'
},{
    text : 'Sort by Date',
    value: 'date'
}]

class PictureGrid extends React.Component{
    render(){
        return(
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Input label='Filter by name' icon='filter' fluid={true}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown options={sortOptions} defaultValue={sortOptions[0].value} selection={true} fluid={true}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default PictureGrid


