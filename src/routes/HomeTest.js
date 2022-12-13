import React from 'react'
import { Outlet, Link, useNavigation, useLoaderData } from 'react-router-dom'

export default function HomeTest() {
  const navigation = useNavigation()
  // const { contacts } = useLoaderData()
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={`categories/1`}>BARBE Rémi</Link>
            </li>
            <li>
              <Link to={`categories/2`}>XIAO Mengda</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  )
}
