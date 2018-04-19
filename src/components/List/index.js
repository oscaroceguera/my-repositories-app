import React from 'react'
import withLoading from '../withLoading'

import './list.css'

const Repo = ({ repo, handleDetail }) => (
  <div key={repo.id} className='list-item' onClick={() => handleDetail(repo.full_name)}>
    <div className='list-tem-header' >
      <div>
        <img
          src={repo.owner.avatar_url}
          style={{ borderRadius: '50%' }}
          width='28px'
          alt='owner'
        />
      </div>
      <div className='list-tem-header_title'>{repo.name}</div>
    </div>
    <div className='list-tem-header_desc'>
      {repo.description ? repo.description : 'No description :p'}
    </div>
  </div>
)

const List = (props) => {
  const { data } = props

  if (data.length === 0) {
    return null
  }

  const repositories = data.map(item => <Repo key={item.id} repo={item} handleDetail={props.handleDetail} />)

  return (
    <div>
      <div className='list'>
        {repositories}
      </div>
    </div>
  )
}

export default withLoading(List)
