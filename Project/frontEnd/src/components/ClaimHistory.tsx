import { FC } from "react"

interface ClaimHistoryProps {
  record: string[]
}

export const ClaimHistory: FC<ClaimHistoryProps> = ({ record }) => {
  return <>
    <h2 className="text-center mt-1">历史</h2>
    <ol reversed className="w-25">
      {record?.map((item, index) => <li key={item + index}>{item}</li>)}
    </ol>
  </>
}