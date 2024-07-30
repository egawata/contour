import * as React from 'react'

interface ThresholdInputProps {
    label: string
    val: number
    onChange: (val: number) => void
}

const ThresholdInput: React.FC<ThresholdInputProps> = ({
    label,
    val,
    onChange,
}) => {
  const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value)
    onChange(newVal)
  }

  return (
    <div>
      <label>{label}</label>
      <input 
        type="number"
        style={{width: '100px', textAlign: 'right'}}
        min={0}
        max={255}
        value={val}
        onChange={handleInputchange}
      />
    </div>
  )
}

export default ThresholdInput
