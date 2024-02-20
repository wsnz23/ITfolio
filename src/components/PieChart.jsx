import React from 'react';  // Make sure to import React

import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../data/mockData";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    // <ResponsivePie
    //   data={data}
    //   margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    //   startAngle={-39}
    //   sortByValue={true}
    //   innerRadius={0.2}
    //   padAngle={6}
    //   cornerRadius={6}
    //   activeOuterRadiusOffset={8}
    //   colors={{ scheme: 'category10' }}
    //   borderWidth={8}
    //   borderColor={{
    //     from: 'color',
    //     modifiers: [['darker', '0.3']]
    //   }}
    //   arcLinkLabelsSkipAngle={29}
    //   arcLinkLabelsTextOffset={9}
    //   arcLinkLabelsTextColor="#333333"
    //   arcLinkLabelsOffset={-3}
    //   arcLinkLabelsDiagonalLength={13}
    //   arcLinkLabelsStraightLength={23}
    //   arcLinkLabelsThickness={3}
    //   arcLinkLabelsColor={{ from: 'color' }}
    //   arcLabelsRadiusOffset={0.65}
    //   arcLabelsSkipAngle={23}
    //   arcLabelsTextColor={{ theme: 'background' }}
    //   tooltip={(data) => {
    //     const { datum } = data;
      
    //     return (
    //       <div style={{ color:'#FFFFFF' }}>
    //         <div>
    //           <span>Label:</span>
    //           <span>{datum.label}</span>
    //         </div>
    //         <div>
    //           <span>Value:</span>
    //           <span>{datum.value}</span>
    //         </div>
    //         {/* You can include other properties here */}
    //       </div>
    //     );
    //   }}
    //   defs={[
    //     {
    //       id: 'dots',
    //       type: 'patternDots',
    //       background: 'inherit',
    //       color: 'rgba(255, 255, 255, 0.3)',
    //       size: 4,
    //       padding: 1,
    //       stagger: true
    //     },
    //     {
    //       id: 'lines',
    //       type: 'patternLines',
    //       background: 'inherit',
    //       color: 'rgba(255, 255, 255, 0.3)',
    //       rotation: -45,
    //       lineWidth: 6,
    //       spacing: 10
    //     }
    //   ]}
    //   fill={[
    //     { match: { id: 'ruby' }, id: 'dots' },
    //     { match: { id: 'c' }, id: 'dots' },
    //     { match: { id: 'go' }, id: 'dots' },
    //     { match: { id: 'python' }, id: 'dots' },
    //     { match: { id: 'scala' }, id: 'lines' },
    //     { match: { id: 'lisp' }, id: 'lines' },
    //     { match: { id: 'elixir' }, id: 'lines' },
    //     { match: { id: 'javascript' }, id: 'lines' }
    //   ]}
    //   motionConfig={{
    //     mass: 1,
    //     tension: 170,
    //     friction: 26,
    //     clamp: false,
    //     precision: 0.01,
    //     velocity: 0
    //   }}
    //   legends={[
    //     {
    //       anchor: 'bottom',
    //       direction: 'row',
    //       justify: false,
    //       translateX: 0,
    //       translateY: 56,
    //       itemsSpacing: 24,
    //       itemWidth: 100,
    //       itemHeight: 18,
    //       itemTextColor: '#999',
    //       itemDirection: 'left-to-right',
    //       itemOpacity: 1,
    //       symbolSize: 31,
    //       symbolShape: 'circle',
    //       effects: [
    //         {
    //           on: 'hover',
    //           style: {
    //             itemTextColor: '#000'
    //           }
    //         }
    //       ]
    //     }
    //   ]}
    // />
   <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                0.2
            ]
        ]
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#cc0000"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                2
            ]
        ]
    }}
    defs={[
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
    ]}
    fill={[
        {
            match: {
                id: 'ruby'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'c'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'go'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'python'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'scala'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'lisp'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'elixir'
            },
            id: 'lines'
        },
        {
            match: {
                id: 'javascript'
            },
            id: 'lines'
        }
    ]}
    legends={[
        {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000'
                    }
                }
            ]
        }
    ]}
/>
  );
};

export default PieChart;
 