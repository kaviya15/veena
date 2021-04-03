import React, { Component } from 'react'
import MicRecorder from 'mic-recorder-to-mp3'
import axios from 'axios'
import TrainRecord from './record'
const Mp3recorder = new MicRecorder({
    bitRate:128
})
export class Index extends Component {
    

     train= ()=>{
         window.location.href = '/TrainRecord'
     }
    test=()=>{
        window.location.href= '/TestRecord'
        // const name = this.state.name
        // axios('http://localhost:5000/test',{
        //     method:"POST",
        //     headers:{
        //         "content-type":"application/json"
        //     },
        //     body:JSON.stringify(this.state.name)
        // })
    }
    // send=()=>{
    //     axios('http://localhost:5000/test',{
    //         method:"POST",
    //         headers:{
    //             "content-type":"application/json"
    //         },
    //         body:JSON.stringify(this.state.name)
    //     })
    // }
    render() {
        return (
            <center style={{marginTop:"5rem"}}>
            
             <button className="btn btn-success ml-5 mr-5 " onClick={this.train}>Train</button>
             <button className="btn btn-success  ml-5 " onClick={this.test}  >Test</button>
             <br/>

            </center>
        )
    }
}
export default Index
