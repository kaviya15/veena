import React, { Component } from 'react'
import MicRecorder from 'mic-recorder-to-mp3'
import axios from 'axios'
const Mp3recorder = new MicRecorder({
    bitRate:128
})
export class TrainRecord extends Component {
    constructor(props) {
        super(props)
        this.state = {
             isRecording:false,
             blobURL:'',
             isBlocked:false,
             x_cords : "",
             y_cords:"",
             stakes:"",
             audio:""
        }
    }
  
    start=()=>{
        if(this.state.isBlocked){
            console.log("permission denied");
        }
        else{
            Mp3recorder.start().then(()=>{
            this.setState({isRecording:true})
            }).catch(err=>console.log(err))
        }
    }
    NextAudio=()=>{
        window.location.href= '/TrainRecord'
      }
      exit=()=>{
          window.location.href= "/"
      }
    stop=()=>{
        Mp3recorder.stop().getMp3().then(([buffer,blob])=>{
            console.log(blob);
            const blobURL = URL.createObjectURL(blob)
            this.setState({blobURL,isRecording:false})
            console.log(this.state.blobURL);
        }).catch(err=>console.log(err))
    }
    x_cords=(e)=>{this.setState({x_cords:e.target.value})}
    y_cords=(e)=>{this.setState({y_cords:e.target.value})}
    stakes=(e)=>{this.setState({stakes:e.target.value})}
    send=(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('audio-file', this.state.blobURL);
        const data = {
            x_ : this.state.x_cords,
            y_:this.state.y_cords,
            stakes : this.state.stakes,
            dataaudio:this.state.blobURL
        }
        console.log(formData);
         axios.post('http://localhost:5000/test',data).then(res=>{
             console.log(res);
         }).catch(err=>{
             console.log(err);
         })
     }
    //  handlePlay = () => {
    //     const tmp = new Audio(this.state.blobURL);
    //     console.log(tmp);
    //     tmp.play()
    //   }
    componentDidMount(){
        navigator.getUserMedia({audio:true},()=>{
     console.log("permission granted");
     this.setState({isBlocked:false})
        },
        ()=>{
            console.log("denied");
            this.setState({isBlocked:true})
      } )}

    render() {
        return (
            <center style={{marginTop:"5rem"}}>
             <button className="btn btn-primary mr-5" onClick={this.start} disabled={this.state.isRecording}>Record</button>
             <button className="btn btn-danger ml-5 mr-5 " onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
                 <form onSubmit={this.send}  className="form-validate "> 
                     <div style={{marginTop:"5rem"}}>
                     <div  className="form-group">
                          <label htmlFor="">
                             X_CO-ORDINATE: 
                          </label>
                          <input value={this.state.x_cords} style={{width:'20rem'}} type="tel" className="form-control" name="x" onChange={this.x_cords} />
                         
                      </div>
                      <div className="form-group">
                          <label htmlFor="">
                             Y_CO-ORDINATE: 
                          </label>
                          <input value={this.state.y_cords} style={{width:'20rem'}} type="tel" name="y" className="form-control" onChange={this.y_cords}/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="">
                            FAULT STAKES
                          </label>
                          <input value={this.state.stakes}  style={{width:'20rem'}} name="s" type="tel" className="form-control" onChange={this.stakes}/>
                      </div>
                      <input type="submit" className="btn btn-success"/>
                     </div> 
             </form>
             <br/>
             <button onClick={this.handlePlay}>nnn</button>
             <button  onClick={this.NextAudio} className="btn btn-primary mt-5 mr-5">Next Audio</button>
               <button onClick={this.exit} className="btn btn-warning mt-5 ml-5">Exit</button> <br/>
             <audio className="btn btn-danger mt-5 " src= {this.state.blobURL} controls="controls"/>

            </center>
        )
    }
}
export default TrainRecord
