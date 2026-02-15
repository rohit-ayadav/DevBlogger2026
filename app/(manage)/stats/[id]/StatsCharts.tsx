"use client"

import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ViewsTrendChart = ({ data }: { data: any[] }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#viewsGradient)"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export const LikesTrendChart = ({ data }: { data: any[] }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="likes"
                    stroke="#10B981"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export const EngagementBarChart = ({ data }: { data: any[] }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis unit="%" />
                <Tooltip />
                <Bar
                    dataKey="engagement"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
