import { navigate } from "gatsby"
import React from "react"
import Header from "../components/Header"
import Lollypop from '../components/lollypop'
export default function Home() {
  return (
    <div className="container">
      <Header/>
      k
      <div className="lolliList">
        <div>
          <Lollypop fillLollyBottom="blue" fillLollyTop="green" fillLollyMiddle="black"/>
        </div>
        <div>
          <Lollypop fillLollyBottom="blue" fillLollyTop="green" fillLollyMiddle="black"/>
        </div>
        <div>
          <Lollypop fillLollyBottom="blue" fillLollyTop="green" fillLollyMiddle="black"/>
        </div>
      </div>
      <button value="Create New Lolly"
        onClick={()=>{
          navigate('/createNew')
        }}
      >Create Lollies</button>
    </div>
  )
}
