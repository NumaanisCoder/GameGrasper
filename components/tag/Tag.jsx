import React from 'react'

const Tag = ({text}) => {
    console.log("Tags are ",text);
  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center',padding: 6, color:'white',color:'black', backgroundColor:"#f2f2f2", borderRadius: 6, marginRight: 6, marginLeft: 6}}>
      {text}
    </div>
  )
}

export default Tag
