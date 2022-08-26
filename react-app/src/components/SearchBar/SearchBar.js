import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './SearchBar.css'

const SearchBar = ({searchWords, setSearchWords}) => {
  const [symbolErrors, setSymbolErrors] = useState('')
  const [disableSearch, setDisableSearch] = useState(false)
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

  useEffect(() => {
    if(!(/^[A-Za-z0-9 \-]*$/g.test(searchWords))){
         setSymbolErrors('Only alphabates, numbers, spaces and - permitted for search!')
         setDisableSearch('true')
    }else{
      setSymbolErrors('')
      setDisableSearch(false)
    }
  },[searchWords])

  const searchChangeHandler = e => {
    setSearchWords(e.target.value)
  }

  const searchClickHandler = e => {
    console.log(searchWords);
    setSymbolErrors('')
    setSearchWords(prev => prev.replaceAll(/[^A-Za-z0-9\- ]/g, ''))
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
    // if(!(/^[A-Za-z0-9 \-]*$/g.test(searchWords))){
    //   setSearchWords(prev => {
    //    setSymbolErrors('Only alphabates, numbers, spaces and - permitted for search!')
    //     return prev.replaceAll(/[^A-Za-z0-9 ]/g, '')
    //   })
    // }
    if(e.keyCode === 13 && !disableSearch){
      setSymbolErrors('')
      setSearchWords(prev => prev.replaceAll(/[^A-Za-z0-9\- ]/g, ''))
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
                pattern="[^A-Za-z0-9 ]"
                title="Only numbers, alphabates and spaces are permitted!"
                onChange={searchChangeHandler}
                onKeyDown={handleSearchPress}
                />
        {symbolErrors && (
          <span>{symbolErrors}</span>
        )}
        <button disabled={disableSearch} className='input search-submit' onClick={searchClickHandler}>o-</button>
    </div>
  )
}

export default SearchBar
