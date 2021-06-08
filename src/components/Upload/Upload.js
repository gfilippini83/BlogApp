import React, { Component } from 'react';
import axios from 'axios';

export default class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile : null
        }
    }
    onChangeHandler=event=>{
        console.log(event.target.files[0])
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }

    onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        // axios.post('/upload/postImage',data)
        fetch('/api/postImage', { method : 'POST', body: data })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }

    render() {
        return (
            <div>
                <input type="file" id="file" name="image" onChange={this.onChangeHandler}/>
                <button onClick={this.onClickHandler}>Upload</button>
            </div>
        );
    }
}