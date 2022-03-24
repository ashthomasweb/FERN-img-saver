import { useParams, useNavigate } from 'react-router-dom'

export function withRoutedProps(Component) {
  return (props) => (<Component {...props} params={useParams()} nav={useNavigate()} />)
}

// END of document
