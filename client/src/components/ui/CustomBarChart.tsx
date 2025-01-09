'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  visitors: {
    label: 'Visitors',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

interface CustomBarChartProps {
  chartData: { day: string; visitors: number }[];
}

export function CustomBarChart({ chartData }: CustomBarChartProps) {
  return (
    <Card className="bg-[#181818] border-general-pink border-[1px] text-general-pink">
      <CardHeader>
        <CardTitle>Bar Chart - Visitors</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} stroke="#444" />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Shortened day names
              tick={{ fill: 'white' }} // Axis tick color
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" fill="#85F4FA" radius={8}>
              <LabelList
                position="top"
                offset={12}
                fill="white" // Label text color
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
