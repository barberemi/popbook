import React from 'react'

export default function SearchForm({ searchTerm, setSearchTerm }) {
  return (
    <form className="d-flex col-12 col-sm-12 col-md-3 col-lg-4">
      <input
        className="form-control"
        type="text"
        placeholder="Rechercher titre/référence/nom de personnage..."
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value)
        }}
      />
    </form>
  )
}
