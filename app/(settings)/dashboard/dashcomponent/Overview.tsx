import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const PerformanceChart = dynamic(() => import('./OverviewCharts').then(mod => mod.PerformanceChart), {
    loading: () => <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin" /></div>,
    ssr: false
})

const CategoryPieChart = dynamic(() => import('./OverviewCharts').then(mod => mod.CategoryPieChart), {
    loading: () => <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin" /></div>,
    ssr: false
})

const PublicationsBarChart = dynamic(() => import('./OverviewCharts').then(mod => mod.PublicationsBarChart), {
    loading: () => <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin" /></div>,
    ssr: false
})

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface OverviewProps {
    chartData: { displayMonth: string; views: number; likes: number; blogs: number }[];
    categoryDistribution: { name: string; value: number }[];
    timeframe: string;
}

const Overview = ({ chartData, categoryDistribution, timeframe }: OverviewProps) => {
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    // Handle window resize
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Format month labels based on screen size
    const formatXAxis = (value: string) => {
        // Extract month and year if the format is like "January 2025"
        const parts = value.split(' ');
        if (parts.length === 2) {
            const month = parts[0].substring(0, 3).toUpperCase(); // First 3 chars of month
            const year = parts[1];
            return windowWidth < 768 ? `${month} ${year.substring(2)}` : `${month} ${year}`;
        }
        // If not in expected format, just return abbreviated version
        return windowWidth < 768 ? value.substring(0, 3).toUpperCase() : value;
    };

    // Adjust chart margins based on screen size
    const getMargins = () => {
        if (windowWidth < 500) {
            return { top: 5, right: 5, left: 5, bottom: 35 }; // More bottom space for tilted labels
        } else if (windowWidth < 768) {
            return { top: 5, right: 10, left: 15, bottom: 40 }; // More bottom space for tilted labels
        }
        return { top: 5, right: 20, left: 20, bottom: 20 };
    };

    return (
        <div className="w-full space-y-4 sm:space-y-6">
            <Card className="border-0 shadow-lg">
                <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
                    <CardTitle className="text-base sm:text-lg md:text-xl">Performance Overview</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Views and likes over the past {timeframe === '6months' ? '6' : '12'} months
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-1 sm:px-4 md:px-6">
                    <div className="h-48 sm:h-60 md:h-72 w-full">
                        <PerformanceChart data={chartData} margin={getMargins()} windowWidth={windowWidth} formatXAxis={formatXAxis} />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                <Card className="border-0 shadow-lg">
                    <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
                        <CardTitle className="text-base sm:text-lg md:text-xl">Category Distribution</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Breakdown of your blog posts by category
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-1 sm:px-4 md:px-6">
                        <div className="h-48 sm:h-56 md:h-64 w-full">
                            <CategoryPieChart data={categoryDistribution} margin={getMargins()} windowWidth={windowWidth} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
                        <CardTitle className="text-base sm:text-lg md:text-xl">Monthly Blog Publications</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Number of blogs published each month
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-1 sm:px-4 md:px-6">
                        <div className="h-48 sm:h-56 md:h-64 w-full">
                            <PublicationsBarChart data={chartData} margin={getMargins()} windowWidth={windowWidth} formatXAxis={formatXAxis} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Overview