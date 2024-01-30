import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import ChangeCompany from './ChangeCompany'

const Header = () => {
    const [showChangeCompanyModal, setShowChangeCompanyModal] = useState(false)
  return (
    <>
    <div className=' px-4 flex items-center'>
        <p>LOGO</p>
        <p className='hover:bg-orange-400 hover:text-white duration-100 px-2 text-lg' onClick={() => setShowChangeCompanyModal(!showChangeCompanyModal)}>Change Company</p>
    </div>

    {showChangeCompanyModal ? (

        <ChangeCompany showChangeCompanyModal={showChangeCompanyModal} setShowChangeCompanyModal={setShowChangeCompanyModal} />

        ) : null}

    </>
  )
}

export default Header