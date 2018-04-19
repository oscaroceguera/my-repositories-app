import React from 'React'
import withLoading from '../withLoading'

import './detail.css'

const DetailItem = ({item}) => (
  <div className='detail-section-container'>
    <div><b>Title:</b> {item.title}</div>
    <div><b>body:</b> {item.body}</div>
    <div><b>state:</b> {item.state}</div>
    <div><b>labels:</b> {item.labels.map(j => j.name).join(', ')}</div>
  </div>
)

const Detail = (props) => {
  let _detailItem
  if (props.data.length === 0) {
    _detailItem = (
      <div className='detail-section-container'>
        <h3 style={{textAlign: 'center'}}>No issues</h3>
      </div>
    )
  } else {
    _detailItem = props.data.map(item => {
      return (
        <DetailItem key={item.id} item={item} />
      )
    })
  }

  return (
    <div className='detail'>
      <h1 className='detail-name'>{props.repository}</h1>
      <div className='detail-section'>
        <h3 className='detail-section-title'>Issues</h3>
        <div>
          {_detailItem}
        </div>
      </div>
    </div>
  )
}
export default withLoading(Detail)
