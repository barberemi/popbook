import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import axios from 'axios'

const GlobaleBar = styled.div`
  top: 78px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  z-index: 2;
  box-shadow: 0 10px 20px rgb(0 0 0 / 0.3);

  ul,
  ol {
    list-style: none;
  }

  @media (max-width: 576px) {
    top: 100px;
  }

  @media (max-width: 768px) {
    top: 100px;
  }

  @media (min-width: 992px) {
    top: 62px;
  }
`

const Listing = styled.ul`
  display: block;
  background-color: #fff;
  padding: 0;
  margin: 0;
`

const Category = styled.div`
  background-color: #e0e0e0;
  padding: 4px 12px;
  font-family: 'Blomberg';
`

const LinkStyle = styled(Link)`
  color: inherit;
  text-decoration none;

  li:hover {
    color: white;
    background-color: orange;
  }
`

const Result = styled.div`
  width: 100%;
  height: 50px;
  overflow: hidden;
  position: relative;
`

const CadreImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 50px;
  background-color: #fff;
  border-right: 1px solid #efefef;
`

const Image = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  max-width: 65px;
  max-height: 40px;
`

const Title = styled.span`
  position: absolute;
  top: 3px;
  left: 90px;
  display: block;
  letter-spacing: -0.01em;
  font-size: 1.05em;
  font-weight: 600;
  padding-top: 5px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SubTitle = styled.span`
  position: absolute;
  top: 24px;
  left: 90px;
  display: block;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default function ResultBar({ searchTerm, setSearchTerm }) {
  const [characters, setCharacters] = useState(null)

  useEffect(() => {
    axios.get(process.env.PUBLIC_URL + '/characters.json').then((response) => {
      setCharacters(response.data.hits)
    })
  }, [])

  const filterTitles = (characters) => {
    return _.orderBy(
      _.filter(_.uniqBy(characters, 'title'), (character) => {
        return _.includes(_.upperCase(character.title), _.upperCase(searchTerm))
      }),
      ['label']
    )
  }

  const filterCharacters = (characters) => {
    return _.orderBy(
      _.filter(characters, (character) => {
        return (
          _.includes(_.upperCase(character.name), _.upperCase(searchTerm)) ||
          _.includes(_.upperCase(character.title), _.upperCase(searchTerm))
        )
      }),
      ['label']
    )
  }

  return (
    <GlobaleBar className="col-11 col-sm-11 col-md-8 col-lg-7">
      <Listing>
        {_.trim(searchTerm).length > 2 && filterTitles(characters).length > 0 && (
          <>
            <Category>Titres</Category>
            {_.map(_.take(filterTitles(characters), 3), (character, index) => (
              <LinkStyle
                to={`/titles/${character.title}`}
                key={index}
                onClick={() => setSearchTerm('')}
              >
                <li>
                  <div className="eac-item" style={{ wordBreak: 'break-all' }}>
                    <Result className="sf-result">
                      <CadreImage className="sfr-img">
                        <Image
                          src={process.env.PUBLIC_URL + '/images/logos/' + character.title + '.png'}
                        />
                      </CadreImage>
                      <Title className="sfr-titre">{character.title_label}</Title>
                      <SubTitle className="sfr-stitre">Voir toutes les figurines</SubTitle>
                    </Result>
                  </div>
                </li>
              </LinkStyle>
            ))}
          </>
        )}

        {_.trim(searchTerm).length > 2 && filterCharacters(characters).length > 0 && (
          <>
            <Category>Figurines</Category>
            {_.map(_.take(filterCharacters(characters), 5), (character, index) => (
              <LinkStyle
                to={`/characters/${character.title}/${character.name}`}
                key={index}
                onClick={() => setSearchTerm('')}
              >
                <li>
                  <div className="eac-item" style={{ wordBreak: 'break-all' }}>
                    <Result className="sf-result">
                      <CadreImage className="sfr-img">
                        <Image
                          src={
                            process.env.PUBLIC_URL + '/images/characters/' + character.name + '.jpg'
                          }
                        />
                      </CadreImage>
                      <Title className="sfr-titre">
                        {character.label}{' '}
                        <span className="small">{character.num && ' #' + character.num}</span>
                      </Title>
                      <SubTitle className="sfr-stitre">{_.upperCase(character.title)}</SubTitle>
                    </Result>
                  </div>
                </li>
              </LinkStyle>
            ))}
          </>
        )}
      </Listing>
    </GlobaleBar>
  )
}
