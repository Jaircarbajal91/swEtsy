import './SearchBar.css'

const SearchBar = ({searchWords, setSearchWords}) => {
  return (
    <div className="search-bar-container">
      <input className='input search-bar' type="text" placeholder='Search for anything'/>
      <button className='input search-submit' onClick={null}>o-</button>
    </div>
  )
}

export default SearchBar
