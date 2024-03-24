import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { ThunkDispatch } from "@reduxjs/toolkit";

import styles from "./styles/DOMElement.module.scss";
import configs from "../../../../../../../../configs/domModel.json";
import sliceString from "../../../../../../../../helpers/sliceString";
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

  const clickText = useCallback((text: string) => {
    dispatch(
      changeContentDetails({
        text
      })
    )
  }, [changeContentDetails])

  const changeShowCount = useCallback((type: "more" | "less") => {
    dispatch(changeOpenElements(openElements.map((openElem: OpenElement) => {
      let { id: elemId, count } = { ...openElem };
      if (type === "more") {
        count = count + (Number(children?.length) < 10 ? Number(children?.length) : 10)
      } else {
        count = count < 10 ? 0 : count - 10;
      }
      if (elemId === id) {
        return {
          id,
          count
        }
      }
      return openElem;
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
        marginLeft: nestedCount * elementGap + "px",
        opacity: 1 - nestedCount * 0.05,
      }}
      onClick={data ? () => clickText(data) : () => { }}
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
          opacity: 1 - nestedCount * 0.1 > 0.5 ? 1 - nestedCount * 0.1 : 0.5,
        }}
        id={id}
        className={styles.dom_element}
      >
        <p style={{ zIndex: 2 }}>{name}</p>
        {idname ? <p>id:
          <span className={styles.attribute}>
            {sliceString(idname, 25)}
          </span>
        </p> : null}
        {classname ? <p>class:
          <span className={styles.attribute}>
            {sliceString(classname, 25)}
          </span>
        </p> : null}
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
        {children.length > 10 ? (
          <div
            className="actions_cont"
            data-nested-count={nestedCount + 1}
          >
            {showChildrenCount < children.length ? <p
              className="show_more"
              onClick={() => changeShowCount("more")}>
              Show More
            </p> : null}
            {showChildrenCount > 10 ? <p
              className="show_less"
              onClick={() => changeShowCount("less")}>
              Show Less
            </p> : null}
          </div>
        ) : null}
      </>
        : null}
    </>
  )
}

export default DOMElement;