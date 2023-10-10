import { Accent3Button } from '../assets/components/button'
import { PrimaryTextField } from '../assets/components/textField'
import '../assets/styles/modal.css'

const UpdateUserScreen = ({show, setShow}) => {
  const onCancel = () => {
    setShow(false)
  }
  if (show) {
    return (
      <div className='modal-screen'>
        <div className='modal-content'>
          <form className='update-user-form'>
            <PrimaryTextField label='Name'/>
            <PrimaryTextField label='Handle'/>
            <PrimaryTextField label='Description'/>
            <div className='update-user-btns'>
              <Accent3Button onClick={onCancel}>Cancel</Accent3Button>
              <Accent3Button>Save</Accent3Button>
            </div>
          </form>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default UpdateUserScreen