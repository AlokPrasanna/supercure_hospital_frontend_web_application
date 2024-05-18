import React from 'react'

const Footer = ({content , style}) => {
  return (
    <div>
      <footer className={`${style}`}>{content}</footer>
    </div>
  )
}

export default Footer
