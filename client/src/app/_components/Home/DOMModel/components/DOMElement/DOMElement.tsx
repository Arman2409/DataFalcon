import { useCallback } from "react";

import styles from "./styles/DOMElement.module.scss";

const DOMElement = ({
  name,
  children,
  id,
  type,
  data,
  nestedCount,
  openElements,
  idname,
  classname,
  handleClick }: any) => {

  const click = useCallback(() => {
    if (!children.length) return;
    handleClick(id);
  }, [handleClick])
  
  if (type === "text") return (
    <div
      style={{
        marginLeft: nestedCount * 5 + "px"
      }}
      className={styles.dom_text_element}
    >
      {data}
    </div>
  )
  return (
    <>
      <div
        onClick={click}
        style={{
          marginLeft: nestedCount * 5 + "px"
        }}
        className={styles.dom_element}
      >
        <p>{name}</p>
        <p>id:{idname}</p>
        <p>class:{classname}</p>
        <p>children:{children?.length}</p>
      </div>
      {openElements.includes(id) && children.length ? children.map(
        (child: any) => (
          <DOMElement
            key={id}
            nestedCount={nestedCount + 1}
            openElements={openElements}
            handleClick={handleClick}
            {...child}
          />
        )
      ) : null}
    </>
  )
}

export default DOMElement;