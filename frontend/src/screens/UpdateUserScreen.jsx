import '../assets/styles/modal.css'

const UpdateUserScreen = ({show}) => {
  if (show) {
    return (
      <div className='modal-screen'>
        <div className='modal-content'>
          UpdateUserScreen
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default UpdateUserScreen