"use client"

import React from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

interface CategoryBarChartProps {
    data: any[];
    config: any;
}

const CategoryBarChart: React.FC<CategoryBarChartProps> = ({ data, config }) => {
    return (
        <ChartContainer config={config} className="h-[400px] max-w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="count" fill="var(--color-count)" name="Post Count" />
                    <Bar dataKey="totalViews" fill="var(--color-views)" name="Total Views" />
                    <Bar dataKey="totalLikes" fill="var(--color-likes)" name="Total Likes" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}

export default CategoryBarChart
