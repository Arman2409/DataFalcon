import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/DOMElement.module.scss";
import configs from "../../../../../../../../configs/domModel.json";
import { changeContentDetails } from "../../../../../../../../store/slices/demoSlice";
import { changeOpenElements } from "../../../../../../../../store/slices/domModelSlice";
import type { DomElementProps } from "../../../../../../../../types/props";
import type { ElementModel } from "../../../../../../../../types/globals";
import type { OpenElement } from "../../../../../../../../store/slices/domModelSlice";

const { elementGap } = { ...configs }

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
  calculateNestedCount,
  handleClick }: DomElementProps) => {
  const [nestedElementsCount, setNestedElementsCount] = useState<number>(0);
  const [showChildrenCount, setShowChildrenCount] = useState<number>(0);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const click = useCallback(() => {
    if (!children?.length) return;
    handleClick(id);
  }, [handleClick])

  const clickText = useCallback((text:string) => {
    dispatch(
      changeContentDetails({
         text
      })
    ) 
  }, [changeContentDetails])

  const showMore = useCallback(() => {
    dispatch(changeOpenElements(openElements.map(({ id, count }: OpenElement) => {
      if (id === id) {
        return {
          id,
          count: count + (Number(children?.length) < 10 ? Number(children?.length) : 10)
        }
      }
      return { id, count };
    })));
  }, [openElements, changeOpenElements, dispatch])

  useEffect(() => {
    const { count }: OpenElement = openElements.find(
      ({ id: elemId }: OpenElement) => elemId === id
    ) || {} as OpenElement;
    setShowChildrenCount(count);
    if (count) {
      return setNestedElementsCount(calculateNestedCount(id))
    }
    setNestedElementsCount(0);
  }, [openElements, setNestedElementsCount, showChildrenCount, calculateNestedCount])

  if (type === "text") return (
    <div
      style={{
        marginLeft: nestedCount * elementGap + "px"
      }}
      onClick={data ? () => clickText(data) : () => {}}
      id={id}
      data-nested-count={nestedCount}
      className={styles.dom_text_element}
    >
      {data}
    </div>
  )
  return (
    <>
      <div
        onClick={click}
        data-nested-count={nestedCount}
        style={{
          marginLeft: nestedCount * elementGap + "px",
        }}
        id={id}
        className={styles.dom_element}
      >
        <p style={{ zIndex: 2 }}>{name}</p>
        {idname ? <p>id:{idname}</p> : null}
        {classname ? <p>class:{classname}</p> : null}
        <p>children:{children?.length}</p>
        {nestedElementsCount > 0 ? <>
          <div
            className={styles.indicator_line}
            style={{
              height: nestedElementsCount * 50 + 40 + "px",
            }} />
        </> : null}
      </div>
      {showChildrenCount && children?.length ? <>
        {children.slice(0, showChildrenCount).map(
          (child: ElementModel) => (
            <DOMElement
              key={id}
              calculateNestedCount={calculateNestedCount}
              nestedCount={nestedCount + 1}
              openElements={openElements}
              handleClick={handleClick}
              {...child}
            />
          )
        )}
        {showChildrenCount < children.length ? (
          <p
            className="show_more"
            onClick={showMore}>
            Show More
          </p>
        ) : null}
      </>
        : null}
    </>
  )
}

export default DOMElement;