import { FC } from "react"

interface ClaimHistoryProps {
  record: string[]
}

export const ClaimHistory: FC<ClaimHistoryProps> = ({ record }) => {
  return <>
    <h2 className="text-center mt-1">历史</h2>
    <ol reversed className="list-unstyled">
      {record
        ?.toReversed()
        .map((item, index, arr) =>
          <li key={item + index} className="text-center">
            <span className="me-2">
              {arr.length - index}
              {index === 0 && <sup className="text-danger">*</sup>}.
            </span>
            {item}
          </li>
        )}
    </ol>
  </>
}