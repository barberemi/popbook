import React, { Fragment, useRef, useState, useEffect } from 'react'
import _ from 'lodash'
import styled from '@emotion/styled'

import TitleCard from '../components/TitleCard'
import CharacterCard from '../components/CharacterCard'
import LogoPop from '../components/LogoPop'

const Strong = styled.strong`
  font-size: 1.2em;
  color: #f9b337;
`

export default function ListingCards(props) {
  const listInnerRef = useRef()
  const [multiplicateur, setMultiplicateur] = useState(1)

  useEffect(() => {
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [multiplicateur])

  const onScroll = () => {
    if (window.pageYOffset + 700 >= listInnerRef.current.clientHeight) {
      setMultiplicateur(multiplicateur + 1)
    }
  }

  return (
    <div
      className={`container ${props.addMarginTop ? 'mt-4' : ''}`}
      onScroll={onScroll}
      ref={listInnerRef}
    >
      <div className="mb-3 text-center">
        {props.type === 'titles' && (
          <>
            Actuellement <Strong>{props.data.length}</Strong> titres de figurines{' '}
            <LogoPop key="listing" />
          </>
        )}
        {props.type === 'acquired' && (
          <>
            Aude posséde <Strong>{props.data.length}</Strong> figurines <LogoPop key="listing" />
          </>
        )}
        {props.type === 'wish' && (
          <>
            Aude souhaite avoir <Strong>{props.data.length}</Strong> figurines{' '}
            <LogoPop key="listing" />
          </>
        )}
        {props.type === 'soon' && (
          <>
            <Strong>{props.data.length}</Strong> figurines <LogoPop key="listing" /> à venir
          </>
        )}
        {props.type === 'oneTitle' && props.title && (
          <>
            <div>
              <img
                src={process.env.PUBLIC_URL + '/images/logos/' + props.title + '.png'}
                alt={'Logo ' + props.title}
                style={{ maxWidth: '140px', maxHeight: '50px' }}
              />
            </div>
            Ce titre contient <Strong>{props.data.length}</Strong> figurines{' '}
            <LogoPop key="listing" />
          </>
        )}
      </div>
      <div className="row justify-content-center">
        {props.type === 'titles' &&
          _.map(_.take(props.data, 20 * multiplicateur), (character, index) => (
            <Fragment key={index}>
              <TitleCard title={character.title} title_label={character.title_label} />
            </Fragment>
          ))}
        {props.type === 'acquired' &&
          _.map(_.take(props.data, 20 * multiplicateur), (character, index) => (
            <Fragment key={index}>
              <CharacterCard character={character} displayLogo={true} />
            </Fragment>
          ))}
        {props.type === 'wish' &&
          _.map(_.take(props.data, 20 * multiplicateur), (character, index) => (
            <Fragment key={index}>
              <CharacterCard character={character} displayLogo={true} />
            </Fragment>
          ))}
        {props.type === 'soon' &&
          _.map(_.take(props.data, 20 * multiplicateur), (character, index) => (
            <Fragment key={index}>
              <CharacterCard character={character} displayLogo={true} />
            </Fragment>
          ))}
        {props.type === 'oneTitle' &&
          props.title &&
          _.map(_.take(props.data, 20 * multiplicateur), (character, index) => (
            <Fragment key={index}>
              <CharacterCard character={character} displayLogo={false} />
            </Fragment>
          ))}
      </div>
    </div>
  )
}
