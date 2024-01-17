import { FC } from "react";
import { Col, Form, Row } from "react-bootstrap";

import { convertMbtiToDecimalNumber, convertMbtiToString, MBTI_TYPE } from "../utils/mbti";

interface MbtiSelectProp {
  mbti?: number, // 组件传参，MBTI 对应的十进制数
  onChange?: (mbti: number) => any, // 当 MBTI 修改，触发该回调，其参数是修改后的 MBTI 对应的十进制数
}

export const MbtiSelect: FC<MbtiSelectProp> =
  ({ mbti = 0, onChange }) => {
    // 将传入的 MBTI 十进制数转化为 MBTI 字符串数组
    const mbtiItemArr = convertMbtiToString(
      mbti < 0 || mbti > 15 ? 0 : mbti
    ).split("");

    // 当 Select 组件修改值，将修改的位置和修改后的值传入，并将最后的结果转化成 MBTI 对应的十进制值，触发函数回调
    const handleChangeType = (typeIndex: number, item: string) =>
      onChange?.(
        convertMbtiToDecimalNumber(
          mbtiItemArr.reduce((pre, cur, index) =>
            pre + (index === typeIndex ? item : cur), ""
          )
        )
      )

    return <Row className="my-2">
      {MBTI_TYPE.map((typeItem, typeIndex) =>
        <Col key={typeItem.toString()}>
          <Form.Select
            value={mbtiItemArr[typeIndex]}
            onChange={
              ({ target: { value } }) =>
                handleChangeType(typeIndex, value)
            }
          >
            {typeItem.map(item =>
              <option key={item} value={item}>{item}</option>
            )}
          </Form.Select>
        </Col>
      )}
    </Row>
  }
