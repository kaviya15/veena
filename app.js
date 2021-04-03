import React from 'react'
import {BrowserRouter,Switch,Link,Route} from 'react-router-dom'
import Index from './index'
import TestRecord from './TestRecord'
import Trainrecord from './record'
function Appdata() {
    return (
        <BrowserRouter>
            <Route path = "/" exact={true} component={Index}/>
            <Route path = "/TrainRecord" component={Trainrecord}/>
            <Route path = "/TestRecord" component={TestRecord}/>
        </BrowserRouter>
    )
}

export default Appdata
