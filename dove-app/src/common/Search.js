import React, {useState} from 'react';
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

// Reference1: https://github.com/machadop1407/React-Search-Bar
// Reference2: https://www.cluemediator.com/search-filter-for-multiple-object-in-reactjs
// Edited by Xiao Lin
function Search({placeholder, data}){
    const [wordEntered, setWordEntered] = useState("");
    const [info, setInfo] = useState(data);

    // exclude column list from filter
    const excludeColumns = ["storeAddress", "storeDensity"];

    // handle change event of search input
    const handleChange = value => {
        setWordEntered(value);
        filterData(value);
    };

    // filter records by search text
    const filterData = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") setInfo(data);
        else {
            const filteredData = data.filter(item => {
                return Object.keys(item).some(key =>
                    excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
                );
            });
            setInfo(filteredData);
        }
    }

    const clearInput = () => {
        setWordEntered("");
        handleChange("");
    };

    return(
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} value={wordEntered} onChange={e => handleChange(e.target.value)}/>
                <div className="searchIcon">
                    {wordEntered.length === 0 ? (
                        <SearchIcon />
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                </div>
            </div>
            <div className="box-container">
                <h3>Store information display</h3>
                {[info].map((d, i) => {
                    return <div key={i} className="box">
                        <blockquote>
                            <b>Store: </b>{d.storeName}<br />
                            <b>Address: </b>{d.storeAddress}<br />
                            <b>Population Density: </b>{d.storeDensity}<br />
                            <b>Rules: </b>{d.storeInfo}
                        </blockquote>
                    </div>
                })}
                <div className="clear"></div>
                {info.length === 0 && <span>No Store found to display!</span>}
            </div>
        </div>
    );
}

export default Search;