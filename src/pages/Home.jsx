import React from 'react'
import Header from '../Components/Header'
import Layout from '../Components/Layout'

function Home() {
  return (
    <>
<div className="h-screen flex flex-col overflow-hidden">
    <Header/>
    <Layout/>
    </div>
    </>
  )
}

export default Home