import { navigate } from "gatsby"
import React from "react"
import Header from "../components/Header"
import Lollypop from '../components/lollypop'
export default function Home() {
  return (
    <div className="container">
      <Header/>
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
      <input type="button" value="Create New Lolly"
        onClick={()=>{
          navigate('/CreateNew')
        }}
      ></input>
    </div>
  )
}
