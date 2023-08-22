import React from 'react'
import { useParams } from 'react-router'

export default function Item() {
    let { item_id } = useParams()
  return (
    <div>{item_id}</div>
  )
}
