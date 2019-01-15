import React from 'react'
import ReactDOM from 'react-dom'

import { Button } from 'semantic-ui-react'

import './semantic/dist/semantic.min.css'

class App extends React.Component{
    render(){
        return(
            <Button basic={true} icon='heart' content='Test' />
            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))