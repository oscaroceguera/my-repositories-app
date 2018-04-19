import React from 'react'

import './search.css'

const Search = (props) => (
  <div className='search'>
    <h1 className='search-title'>
      Search public repositories by username
    </h1>
    <input
      name='search'
      placeholder='Type username and press enter'
      className='search-input'
      {...props}
    />
  </div>
)

export default Search
