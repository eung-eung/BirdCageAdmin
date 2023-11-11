import React from 'react'
import TableCustom from './TableCustom'

export default function CustomManage() {
  document.title = "Custom Cages Management"
  return (
    <div style={{ marginLeft: "350px", width: "70%", marginTop: "100px" }}>
      <h1 class="pt-10 mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Custom Cages</h1>
      <div>
        <TableCustom />
      </div>
    </div>
  )
}
