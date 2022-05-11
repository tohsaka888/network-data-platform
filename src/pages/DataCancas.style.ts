import styled from "styled-components"

export const SelectAreaContainer = styled.div`
  height: 40px;
  text-align: left;
  display: flex;
  align-items: center;
`

export const MainCanvas = styled.div<{ height: number }>`
  height: ${props => props.height}px;
  /* border: 1px solid; */
  background-color: white;
  margin-top: 8px;
`

export const TypeArea = styled.div`
  height: 6%;
  display: flex;
  align-items: center;
  padding: 0px 24px;
  border-bottom: 1px solid #cecece;
`

export const CanvasArea = styled.div`
  height: 94%;
`