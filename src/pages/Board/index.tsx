import React from 'react'
import BoardLayout from './BoardLayout'
import BoardProvider from './BoardContext'
import UserActionPanel from './UserActionPanel'
import styled from 'styled-components'

export default function Board (): React.ReactElement {
  return (
    <Layout>
      <BoardProvider>
        <BoardLayout />
        <UserActionPanel />
      </BoardProvider>
    </Layout>
  )
}

const Layout = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: green;

`
