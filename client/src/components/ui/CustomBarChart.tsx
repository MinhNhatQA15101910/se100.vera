'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// Chart data for the 7 days of the week
const chartData = [
  { day: 'Sunday', visitors: 120 },
  { day: 'Monday', visitors: 200 },
  { day: 'Tuesday', visitors: 150 },
  { day: 'Wednesday', visitors: 180 },
  { day: 'Thursday', visitors: 220 },
  { day: 'Friday', visitors: 300 },
  { day: 'Saturday', visitors: 250 },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function CustomBarChart() {
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
            <CartesianGrid vertical={false} stroke="#444" />{' '}
            {/* Grid styling */}
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
