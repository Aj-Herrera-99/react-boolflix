import React from 'react'

function SearchBar() {
  return (
    <form>
        <input type="text" placeholder='Search a Movie'/>
        <button type='submit'>Search</button>
    </form>
  )
}

export default SearchBar