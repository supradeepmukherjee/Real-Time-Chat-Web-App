import Done from "@mui/icons-material/DoneOutlineRounded"
import { IconButton } from "@mui/material"
import { useSelector } from "react-redux"
import './CreateGrp.css'

const CreateGrp = () => {
  const dark = useSelector(state => state.dark)
  return (
    <div className={`createGrp ${dark && 'dark lightShadow'}`}>
      <input type="text" name="" id="search" className={dark && 'dark'} placeholder='Enter Group Name' />
      <IconButton>
        <Done className={dark && 'dark'} />
      </IconButton>
    </div>
  )
}

export default CreateGrp