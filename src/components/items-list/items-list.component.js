import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../../context/main/MainState'
import { useAxiosOnLoad } from '../../utils/axios-utils'
import axios from 'axios'
import { withRoutedProps } from '../../hocs/hocs'
const serverURL = process.env.REACT_APP_SERVER_URL

// individual data item component to be .map() into by parent component ItemList, defined below
const Item = (props) => {
  const { dispatch } = useContext(MainContext)
  let item = props.item

  function deleteItem() {
    let id = item._id
    axios.post(`${serverURL}/mernTemp/delete/${id}`).then((response) => {
      let objData = Object.values(response.data)
      dispatch({ type: 'SET_ALL_ITEMS', payload: objData[1] })
      props.nav('/')
    })
  }

  return (
    <tr>
      <td>
        {props.item.imageURL && (<img src={props.item.imageURL} style={{width: '150px', height: 'auto'}} alt='thumbnail'/>) }
      </td>
      <td>
        {props.item.photographer}
      </td>
      <td>
        {props.item.description}
      </td>
      <td>
        {props.item.comment}
      </td>
      <td>
        {item.rating}
      </td>
      <td>
        <Link to={'/item/' + item._id}>Edit</Link>
      </td>
      <td>
        <button onClick={() => deleteItem()}>Remove</button>
      </td>
    </tr>
  )
}

function ItemsList(props) {
  // custom hook retrieves all items from database on component mount
  useAxiosOnLoad()

  const { state: { items } } = useContext(MainContext)

  function itemList() {
    return items && items.map((itemData, i) => <Item {...props} item={itemData} key={i} />)
  }

  return (
    <div style={{ margin: '10px auto', width: '95vw' }}>
      <h3>Database Item List</h3>
      <table className='table table-striped' style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Photographer</th>
            <th>Description</th>
            <th>Comments</th>
            <th>Rating</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{itemList()}</tbody>
      </table>
    </div>
  )
}

export default withRoutedProps(ItemsList)

// END of document
