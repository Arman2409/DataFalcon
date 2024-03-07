import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/DOMElement.module.scss";
import configs from "../../../../../../../../configs/domModel.json";
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
  handleClick }: DomElementProps & { calculateNestedCount: Function }) => {
  const [nestedElementsCount, setNestedElementsCount] = useState<number>(0);
  const { count }: OpenElement = openElements.find(({ id: elemId }: OpenElement) => elemId === id) || {} as OpenElement;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const click = useCallback(() => {
    if (!children?.length) return;
    handleClick(id);
  }, [handleClick])

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
    setNestedElementsCount(calculateNestedCount(id))
  }, [openElements, setNestedElementsCount, calculateNestedCount])

  if (type === "text") return (
    <div
      style={{
        marginLeft: nestedCount * elementGap + "px"
      }}
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
          zIndex: 0
        }}
        id={id}
        className={styles.dom_element}
      >
        {count ? <div style={{
          width: "2px",
          height: nestedElementsCount * 50 + 40 + "px",
          backgroundColor: "green",
          position: "absolute",
          top: "0px",
          left: "0px"
        }} /> : null}
        <p style={{ zIndex: 2 }}>{name}</p>
        {idname ? <p>id:{idname}</p> : null}
        {classname ? <p>class:{classname}</p> : null}
        <p>children:{children?.length}</p>
      </div>
      {count && children?.length ? <>{children.slice(0, count).map(
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
        {count < children.length ? (
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