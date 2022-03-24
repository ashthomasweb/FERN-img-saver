import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { MainContext } from '../../context/main/MainState'

function CreateItem() {
  const { state: { tempItem }, dispatch } = useContext(MainContext)
  let { imageURL, photographer } = tempItem

  // controlled input elements
  function changeDescription(e) {
    tempItem.description = e.target.value
    dispatch({ type: 'ONCHANGE_DESC', payload: tempItem })
  }

  function changeComment(e) {
    tempItem.comment = e.target.value
    dispatch({ type: 'ONCHANGE_COMMENT', payload: tempItem })
  }

  function changeRating(e) {
    tempItem.rating = e.target.value
    dispatch({ type: 'ONCHANGE_RATING', payload: tempItem })
  }

  useEffect(() => {
    dispatch({ type: 'CLEAR_ITEM' })
  }, [dispatch])

  function imageRetrieval() {
    axios.get('http://localhost:4000/mernTemp/image').then((response) => {
      dispatch({ type: 'SET_RANDOM_IMAGE', payload: response.data })
    })
  }

  // data handling
  function onSubmit(e) {
    e.preventDefault()
    // send form data to server 'create' route
    axios.post('http://localhost:4000/mernTemp/add', tempItem).then((response) => {
      let objData = Object.values(response.data)
      console.log(objData[1])
      dispatch({ type: 'SET_ALL_ITEMS', payload: objData[1] })
    })
    dispatch({ type: 'CLEAR_ITEM' })
  }

  return (
    <div style={{ margin: '10px auto', width: '95vw' }}>
      <h3 style={{ textAlign: 'center' }}>Create New Item</h3>
      { imageURL && (
          <div style={{ textAlign: 'center', width: '40vw', margin: '0 auto', position: 'relative'}}>
            <img src={imageURL} style={{width: '100%', position: 'relative'}} alt='no alt yet'/>
            <p>Photo by {photographer}, courtesy of Unsplash API</p>
          </div>
        )
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
            onChange={changeComment}
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
            value='Create Item'
            className='btn btn-primary'
          />
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => imageRetrieval()}
          >Image</button>
        </div>
      </form>
    </div>
  )
}

export default CreateItem

// END of document
