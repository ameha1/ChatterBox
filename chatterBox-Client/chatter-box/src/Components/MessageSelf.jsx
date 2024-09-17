import React from 'react'

const MessageSelf = () => {
  var props2 = {content:"Let's talk numbers"}
  return (
    <div className="self-message-container">
        <div className="messageBox">
        <p style={{ color: "black" }}>{props2.content}</p>
        {/* <p className="self-timeStamp" style={{ color: "black" }}>
            12:00am
        </p> */}
        </div>
    </div>
  )
}

export default MessageSelf