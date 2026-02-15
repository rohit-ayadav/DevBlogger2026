import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface AnalyticsChartProps {
    data: { displayMonth: string; views: number; likes: number }[];
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="displayMonth"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={50}
                />
                <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke="#0088FE"
                    tick={{ fontSize: 12 }}
                    width={40}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#00C49F"
                    tick={{ fontSize: 12 }}
                    width={40}
                />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12, marginTop: 10 }} />
                <Bar yAxisId="left" dataKey="views" fill="#0088FE" name="Views" />
                <Bar yAxisId="right" dataKey="likes" fill="#00C49F" name="Likes" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default AnalyticsChart;
