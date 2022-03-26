import React, { useContext } from 'react'
import axios from 'axios'
import { withRoutedProps } from '../../hocs/hocs'
import { useAxiosOnEditLoad } from '../../utils/axios-utils'
import { MainContext } from '../../context/main/MainState'
const serverURL = process.env.REACT_APP_SERVER_URL

function EditItem(props) {
  // destructure state and reducer methods
  const { state: { tempItem }, dispatch } = useContext(MainContext)
  let { imageURL, photographer } = tempItem
  // destructure URL param made available by HOC
  let { id } = props.params

  // controlled input elements
  function changeDescription(e) {
    tempItem.description = e.target.value
    dispatch({ type: 'ONCHANGE_DESC', payload: tempItem })
  }

  function changeResponsible(e) {
    tempItem.comment = e.target.value
    dispatch({ type: 'ONCHANGE_COMMENT', payload: tempItem })
  }

  function changeRating(e) {
    tempItem.rating = e.target.value
    dispatch({ type: 'ONCHANGE_RATING', payload: tempItem })
  }

  // data handling
  function onSubmit(e) {
    e.preventDefault()
    axios.post(`${serverURL}/mernTemp/update/${id}`, tempItem).then((response) => {
      let objData = Object.values(response.data)
      dispatch({ type: 'SET_ALL_ITEMS', payload: objData[1] })
    })
  }

  // custom hook retrieves and sets item data by id, via params, on edit component mount
  useAxiosOnEditLoad(id)

  return (
    <div style={{ margin: '10px auto', width: '95vw' }}>
      <h3 style={{ textAlign: 'center' }}>Update Item</h3>

      { imageURL && 
          <div style={{ textAlign: 'center', width: '40vw', margin: '0 auto', position: 'relative'}}>
            <img src={imageURL} style={{width: '100%', position: 'relative'}} alt='no alt yet'/>
            <p>Photo by {photographer}, courtesy of Unsplash API</p>
          </div>
      }

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Description: </label>
          <input
            type='text'
            className='form-control'
            value={tempItem.description}
            onChange={changeDescription}
          />
        </div>

        <div className='form-group'>
          <label>Comment: </label>
          <input
            type='text'
            className='form-control'
            value={tempItem.comment}
            onChange={changeResponsible}
          />
        </div>
        
        <div className='form-group'>
          <label>URL: </label>
          <p
            className='form-control'
            style={{ overflowWrap: 'anywhere' }}
            disabled
          >{imageURL}</p>
        </div>

        <div className='form-group'>
          <label>Photographer: </label>
          <p
            className='form-control'
            style={{ overflowWrap: 'anywhere' }}
            disabled
          >{photographer}</p>
        </div>

        <div className='form-group'>
          <div className='form-check form-check-inline'>
            <label className='form-check-label'>
              <input
                className='form-check-input'
                type='radio'
                value='Low'
                checked={tempItem.rating === 'Low'}
                onChange={changeRating}
              />
              Low
            </label>
          </div>

          <div className='form-check form-check-inline'>
            <label className='form-check-label'>
              <input
                className='form-check-input'
                type='radio'
                value='Medium'
                checked={tempItem.rating === 'Medium'}
                onChange={changeRating}
              />
              Medium
            </label>
          </div>

          <div className='form-check form-check-inline'>
            <label className='form-check-label'>
              <input
                className='form-check-input'
                type='radio'
                value='High'
                checked={tempItem.rating === 'High'}
                onChange={changeRating}
              />
              High
            </label>
          </div>
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Update Item'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  )
}

export default withRoutedProps(EditItem)

// END of document
