'use client';

import { getStatistic } from '@/actions/statistic-actions';
import TrendingSongs from '@/app/(app)/home/_components/TrendingSongs';
import AdminNoSearchBar from '@/components/AdminNoSearchBar';
import { AppButton } from '@/components/ui/AppButton';
import { CustomBarChart } from '@/components/ui/CustomBarChart';
import { DonutPieChart } from '@/components/ui/DonutPieChart';
import { useLoading } from '@/contexts/LoadingContext';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

const Home = () => {
  const { setLoadingState } = useLoading();
  const { data, isLoading } = useQuery({
    queryKey: ['statistic'],
    queryFn: async () => await getStatistic(),
  });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  // Chuẩn bị dữ liệu biểu đồ từ API

  const totalListeners = (data?.totalUsers ?? 0) - (data?.totalArtists ?? 0);

  const pieChartData = [
    {
      browser: 'Listeners',
      visitors: Math.max(totalListeners, 0), // Đảm bảo không có giá trị âm
      fill: '#85F4FA',
    },
    {
      browser: 'Artists',
      visitors: data?.totalArtists ?? 0, // Giá trị mặc định là 0
      fill: '#3A57E8',
    },
  ];

  const barChartData = [
    { day: 'Sunday', visitors: 10 },
    { day: 'Monday', visitors: 17 },
    { day: 'Tuesday', visitors: 8 },
    { day: 'Wednesday', visitors: 2 },
    { day: 'Thursday', visitors: 5 },
    { day: 'Friday', visitors: 4 },
    { day: 'Saturday', visitors: 15 },
  ];

  const overviewData1 = [
    { label: 'Users', value: data?.totalUsers || 0 },
    { label: 'Songs', value: data?.totalSongs || 0 },
    { label: 'Artists', value: data?.totalArtists || 0 },
    { label: 'Albums', value: data?.totalAlbums || 0 },
    { label: 'Playlists', value: data?.totalPlaylists || 0 },
    { label: 'Genres', value: data?.totalGenres || 0 },
    { label: 'Views', value: data?.totalViews || 0 },
    { label: 'Downloads', value: data?.totalDownloads || 0 },
  ];

  return (
    <div className="flex-col min-h-screen text-white px-8 py-6">
      <div className="w-full pt-10">
        <AdminNoSearchBar />
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6 mt-8">
        {overviewData1.map((item, index) => {
          const colors = [
            '#FF006E',
            '#3A86FF',
            '#EE10B0',
            '#85F4FA',
            '#3A57E8',
            '#9837EC',
            '#F5A1EF',
            '#F55659',
          ];

          const color = colors[index % colors.length];

          return (
            <div
              key={index}
              className="p-6 h-[120px] rounded-lg text-center border"
              style={{
                borderColor: color, // Màu viền
              }}
            >
              <div
                className="text-4xl font-bold"
                style={{
                  color, // Màu chữ giống màu viền
                }}
              >
                {item.value}
              </div>
              <div
                className="text-lg"
                style={{
                  color, // Màu chữ giống màu viền
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <DonutPieChart chartData={pieChartData} />
        <CustomBarChart chartData={barChartData} />
      </div>
    </div>
  );
};

export default Home;
