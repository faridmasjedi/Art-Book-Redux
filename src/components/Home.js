import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import '../style.css'

function Home(props) {
    let forms = ["Paint", "Architecture", "Sculpture", "Literature", "Music", "Performance","Cinema"];

    const [result,setResult] = useState( () => [] );
    const [filter,setFilter] = useState( () => ({form:'all', name:'', artist:''}) );
    const [flag, setFlag] = useState ( () => false);
    const [filterIndex, setFilterIndex] = useState( () => [] );
    
    useEffect( () => {
        setResult (props.list);
        setFilterIndex( props.list.map( (item, index) => index));
    },[]);

    useEffect( () => {
        setResult(props.list);
        setFilterIndex ( [...new Array(props.list.length).keys()] );
    },[flag])

    const selectHandler = (e) => setFilter(prev => ({...prev, form: e.target.value}) )
    const nameFilter = (e) => setFilter(prev => ({...prev, name: e.target.value}) )
    const artistFilter = (e) => setFilter(prev => ({...prev, artist: e.target.value}) )
    
    const filterHandler = () => {
        let {form, name, artist} = filter;
        if (form === 'all' && name === '' && artist === '') { 
            setResult(props.list);
            setFilterIndex ( [...new Array(props.list.length).keys()] );
            return;
        };

        let filterObj = {};
        let resultForFilter = [...props.list];
        let resultForFilterIndex = [];

        if (form !== undefined && form !== 'all') { filterObj.form = form;};
        if (name !== undefined && name !== '') { filterObj.name = name;};
        if (artist !== undefined && artist !== '') {filterObj.artist = artist;};

        for (let key in filterObj) {
            resultForFilter = resultForFilter.filter( item => item[key] === filterObj[key]);
        };
        
        props.list.forEach( (item, index) => {
            resultForFilter.forEach( (filtered, indexF) => {
            
                    let formCheck = filtered.form === item.form;
                    let nameCheck = filtered.name === item.name;
                    let artistCheck = filtered.artist === item.artist;

                    if (formCheck && nameCheck && artistCheck) {
                        resultForFilterIndex.push(index);
                    }
                
            })
        })

        setResult(resultForFilter);
        setFilterIndex(resultForFilterIndex);
    }

    const addMyData = () => {
        props.addMyList();
        setFlag( !flag );
        document.getElementById("myListButton").style.display = 'none';
    }

    return(
        <div id='home'>

            <header>
                <h1>Art-Books</h1>
                <nav>
                    <a href="/">Home</a>
                    <a href="/#/add">Add</a>
                    <button onClick={addMyData} id="myListButton">Add My List</button>
                </nav>
            </header>

            <div id='filter'>
                <h2>Search Bar</h2>
                <label>Art Form&nbsp;</label>
                <select onChange={selectHandler}>
                    <option value="all" key="-1">all</option>
                    { forms.map ( (item,index) => (
                         <option value={item} key={index}>{item}</option>   
                    ))}
                </select>

                <label> Art Name&nbsp;</label>
                <input onChange={nameFilter} />
                
                <label> Artist Name&nbsp;</label> 
                <input onChange={artistFilter} />
                &nbsp;

                <button onClick={filterHandler}> Search</button>
            </div>
            
            <div id="container">
                {result.map((item,index) => (
                    <div key={filterIndex[index]} id="list">
                        <a href={`/#/art/${filterIndex[index]}`}>
                            {(item.image) ? 
                                <img src={item.image} alt={item.name} id="imageHome"/>
                                :
                                <img src={`https://via.placeholder.com/200x300?text=${item.name}`} alt={item.name}/>
                            }
                        </a>
                        <p><a href={`/#/art/${filterIndex[index]}`}>{item.name}</a></p>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);

function mapStateToProps(state, ownProps){
    return {
        list: state.list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addMyList: () => {
            dispatch({type:'ADDMYLIST'});
        }
    }
}