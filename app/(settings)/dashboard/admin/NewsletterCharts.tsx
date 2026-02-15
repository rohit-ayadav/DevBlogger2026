"use client"

import React from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export const SubscriberGrowthChart = ({ data }: { data: any[] }) => {
    return (
        <ChartContainer
            config={{
                subscribers: {
                    label: "Subscribers",
                    color: "hsl(var(--chart-1))",
                },
            }}
            className="h-[200px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="subscribers" stroke="var(--color-subscribers)" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}

export const EngagementRateChart = ({ data }: { data: any[] }) => {
    return (
        <ChartContainer
            config={{
                rate: {
                    label: "Engagement Rate",
                    color: "hsl(var(--chart-2))",
                },
            }}
            className="h-[200px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="week" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="rate" fill="var(--color-rate)" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}
