'use client';

import { getStatistic } from '@/actions/statistic-actions';
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
    { day: 'Sunday', visitors: 120 },
    { day: 'Monday', visitors: 200 },
    { day: 'Tuesday', visitors: 150 },
    { day: 'Wednesday', visitors: 180 },
    { day: 'Thursday', visitors: 220 },
    { day: 'Friday', visitors: 300 },
    { day: 'Saturday', visitors: 250 },
  ];

  // Hiển thị tổng quan dữ liệu
  const overviewData = [
    { label: 'Songs', value: data?.totalSongs || 0 },
    { label: 'Albums', value: data?.totalAlbums || 0 },
    { label: 'Users', value: data?.totalUsers || 0 },
    { label: 'Genres', value: data?.totalGenres || 0 },
  ];

  return (
    <div className="flex-col min-h-screen text-white px-8 py-6">
      <div className="flex items-center justify-center h-screen w-full">
        <div
          className="flex p-4 flex-col w-full h-full text-white rounded-lg bg-[linear-gradient(91deg,rgba(0,0,0,0)_13.23%,rgba(0,0,0,0.8)_64.01%),linear-gradient(90deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.8)_101.37%),url('/music-landing-bg.webp')] bg-[50%] bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('/music-landing-bg.webp')` }}
        >
          <nav className="container mx-auto p-4 flex items-center justify-between"></nav>

          {/* Hero Section */}
          <div className="container mx-auto px-4 mt-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-5xl font-bold leading-tight">
                  Welcome back <span className="text-pink-600">Admin!</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-[500px] text-justify">
                  On our website, you can manage an extensive collection of
                  popular and new songs with ease. Oversee high-quality
                  streaming to ensure users enjoy their favorite tracks without
                  interruptions. No matter the music preference of your
                  audience, we provide a comprehensive library to cater to every
                  taste! Take full control of the platform to deliver an
                  exceptional listening experience.
                </p>
                <div className="flex gap-4">
                  <AppButton className="flex h-10 items-center justify-center rounded px-6 bg-[#EE10B0] hover:bg-pink-700 text-white gap-5">
                    Manage Songs
                  </AppButton>
                  <AppButton className="flex h-10 items-center justify-center rounded px-6 border border-[#0E9EEF] text-[#0E9EEF] hover:bg-[#0E9EEF] hover:text-white">
                    Manage Artists
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4 mt-16">
          Reports & <span className="text-pink-500">Statistics</span>
        </h2>
      </section>

      {/* Overview Section */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {overviewData.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-lg text-center border border-general-pink"
          >
            <div className="text-4xl font-bold text-general-pink">
              {item.value}
            </div>
            <div className="text-lg text-general-pink">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Pie Chart */}
        <DonutPieChart chartData={pieChartData} />

        {/* Bar Chart */}
        <CustomBarChart chartData={barChartData} />
      </div>
    </div>
  );
};

export default Home;
