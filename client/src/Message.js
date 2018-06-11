import React from 'react';

const Message = (props) => {
    return (
        <div className="message" id={props.id}>
            <h2 className="message-author">{props.author}</h2>
            {props.content && <p className="message-content">{props.content}</p>}
        </div>
    )
}

export default Message;