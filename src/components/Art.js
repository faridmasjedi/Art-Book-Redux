import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';


function Art(props){
    const [result,setResult] = useState(() => '');
    const [res,setRes] = useState( () => false);
    const id = props.location.pathname.slice(5)

    useEffect( () => {
        setResult(props.list[id]);
        setRes(true);
    },[])

    const deleteHandler = () => {
        props.remove(id);
        props.history.push('/');
    }

    return(
        <div id="art">

            <header>
                <h1>Art-Books</h1>
                <nav>
                    <a href="/">Home</a>
                    <a href={`/#/update/${id}`}>Update</a>
                    <button onClick={deleteHandler} id="deleteButton">Delete</button>
                </nav>
            </header>
            
            { (res) ?
                <div id="art-container">
                    <div id="image-div">
                        {(result.image) ?
                            <img src={result.image} alt={result.name} id="art-img"/>
                            :
                            <img src={`https://via.placeholder.com/400x450`} alt={result.name}/>
                        }
                    </div>
                    <div id="info-div">
                        <p>Art Form: {result.form} </p>
                        <p>Name: {result.name}</p>
                        <p>Artist: {result.artist}</p>
                        <p>Year: {result.year}</p>
                        
                    </div>
                    
                    
                </div>
                :
                <div>There is no art exist with this id</div>
            }
                
        </div>
        
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Art);

function mapDispatchToProps(dispatch) {
    return {
        remove: (index) => {
            dispatch({type:'REMOVE', payload:index})
        },
    }
}

function mapStateToProps(state, ownProps){
    return {
        list: state.list
    }
}