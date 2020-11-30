import { gql, useMutation, useQuery } from '@apollo/client'
import { navigate } from 'gatsby';
import shortid from "shortid"
import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import Lollypop from '../components/lollypop'

const GET_DATA= gql`
    {
        getAllLollies
    } 
`;
const CREATE_LOLLY_MUTATION=gql`
    mutation createLolly($recipientName: String! ,
        $message: String!,
         $senderName: String!,
         $flavourTop: String!,
          $flavourMiddle: String!,
           $flavourBottom: String!,
           $lollyPath: String!){
        createLolly(recipientName:$recipientName,
             message:$message,
              senderName:$senderName,
               flavourTop:$flavourTop,
                flavourMiddle:$flavourMiddle,
                 flavourBottom:$flavourBottom,
                 lollyPath:$lollyPath){
            message
            lollyPath
        }
    }
`;
export default function CreateNew  ()  {
    const {loading, error, data} =useQuery(GET_DATA)
    const [createLolly]= useMutation(CREATE_LOLLY_MUTATION)
    const [color1,setColor1]=useState("#d52358")
    const [color2,setColor2]=useState("#e95946")
    const [color3,setColor3]=useState("#deaa43")
    const recipentRef =useRef()
    const messageRef =useRef()
    const senderRef =useRef()
    const submitLollyForm =async()=>{
        console.log("clicked")
        console.log("messageref", messageRef.current.value)
        console.log("color", color1)
        const id = shortid.generate()
       const results= await createLolly({variables:{
            recipientName: recipentRef.current.value,
            message:messageRef.current.value,
            senderName:senderRef.current.value, 
            flavourTop: color1,
            flavourMiddle:color2, 
            flavourBottom:color3,
            lollyPath: id,
        }})
        console.log("result from server", results)
        navigate(`/lollies/${id}`)
    }
    return (
    <div className="container">
        {data && data.hello && <div>{data.hello}</div>}
        <Header/>
        <div className="lollyFormDiv">
            <div>
                <Lollypop fillLollyBottom={color3} fillLollyTop={color1} fillLollyMiddle={color2}/>
            </div>
            <div className="lollyFlavourDiv">
                <label className="colorPickerLabel" htmlFor="flavourTop">
                    <input className="colorPicker" type="color" value={color1} name="flavourTop" id="flavourTop"
                        onChange={(e)=>setColor1(e.target.value)}
                    /> 
                </label>
                <label className="colorPickerLabel" htmlFor="flavourMiddle">
                    <input className="colorPicker" type="color" value={color2} name="flavourMiddle" id="flavourMiddle"
                        onChange={(e)=>setColor2(e.target.value)}
                    /> 
                </label>
                <label className="colorPickerLabel" htmlFor="flavourBottom">
                     <input className="colorPicker" type="color" value={color3} name="flavourBottom" id="flavourBottom"
                        onChange={(e)=>setColor3(e.target.value)}
                     />
                </label>
            </div>
            <div>
                <div className="lollyForm">
                    <label htmlFor="recipentName">
                        To
                    </label>
                    <input type="text" name="recipentName" id="recipentName" ref={recipentRef}/>
                    <label htmlFor="recipentMessage">
                        Message
                    </label>
                        <textarea rows="15" columns="30" ref={messageRef}/>
                    <label htmlFor="senderName">
                        From
                    </label>
                    <input type="text" name="senderName" id="senderName" ref={senderRef}/>
                     <input className="buttonFormSbu" type="button" value="Create" onClick={submitLollyForm}/>
                </div>
            </div>
            
        </div>
    </div>
    )
}

