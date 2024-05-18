import React from 'react'
import './Sidebar.css'; // Import the CSS file

export default function Sidebar() {
  return (
    <div className="bg-light border-right sidebar" id="sidebar-wrapper">
      <div className="list-group list-group-flush">
        <a href="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</a>
        <a href="/categories" className="list-group-item list-group-item-action bg-light">Catégories</a>
        <a href="/produits" className="list-group-item list-group-item-action bg-light">Produits</a>
        <a href="/profile" className="list-group-item list-group-item-action bg-light">Settings</a>
        {/* Add more sidebar links as needed */}
      </div>
    </div>
  )
}
