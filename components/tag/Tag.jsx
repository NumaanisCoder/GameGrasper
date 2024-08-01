import Link from 'next/link';
import React from 'react'

const Tag = ({text}) => {
    console.log("Tags are ",text);
  return (
    <Link href={`/Tag/${text}`} style={{display: 'flex', justifyContent:'center', alignItems:'center',padding: 6, color:'white',color:'white', backgroundColor:"black", borderRadius: 3, marginRight: 6, marginLeft: 6, borderBottomColor:"orangered", borderBottomWidth: 2, borderBottomStyle:"solid"}}>
      {text}
    </Link>
  )
}

export default Tag
