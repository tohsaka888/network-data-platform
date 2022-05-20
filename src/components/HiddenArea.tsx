import React, { MutableRefObject, useEffect, useState } from "react";
import { isShowLine } from "../d3_components/line";
import { D3CANVAS } from "../type";

function HiddenArea({
  showButton,
}: {
  showButton: MutableRefObject<D3CANVAS>;
}) {
  const [show, setShow] = useState<boolean>(true);
  useEffect(() => {
    isShowLine(show);
  }, [show]);

  useEffect(() => {
    if (showButton.current) {
      window.setTimeout(() => {
        showButton.current?.on("click", () => {
          setShow(!show);
        });
      });
    }
  });
  return <></>;
}

export default HiddenArea;
