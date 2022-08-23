import './Header.css'

const Header = ({ sessionUser }) => {
  let text = ''
  if (!sessionUser) {
    text = (
      <h1 className='header text'>Shop finds that are meant for you.</h1>
    )
  } else {
    text = (
      <h1 className='header text'>Welcome back, <span className='name header'>{sessionUser.username}</span></h1>
    )
  }
  return (
    <>
      {text}
    </>
  )
}

export default Header
