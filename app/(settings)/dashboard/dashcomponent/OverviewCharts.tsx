"use client"

import React from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip, ResponsiveContainer, Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const PerformanceChart = ({ data, margin, windowWidth, formatXAxis }: any) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={margin}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                    dataKey="displayMonth"
                    tick={{ fontSize: windowWidth < 500 ? 10 : 12 }}
                    tickFormatter={formatXAxis}
                    interval={0}
                    tickLine={windowWidth >= 400}
                    height={windowWidth < 768 ? 40 : 30}
                    tickMargin={5}
                    angle={windowWidth < 768 ? -45 : 0}
                    textAnchor={windowWidth < 768 ? "end" : "middle"}
                />
                <YAxis
                    width={windowWidth < 500 ? 30 : 45}
                    tick={{ fontSize: windowWidth < 500 ? 10 : 12 }}
                    tickMargin={3}
                />
                <Tooltip contentStyle={{ fontSize: windowWidth < 500 ? '10px' : '12px' }} />
                <Legend wrapperStyle={{ fontSize: windowWidth < 500 ? '10px' : '12px' }} />
                <Line type="monotone" dataKey="views" stroke="#0088FE" name="Views" activeDot={{ r: windowWidth < 500 ? 4 : 6 }} strokeWidth={windowWidth < 500 ? 1.5 : 2} />
                <Line type="monotone" dataKey="likes" stroke="#00C49F" name="Likes" strokeWidth={windowWidth < 500 ? 1.5 : 2} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export const CategoryPieChart = ({ data, margin, windowWidth }: any) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={margin}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={windowWidth < 500 ? 40 : 60}
                    outerRadius={windowWidth < 500 ? 60 : 80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    labelLine={windowWidth >= 400}
                    label={windowWidth < 400 ? false : ({ name, percent }: any) =>
                        windowWidth < 600 ?
                            `${(percent * 100).toFixed(0)}%` :
                            `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                >
                    {data.map((entry: any, index: any) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value: any, name: any, props: any) => [`${value} posts`, `${props.payload.name}`]}
                    contentStyle={{ fontSize: windowWidth < 500 ? '10px' : '12px' }}
                />
                <Legend
                    wrapperStyle={{
                        fontSize: windowWidth < 500 ? '9px' : '12px',
                        paddingTop: windowWidth < 500 ? '10px' : '20px'
                    }}
                    layout={windowWidth < 400 ? "horizontal" : "vertical"}
                    align={windowWidth < 400 ? "center" : "right"}
                    verticalAlign={windowWidth < 400 ? "bottom" : "middle"}
                />
            </PieChart>
        </ResponsiveContainer>
    )
}

export const PublicationsBarChart = ({ data, margin, windowWidth, formatXAxis }: any) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={margin}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                    dataKey="displayMonth"
                    tick={{ fontSize: windowWidth < 500 ? 10 : 12 }}
                    tickFormatter={formatXAxis}
                    interval={0}
                    tickLine={windowWidth >= 400}
                    height={windowWidth < 768 ? 40 : 30}
                    tickMargin={5}
                    angle={windowWidth < 768 ? -45 : 0}
                    textAnchor={windowWidth < 768 ? "end" : "middle"}
                />
                <YAxis
                    allowDecimals={false}
                    width={windowWidth < 500 ? 30 : 45}
                    tick={{ fontSize: windowWidth < 500 ? 10 : 12 }}
                    tickMargin={3}
                />
                <Tooltip
                    formatter={(value: any) => [`${value} blogs`, 'Publications']}
                    contentStyle={{ fontSize: windowWidth < 500 ? '10px' : '12px' }}
                />
                <Bar dataKey="blogs" fill="#8884d8" name="Blogs Published" />
            </BarChart>
        </ResponsiveContainer>
    )
}
