import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/fr'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'

import LogoPop from '../components/LogoPop'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const Titre = styled.h3`
  font-family: 'Blomberg';
  text-align: center;
  color: #fff;
`

export default function TallCharacterCard(props) {
  const { wishAndAcquired } = useOutletContext()
  const [action, setAction] = useState('')
  const [spinnerWish, setSpinnerWish] = useState(false)
  const [spinnerAcquired, setSpinnerAcquired] = useState(false)
  const [goodIp, setGoodIp] = useState(false)

  useEffect(() => {
    axios.get(process.env.REACT_APP_GEOLOC_URL).then(function (result) {
      if (result.data.IPv4 === process.env.REACT_APP_MY_IP) {
        setGoodIp(true)
      }
    })
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    const champ =
      action === 'wish'
        ? _.includes(JSON.stringify(wishAndAcquired.wish), props.character.name)
        : _.includes(JSON.stringify(wishAndAcquired.acquired), props.character.name)

    action === 'wish' ? setSpinnerWish(true) : setSpinnerAcquired(true)

    try {
      await axios
        .get(
          process.env.REACT_APP_NETLIFY_FUNCTIONS_URL +
            '?name=' +
            props.character.name +
            '&' +
            action +
            '=' +
            !champ
        )
        .then(function () {
          setTimeout(() => {
            setSpinnerWish(false)
            setSpinnerAcquired(false)
          }, 1500)
        })
    } catch (error) {
      console.error(error) // affiche l'erreur dans la console
      setSpinnerWish(false)
      setSpinnerAcquired(false)
    }
  }

  return (
    <div
      style={{
        fontFamily: 'monospace',
        lineHeight: '40px',
        margin: 'auto 0'
      }}
    >
      <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
        <Link to={`/titles/${props.character.title}`}>
          <img
            src={process.env.PUBLIC_URL + '/images/logos/' + props.character.title + '.png'}
            alt={'Logo ' + props.character.title}
            style={{ maxWidth: '140px', maxHeight: '50px' }}
          />
        </Link>
      </div>
      <Titre>
        <span className="badge text-bg-warning text-white">
          {_.upperCase(props.character.label)}
        </span>
      </Titre>

      <div className="d-flex">
        <div style={{ width: '50px', textAlign: 'center' }}>
          <FontAwesomeIcon icon={faFolderOpen} size="xl" style={{ color: 'orange' }} />
        </div>
        <div>{_.upperCase(props.character.title_label)}</div>
      </div>

      {props.character.funko_id && (
        <div className="d-flex">
          <div style={{ width: '50px', textAlign: 'center' }}>
            <FontAwesomeIcon icon={faInfoCircle} size="xl" style={{ color: 'orange' }} />
          </div>
          <div>Ref. Funko Pop #{props.character.funko_id}</div>
        </div>
      )}

      <div className="d-flex">
        <div style={{ width: '50px', textAlign: 'center' }}>
          <FontAwesomeIcon icon={faCalendar} size="xl" style={{ color: 'orange' }} />
        </div>
        <div>
          {_.includes(props.character.release_date, '-00-') && (
            <>Sortie en {props.character.release_date.slice(0, 4)}</>
          )}
          {!_.includes(props.character.release_date, '-00-') && (
            <>{_.upperFirst(moment(props.character.release_date).format('MMMM YYYY'))}</>
          )}
        </div>
      </div>

      {props.character.num && (
        <div className="d-flex">
          <div style={{ width: '50px', textAlign: 'center' }}>
            <LogoPop key={props.character.num} />
          </div>
          <div>{props.character.num}</div>
        </div>
      )}

      {goodIp && wishAndAcquired && (
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          {!_.includes(JSON.stringify(wishAndAcquired.acquired), props.character.name) && (
            <>
              <button
                type="submit"
                className={`btn ${
                  _.includes(JSON.stringify(wishAndAcquired.wish), props.character.name)
                    ? 'btn-danger'
                    : 'btn-primary'
                }`}
                onClick={() => setAction('wish')}
              >
                {spinnerWish && (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />{' '}
                  </>
                )}
                {_.includes(JSON.stringify(wishAndAcquired.wish), props.character.name)
                  ? 'Je ne le souhaite plus'
                  : 'Je le souhaite ?'}
              </button>
              <br />
            </>
          )}
          <button
            type="submit"
            className={`btn ${
              _.includes(JSON.stringify(wishAndAcquired.acquired), props.character.name)
                ? 'btn-danger'
                : 'btn-success'
            }`}
            onClick={() => setAction('acquired')}
          >
            {spinnerAcquired && (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />{' '}
              </>
            )}
            {_.includes(JSON.stringify(wishAndAcquired.acquired), props.character.name)
              ? 'Je ne le possède plus'
              : 'Je le possède ?'}
          </button>
        </form>
      )}
    </div>
  )
}
