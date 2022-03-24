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
        console.log(objData)

        dispatch({ type: 'SET_ALL_ITEMS', payload: objData })
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [dispatch, url])
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
