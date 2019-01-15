/** Modules */
import React from 'react'

/** UI Components */
import { Grid, Input, Dropdown } from 'semantic-ui-react'

const sortOptions = [{
    text : 'Sort by Name',
    value : 'Key'
},{
    text : 'Sort by Date',
    value: 'LastModified'
}]

class PictureGrid extends React.Component{
    /** Pass the handlers to the parent. */
    setSortBy = (target) => {
        this.props.onChangeSortBy(target.value)
    }

    setFilter = (target) => {
        this.props.onChangeFilter(target.value)
    }

    render(){
        return(
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Input 
                            label='Filter by name' 
                            icon='filter' 
                            fluid={true}
                            onChange={(e, target)=>this.setFilter(target, e)}
                        />
                            
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown 
                            options={sortOptions} 
                            value={this.props.sortBy||sortOptions[0].value}
                            selection={true} 
                            fluid={true}
                            onChange={(e, target)=>this.setSortBy(target, e)}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default PictureGrid


