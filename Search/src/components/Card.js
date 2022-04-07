import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Card({product}) {
  const [APIData, setAPIData] = useState([])
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    axios.get(`https://aravindtwitter.herokuapp.com/twittersearch?key=adobe`)
    .then((response) => {
      setAPIData(response.data.statuses);
    })
  }, [])

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = APIData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(APIData)
    }
  }

  return(
    <div className="container">
      <div className='inputbox text-center'>
        <input icon='search' placeholder='Search...' onChange={(e) => searchItems(e.target.value)} />
      </div>

      {searchInput.length > 1 ? (
        filteredResults.map((item) => {
          return (
            <div className="twitterprofile_blk">
              <div className='twitterprofile_img'>
                <img src={item.user.profile_image_url} alt="" />
              </div>
              <div className='twitterprofile_txt'>
                <div className='twitterprofile_info'>
                  <span className="twitterprofile_name">{item.user.name}</span>
                  <span className="twitterprofile_sname">@{item.user.screen_name}</span>
                  <span className="twitterprofile_time">@{item.created_at}</span>
                </div>
                <div className='twitterprofile_desc'>
                  <h3>{item.text}</h3>
                </div>
              </div>                
            </div>
          )
        })
      ) : (
        APIData.map((item) => {
          return (
            <div className="twitterprofile_blk">
              <div className='twitterprofile_img'>
                <img src={item.user.profile_image_url} alt="" />
              </div>
              <div className='twitterprofile_txt'>
                <div className='twitterprofile_info'>
                  <span className="twitterprofile_name">{item.user.name}</span>
                  <span className="twitterprofile_sname">@{item.user.screen_name}</span>
                  <span className="twitterprofile_time">@{item.created_at}</span>
                </div>
                <div className='twitterprofile_desc'>
                  <h3>{item.text}</h3>
                </div>
              </div>                  
            </div>
          )
        })
      )}
    </div>
  );
}

export default Card;