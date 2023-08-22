import React from 'react'
import { useParams } from 'react-router'
import Navbar from './Navbar'

export default function Profile() {
  let { username } = useParams();
  return (
    <div className='Profile'>
      <Navbar />
      {username}
    </div>
  )
}
