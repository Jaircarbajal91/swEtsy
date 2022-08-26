import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './SearchBar.css'

const SearchBar = ({searchWords, setSearchWords}) => {
  const history = useHistory()
  const loc = useLocation()
  const path = loc.pathname
  // console.log(path)
  useEffect(() => {
    if(path.includes('search')){
      let query = new URLSearchParams(loc.search)
      setSearchWords(query.get('keyword') || '')
    }else{
      setSearchWords('')
    }
  },[path])

  const searchClickHandler = e => {
    console.log(searchWords);
    if(path.includes('search')){
      let query = new URLSearchParams(loc.search)
      let filtered = []
      let data = {
        keyword:searchWords,
        minPrice:query.get('minPrice'),
        maxPrice:query.get('maxPrice'),
        ownerId:query.get('ownerId'),
        order:query.get('order')
      }
      for (let key in data) {
          if (data[key]) {
              filtered.push(`${key}=${data[key]}`)
          }
      }
    let filterstring = filtered.join("&")
    history.push(`/search?${filterstring}`)
    }else{
      history.push(`/search?keyword=${searchWords}`)
    }
  }

  const handleSearchPress = e => {
    if(e.keyCode === 13){
      if(path.includes('search')){
        let query = new URLSearchParams(loc.search)
        let filtered = []
        let data = {
          keyword:searchWords,
          minPrice:query.get('minPrice'),
          maxPrice:query.get('maxPrice'),
          ownerId:query.get('ownerId'),
          order:query.get('order')
        }
        for (let key in data) {
            if (data[key]) {
                filtered.push(`${key}=${data[key]}`)
            }
        }
      let filterstring = filtered.join("&")
      history.push(`/search?${filterstring}`)
      }else{
        history.push(`/search?keyword=${searchWords}`)
      }
      e.target.blur()
    }
  }

  return (
    <div className="search-bar-container">
      <input className='input search-bar'
              type="text"
              placeholder='Search for anything'
              value={searchWords}
              onChange={e => setSearchWords(e.target.value)}
              onKeyDown={handleSearchPress}
              />
      <button className='input search-submit' onClick={searchClickHandler}>o-</button>
    </div>
  )
}

export default SearchBar
