import { useEffect, useState, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Magnifying from "../images/Magnifying.svg"
import './SearchBar.css'

const SearchBar = ({ searchWords, setSearchWords }) => {
  const [symbolErrors, setSymbolErrors] = useState('')
  const [disableSearch, setDisableSearch] = useState(false)
  const history = useHistory()
  const loc = useLocation()
  const path = loc.pathname

  const updateSearchFromURL = useCallback(() => {
    if (path.includes('search')) {
      let query = new URLSearchParams(loc.search)
      setSearchWords(query.get('keyword') || '')
    } else {
      setSearchWords('')
    }
  }, [path, loc.search, setSearchWords])

  useEffect(() => {
    updateSearchFromURL()
  }, [updateSearchFromURL])

  const validateSearchInput = useCallback(() => {
    if (!(/^[A-Za-z0-9 -]*$/g.test(searchWords))) {
      setSymbolErrors('Only alphabets, numbers, spaces and - permitted for search!')
      setDisableSearch(true)
    } else {
      setSymbolErrors('')
      setDisableSearch(false)
    }
  }, [searchWords])

  useEffect(() => {
    validateSearchInput()
  }, [validateSearchInput])

  const searchChangeHandler = e => {
    setSearchWords(e.target.value)
  }

  const performSearch = useCallback(() => {
    setSymbolErrors('')
    const cleanSearchWords = searchWords.replaceAll(/[^A-Za-z0-9\- ]/g, '')
    setSearchWords(cleanSearchWords)
    
    if (path.includes('search')) {
      let query = new URLSearchParams(loc.search)
      let filtered = []
      let data = {
        keyword: cleanSearchWords,
        minPrice: query.get('minPrice'),
        maxPrice: query.get('maxPrice'),
        ownerId: query.get('ownerId'),
        order: query.get('order')
      }
      for (let key in data) {
        if (data[key]) {
          filtered.push(`${key}=${data[key]}`)
        }
      }
      let filterstring = filtered.join("&")
      history.push(`/search?${filterstring}`)
    } else {
      history.push(`/search?keyword=${cleanSearchWords}`)
    }
  }, [searchWords, path, loc.search, history, setSearchWords])

  const searchClickHandler = e => {
    performSearch()
  }

  const handleSearchPress = e => {
    if (e.keyCode === 13 && !disableSearch) {
      performSearch()
      e.target.blur()
    }
  }

  const cursorStyles = symbolErrors ? { cursor: 'not-allowed' } : { cursor: 'pointer' }

  return (
    <div className="search-bar-container">
      <div className='searchbar-container'>
        <input 
          className='input search-bar'
          type="text"
          placeholder='Search for anything'
          value={searchWords}
          pattern="[^A-Za-z0-9 ]"
          title="Only numbers, alphabets and spaces are permitted!"
          onChange={searchChangeHandler}
          onKeyDown={handleSearchPress}
        />
        <div 
          className='magnifying-container' 
          style={cursorStyles} 
          onClick={symbolErrors ? null : searchClickHandler}
        >
          <img 
            src={Magnifying} 
            disabled={disableSearch} 
            className='input search-submit' 
            alt="Search"
          />
        </div>
      </div>
      {symbolErrors && (
        <span className='search-errors-text'>{symbolErrors}</span>
      )}
    </div>
  )
}

export default SearchBar