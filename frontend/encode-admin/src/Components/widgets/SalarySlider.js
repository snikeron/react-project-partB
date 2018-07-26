import React from 'react'
import Tooltip from 'rc-tooltip'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'


const createSliderWithTooltip = Slider.createSliderWithTooltip
const Handle = Slider.Handle
const MinSlider = createSliderWithTooltip(Slider)

const SalarySlider = ({min, max, defaultValue, raiseData}) => {



    const handle = (props) => {
        const { value, dragging, index, ...restProps } = props
        return (
          <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
          >
            <Handle value={value} {...restProps}  />
          </Tooltip>
        )
      }
    


    return (
        <div className="slider">
            <MinSlider
                min={min} 
                max={max} 
                defaultValue={defaultValue} 
                handle={handle}
                marks={{0:0, 200:'200K'}}
                tipFormatter={value => `$${value}K`}
                onChange={raiseData}
                 />
        </div>
    )

}

export default SalarySlider


  