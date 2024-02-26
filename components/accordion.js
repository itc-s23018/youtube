import { useState, useRef } from 'react'
import styles from 'styles/accordion.module.css'

const Accordion = ({ heading, children }) => {
  const [textIsOpen, setTextIsOpen] = useState(false)

  const toggleText = () => {
    setTextIsOpen(prev => !prev)
  }

  const refText = useRef(null)
  return (
    <div className={textIsOpen ? styles.open : styles.close}>
      <h3 className={styles.heading}>
        <button onClick={toggleText}>{heading}</button>
      </h3>
      <div
        className={styles.text}
        ref={refText}
        style={{
          '--text-height': refText.current
            ? `${refText.current.scrollHeight}px`
            : '0px'
        }}
      >
        <div className={styles.textInner}>{children}</div>
      </div>
    </div>
  )
}
export default Accordion
