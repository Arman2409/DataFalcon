import { useCallback } from "react";
import { useDispatch } from "react-redux";

import styles from "./styles/DOMElement.module.scss";
import configs from "../../../../../../configs/domModel.json";
import { changeOpenElements } from "../../../../../../store/slices/domModelSlice";
import type { DomElementProps } from "../../../../../../types/props";
import type { ElementModel } from "../../../../../../types/globals";
import type { OpenElement } from "@/store/slices/domModelSlice";
import type { ThunkDispatch } from "@reduxjs/toolkit";

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
  handleClick }: DomElementProps) => {
  const { count }: OpenElement = openElements.find(({ id: elemId }: OpenElement) => elemId === id) as OpenElement;
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
          count: count + 10
        }
      }
      return { id, count };
    })));
  }, [openElements, changeOpenElements, dispatch])

  if (type === "text") return (
    <div
      style={{
        marginLeft: nestedCount * elementGap + "px"
      }}
      id={id}
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
          marginLeft: nestedCount * elementGap + "px"
        }}
        id={id}
        className={styles.dom_element}
      >
        <p>{name}</p>
        <p>id:{idname}</p>
        <p>class:{classname}</p>
        <p>children:{children?.length}</p>
      </div>
      {count && children?.length ? <>{children.slice(0, count).map(
        (child: ElementModel) => (
          <DOMElement
            key={id}
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