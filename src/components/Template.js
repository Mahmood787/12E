import React from "react"
import gql from "graphql-tag"
import Header from "./Header"
import { Link } from "gatsby"
import { useQuery } from "@apollo/client"
import Lollypop from "./lollypop"

export const query = gql`
  query getLollyByPath($lollyPath: String!) {
    getLollyByPath(lollyPath: $lollyPath) {
        recipientName
        message
        senderName
        flavourTop
        flavourMiddle
        flavourBottom
        lollyPath
    }
  }
`
const Template = ({pathContext:{lollyPath}}) => {
    
    const {loading,error,data} =useQuery(query,{variables:{lollyPath:lollyPath}})
    console.log(data?.getLollyByPath)
    if(error){
        return <h3>{error}</h3>
    }
    return (
        <div className="cont">
            <Header/>
            {loading ? (
                <h2> ...Loading </h2> 
            ):data !== undefined || null ? (
                <div>
                    <div className="lolly">
                        <Lollypop 
                            fillLollyBottom={data.getLollyByPath?.flavourBottom}
                            fillLollyTop={data.getLollyByPath?.flavourTop} 
                            fillLollyMiddle={data.getLollyByPath?.flavourMiddle}/>
                    
                    <div className="lollyText">
                        <h2>Share Lolly with this link</h2>
                        <p>http://localhost:8888/lollies{data.getLollyByPath.lollyPath}</p>
                        <div>
                            <h4><span className="left">To: </span><span>{data.getLollyByPath.recipientName}</span></h4>

                            <h4><span className="left">Message: </span><br/><span className="message">{data.getLollyByPath.message}</span></h4>
                            <h4><span className="left">From: </span>   {data.getLollyByPath.senderName}</h4>
                        </div>
                    </div>
                    </div>
                </div>
            ):("")}  

        </div>
    )
}

export default Template
