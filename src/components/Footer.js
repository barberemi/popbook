import React from 'react'
import styled from '@emotion/styled'

const Pied = styled.footer`
  bottom: 0;
  width: 100%;
  background-color: #f5f5f5;
  border-top: solid 1px #d3d3d3;
`

export default function Footer() {
  return (
    <Pied className="mt-5">
      <div className="container">
        <div className="text-center">
          <img
            src={process.env.PUBLIC_URL + '/images/aude-pop.png'}
            height="60px"
            width="60px"
            alt="Image Pop Aude"
          />
          <div className="text-muted">
            <small>
              Ce site n'appartient pas à l'entreprise Funko et n'est donc pas
              <br />
              sponsorisé ni validé par Funko.
              <br />
              <br />
              ©2022 RemCorp. Tous droits réservés.
            </small>
          </div>
        </div>
      </div>
    </Pied>
  )
}
