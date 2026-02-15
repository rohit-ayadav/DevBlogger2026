import React from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface UserGrowthChartProps {
    data: any[];
}

const UserGrowthChart: React.FC<UserGrowthChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))'
                    }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="users"
                    name="Total Users"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                />
                <Line
                    type="monotone"
                    dataKey="activeUsers"
                    name="Active Writers"
                    stroke='hsl(0, 0%, 70%)'
                    strokeWidth={2}
                    dot={{ r: 4 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default UserGrowthChart;
