import React, { Component } from 'react';
import { post } from 'axios';

class CustomerAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : ''
        }
    }

    // this will be init when Form's submitting
    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        
        // give to server included file
        const config = {
            header : {
                'content-type' : 'multipart/form-data'
            }
        }

        return post(url, formData, config); // axios 
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
            })
        this.setState({
            file :  null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : ''
        })
        window.location.reload(); // reloads the current URL, like the Refresh button.
    }

    handleFileChange = (e) => {
        this.setState({
            file : e.target.files[0],   // we allow user upload just 1 file
            fileName : e.target.value
        });
    }

    // just for 'text'
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value
        this.setState(nextState);
    }


    render() {
        return (
            <form onSubmit = {this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type = "file" name = "file" file = {this.state.file} value = {this.state.fileName} onChange = {this.handleFileChange}/><br/>
                이름 : <input type = "text" name = "userName" value = {this.state.userName} onChange = {this.handleValueChange}/><br/>
                생년월일 : <input type = "text" name = "birthday" value = {this.state.birthday} onChange = {this.handleValueChange}/><br/>
                성별 : <input type = "text" name = "gender" value = {this.state.gender} onChange = {this.handleValueChange}/><br/>
                직업 : <input type = "text" name = "job" value = {this.state.job} onChange = {this.handleValueChange}/><br/>
                <button type = "submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;


// 이름, 나이, 성별 등 바뀔 수 있는 정보는 state 변수를 일단 초기화한다.
// file은 사용자의 이미지를 .file형태로 보낼 수 있어야 하기 때문에 null값으로 초기화시킨다.
// 서버로 데이터가 전달될 때는 input의 name이라는 props의 값을 기준으로 변수가 설정된다. 서버쪽에서는 file이라는 변수를 이용하여 해당 profile의 file값을 받아올 수 있다. 
// 어떤 input태그는 어떤 값들이 변경되었을 때 그 상태변화를 감지하는 onChange가 있어야 한다. 
// file이 포함되어 있는 어떤 데이터를 서버로 전송하고자 할때는 웹 표준에 맞는 header를 추가해줘야 한다. 