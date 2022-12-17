import React from 'react'
import styled from '@emotion/styled'

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faFolderTree } from '@fortawesome/free-solid-svg-icons'

const StyledLink = styled(Link)`
  &:hover {
    color: #f9b337 !important;
  }
`

export default function CharacterThread(props) {
  return (
    <div style={{ fontFamily: 'Blomberg', paddingBottom: '15px' }}>
      <FontAwesomeIcon icon={faFolderTree} style={{ color: 'orange' }} />{' '}
      <span style={{ borderBottom: 'solid 1px #ccc', width: 'fit-content', marginLeft: '5px' }}>
        <StyledLink to={'/'} className="text-decoration-none text-muted">
          Titres
        </StyledLink>{' '}
        <FontAwesomeIcon icon={faCaretRight} style={{ color: 'orange' }} />{' '}
        <StyledLink
          to={`/titles/${props.character.title}`}
          className="text-decoration-none text-muted"
        >
          {props.titleRegex}
        </StyledLink>{' '}
        <FontAwesomeIcon icon={faCaretRight} style={{ color: 'orange' }} />{' '}
        <StyledLink
          to={`/characters/${props.character.name}`}
          className="text-decoration-none text-muted"
        >
          #{props.character.num} {props.character.label}
        </StyledLink>
      </span>
    </div>
  )
}
