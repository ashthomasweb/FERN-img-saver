import { useContext, useEffect } from 'react'
import axios from 'axios'
import { MainContext } from '../context/main/MainState'
import { useParams } from 'react-router-dom'

// from items-list
export function useAxiosOnLoad() {
  const { dispatch } = useContext(MainContext)
  useEffect(() => {
    axios.get('http://localhost:4000/mernTemp/').then((response) => {
        dispatch({ type: 'SET_ALL_ITEMS', payload: response.data })
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [dispatch])
}

export function useAxiosOnEditLoad() {
  const { dispatch } = useContext(MainContext)
  let { id } = useParams()
  useEffect(() => {
    axios
      .get('http://localhost:4000/mernTemp/item/' + id).then((response) => {
        dispatch({ type: 'SET_EDITED_ITEM', payload: response.data })
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [dispatch, id])
}

// END of document
