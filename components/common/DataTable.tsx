import { MarriageScoreTracker } from '@/types/marriage'
import { NextPage } from 'next'
import { useState } from 'react'
import CheckboxAction from './CheckboxAction'
import DataRow from './DataRow'

type SelectedRows = {
  [key: string]: boolean // or any other type that `newAllSelected` is
}

type DataTableProps = {
  title: string
  titleContainers?: JSX.Element[]
  isCredentialType?: boolean
  rows: MarriageScoreTracker[]
  isSelectable?: boolean
  onSelectionChange?: (selectedRows: { [key: string]: boolean }) => void
}

const DataTable: NextPage<DataTableProps> = ({
  title,
  titleContainers,
  isCredentialType,
  rows = [],
  isSelectable,
  onSelectionChange
}) => {
  const [allSelected, setAllSelected] = useState(false)
  const [selectedRows, setSelectedRows] = useState<{ [key: string]: boolean }>(
    {}
  )

  const handleRowSelect = (isSelected: boolean, id: string) => {
    setSelectedRows((prevSelected) => {
      const newSelected = { ...prevSelected, [id]: isSelected }
      onSelectionChange?.(newSelected) // Call the callback with the new selection state
      return newSelected
    })
  }

  const handleSelectAll = () => {
    const newAllSelected = !allSelected
    setAllSelected(newAllSelected)

    const newSelectedRows: SelectedRows = {}
    // If we are selecting all, set the state for each row to true, otherwise to false.
    rows.forEach((row: MarriageScoreTracker) => {
      newSelectedRows[row.docId] = newAllSelected
    })

    setSelectedRows(newSelectedRows)
    onSelectionChange?.(newSelectedRows) // Call the callback with the new selection state
  }

  return (
    <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] border-[1px] border-solid border-black-4 Small_Tablet:hidden'>
      <div className='self-stretch h-14 flex flex-row items-center justify-start py-0 pr-0 pl-6 box-border gap-[20px]'>
        <div className='self-stretch flex-1 flex flex-row items-center justify-start text-3xl text-white Small_Tablet:flex'>
          <h1 className='m-0 relative text-inherit font-semibold font-inherit Small_Tablet:flex'>
            {title}
          </h1>
        </div>
        {titleContainers}
      </div>

      <div className='self-stretch rounded-mini bg-black-2 flex flex-row items-center justify-start py-0 px-6 gap-[31px] text-grey-1'>
        {isSelectable && (
          <CheckboxAction
            boxSizing='border-box'
            isChecked={allSelected}
            handleCheckboxChange={handleSelectAll}
          />
        )}

        <div className='flex-1 h-6 overflow-hidden flex flex-row items-center justify-start py-0 pr-[7px] pl-0 box-border'>
          <div className='relative font-semibold'>Game ID</div>
        </div>
        <div className='w-[400px] flex flex-row items-center justify-between Small_Tablet:flex'>
          <div className='relative font-semibold inline-block w-[90px] shrink-0'>
            Number of players
          </div>
          <div className='relative font-semibold inline-block w-[90px] shrink-0'>
            Point Rate
          </div>
          <div className='relative font-semibold inline-block w-[90px] shrink-0'>
            Created
          </div>
          <div className='relative font-semibold inline-block w-[90px] shrink-0'>
            Last Updated
          </div>
        </div>
      </div>

      <div className='self-stretch flex flex-col items-start justify-start gap-[15px] text-white'>
        {rows.map((row) => {
          // Check for null or undefined row
          if (!row) return null

          // Conditionally render components based on the presence of properties and isCredentialType
          return (
            <DataRow
              key={row.docId}
              id={row.docId}
              gameDetail={row}
              isSelectable={isSelectable}
              onSelect={(isSelected) => handleRowSelect(isSelected, row.docId)}
              isChecked={selectedRows[row.docId] || false}
            />
          )
        })}
      </div>
    </div>
  )
}

export default DataTable
