import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BlogPostType } from '@/types/blogs-types'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const AnalyticsChart = dynamic(() => import('./AnalyticsChart'), {
    loading: () => <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin" /></div>,
    ssr: false
})

interface AnalyticsProps {
    blogs: BlogPostType[];
    monthlyStats: { blog: string; month: string; views: number; likes: number }[];
    chartData: { displayMonth: string; views: number; likes: number }[];
    sortedBlogs: BlogPostType[];
}

const Analytics = ({ blogs, monthlyStats, chartData, sortedBlogs }: AnalyticsProps) => {
    return (
        <div className="w-full space-y-6">
            <Card className="border-0 shadow-lg">
                <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="text-lg sm:text-xl">Monthly Engagement Metrics</CardTitle>
                    <CardDescription>
                        Detailed breakdown of views, likes, and engagement rates
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                    <div className="h-64 sm:h-80">
                        <AnalyticsChart data={chartData} />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
                <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="text-lg sm:text-xl">Top Performing Posts</CardTitle>
                    <CardDescription>
                        Your most viewed and liked blog posts
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-0 sm:px-6">
                    <div className="overflow-x-auto">
                        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Views</th>
                                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Likes</th>
                                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Engage</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                {sortedBlogs.slice(0, 5).map((blog) => {
                                    const blogStats = monthlyStats.filter(stat => stat.blog === blog._id);
                                    const totalViews = blogStats.reduce((sum, stat) => sum + stat.views, 0);
                                    const totalLikes = blogStats.reduce((sum, stat) => sum + stat.likes, 0);
                                    const engagement = totalViews ? ((totalLikes / totalViews) * 100).toFixed(1) : "0";

                                    return (
                                        <tr key={blog._id}>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4">
                                                <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[120px] sm:max-w-[200px]">
                                                    {blog.title}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(blog.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4">
                                                <Badge variant="outline" className="capitalize text-xs">
                                                    {blog.category}
                                                </Badge>
                                            </td>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                                                {totalViews.toLocaleString()}
                                            </td>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900 dark:text-gray-100">
                                                {totalLikes.toLocaleString()}
                                            </td>
                                            <td className="px-3 sm:px-6 py-2 sm:py-4">
                                                <div className={`text-xs sm:text-sm ${Number(engagement) > 5 ? 'text-green-600 dark:text-green-400' :
                                                    Number(engagement) > 2 ? 'text-amber-600 dark:text-amber-400' :
                                                        'text-red-600 dark:text-red-400'
                                                    }`}>
                                                    {engagement}%
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Analytics