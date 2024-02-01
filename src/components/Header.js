import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ChangeCompany from './ChangeCompany'
import NewCompany from './NewCompany'

const Header = () => {
  const [showChangeCompanyModal, setShowChangeCompanyModal] = useState(false)
  const [newCompany, setNewCompany] = useState(false);

  return (
    <>
      <div className=' px-4 flex items-center'>
        <p>LOGO</p>
        <p className='hover:bg-orange-400 hover:text-white duration-100 px-2 text-lg' onClick={() => setShowChangeCompanyModal(!showChangeCompanyModal)}>Change Company</p>
      </div>

      {showChangeCompanyModal && (

        <ChangeCompany showChangeCompanyModal={showChangeCompanyModal} setShowChangeCompanyModal={setShowChangeCompanyModal} setNewCompany={setNewCompany} />

      )}

      {newCompany ? (

        <NewCompany newCompany={newCompany} setNewCompany={setNewCompany} />

      ) : null}



    </>
  )
}

export default Header