import { useContext, useEffect } from 'react'
import axios from 'axios'
import { MainContext } from '../context/main/MainState'
import { useParams } from 'react-router-dom'

// from items-list
export function useAxiosOnLoad() {
  const { dispatch } = useContext(MainContext)
  let url = 'https://next-ts-img-crud-default-rtdb.firebaseio.com/branch.json'
  useEffect(() => {
    axios.get(url).then((response) => {
        let objData = Object.values(response.data)
        dispatch({ type: 'SET_ALL_ITEMS', payload: objData })
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [dispatch, url])
} 

export function useAxiosOnEditLoad() {
  const { state: { items }, dispatch } = useContext(MainContext)
  let { id } = useParams()
  useEffect(() => {
    items.forEach(item => {
      if (item._id === id) {
        dispatch({ type: 'SET_EDITED_ITEM', payload: item })
      }
    })
  }, [dispatch, id, items])
}

// END of document
