import React from 'react'
import "./MailList.css"
const MailList = () => {
  return (
    <div className='mail'>
      <h1 className="mailTitle">SignUp Faster Now</h1>
      <span className="mailDesc">Get your best deals by signing up now</span>
      <div className="mailInputContainer">
        <input type='text' placeholder='Your Email'/>
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList
