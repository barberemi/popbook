import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/fr'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
import { db } from '../datasources/firebase'
import { ref, child, push, update, remove } from 'firebase/database'

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
  const [spinnerWish, setSpinnerWish] = useState(false)
  const [spinnerAcquired, setSpinnerAcquired] = useState(false)
  const [goodIp, setGoodIp] = useState(false)

  useEffect(() => {
    axios.get(process.env.REACT_APP_GEOLOC_URL).then(function (result) {
      if (_.includes(process.env.REACT_APP_MY_IP, result.data.IPv4)) {
        setGoodIp(true)
      }
    })
  }, [])

  function handleSubmit(type) {
    const newData = { name: props.character.name }
    const updates = {}
    let newPostKey = null
    let num = null

    if (type === 'wish') {
      setSpinnerWish(true)
      if (!_.find(wishAndAcquired.wish, { name: props.character.name })) {
        // Add on WISH
        newPostKey = push(child(ref(db), 'wish')).key
        updates['/wish/' + newPostKey] = newData
        update(ref(db), updates)
        if (_.find(wishAndAcquired.acquired, { name: props.character.name })) {
          // Remove on ACQUIRED
          _.forEach(wishAndAcquired.acquired, (aAcquired, index) => {
            if (_.includes(JSON.stringify(aAcquired), props.character.name)) {
              num = index
            }
          })
          if (num !== null) {
            remove(ref(db, 'acquired/' + num))
          }
        }
      } else {
        // Remove on WISH
        _.forEach(wishAndAcquired.wish, (aWish, index) => {
          if (_.includes(JSON.stringify(aWish), props.character.name)) {
            num = index
          }
        })
        if (num !== null) {
          remove(ref(db, 'wish/' + num))
        }
      }
    } else {
      setSpinnerAcquired(true)
      if (!_.find(wishAndAcquired.acquired, { name: props.character.name })) {
        // Add on ACQUIRED
        newPostKey = push(child(ref(db), 'acquired')).key
        updates['/acquired/' + newPostKey] = newData
        update(ref(db), updates)
        if (_.find(wishAndAcquired.wish, { name: props.character.name })) {
          // Remove on WISH
          _.forEach(wishAndAcquired.wish, (aWish, index) => {
            if (_.includes(JSON.stringify(aWish), props.character.name)) {
              num = index
            }
          })
          if (num !== null) {
            remove(ref(db, 'wish/' + num))
          }
        }
      } else {
        // Remove on ACQUIRED
        _.forEach(wishAndAcquired.acquired, (aAcquired, index) => {
          if (_.includes(JSON.stringify(aAcquired), props.character.name)) {
            num = index
          }
        })
        if (num !== null) {
          remove(ref(db, 'acquired/' + num))
        }
      }
    }
    setTimeout(() => {
      setSpinnerWish(false)
      setSpinnerAcquired(false)
    }, 1500)
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
        <div style={{ textAlign: 'center' }}>
          {!_.find(wishAndAcquired.acquired, { name: props.character.name }) && (
            <>
              <button
                type="button"
                className={`btn ${
                  _.find(wishAndAcquired.wish, { name: props.character.name })
                    ? 'btn-danger'
                    : 'btn-primary'
                }`}
                onClick={() => handleSubmit('wish')}
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
                {_.find(wishAndAcquired.wish, { name: props.character.name })
                  ? 'Je ne le souhaite plus'
                  : 'Je le souhaite ?'}
              </button>
              <br />
            </>
          )}
          <button
            type="button"
            className={`btn ${
              _.find(wishAndAcquired.acquired, { name: props.character.name })
                ? 'btn-danger'
                : 'btn-success'
            }`}
            onClick={() => handleSubmit('acquired')}
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
            {_.find(wishAndAcquired.acquired, { name: props.character.name })
              ? 'Je ne le possède plus'
              : 'Je le possède ?'}
          </button>
        </div>
      )}
    </div>
  )
}
