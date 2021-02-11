import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import Form from './Form';

function Update(props) {
    const id = props.location.pathname.slice(8);
    const [result,setResult] = useState(() => []);

    useEffect( () => {
        setResult(props.list[Number(id)]);
    },[])
    
    const fetchData = (id) => {
        props.history.push(`/art/${id}`)
    }

    return(
        <Form 
            nameComponent="update"
            form = {result.form}
            name = {result.name}
            year = {result.year}
            artist = {result.artist}
            image = {result.image}
            id = {id}
            onClick = {fetchData}
        />
        
    )
}

export default connect(mapStateToProps)(Update);

function mapStateToProps(state, ownProps){
    return {
        list: state.list
    }
}