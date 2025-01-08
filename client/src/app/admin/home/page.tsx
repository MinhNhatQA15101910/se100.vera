import { CustomBarChart } from '@/components/ui/CustomBarChart';
import { DonutPieChart } from '@/components/ui/DonutPieChart';
import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen text-white px-8 py-6">
      {/* Overview Section */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Songs', value: 750 },
          { label: 'Album', value: 70 },
          { label: 'Users', value: 100 },
          { label: 'Artists', value: 30 },
        ].map((item, index) => (
          <div
            key={index}
            className=" p-6 rounded-lg text-center border border-general-pink"
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
        <DonutPieChart />

        {/* Bar Chart */}
        <CustomBarChart />

        {/* Total Access Chart */}
        <div className=" p-6 rounded-lg border border-general-pink">
          <div className="mb-4 ">Total Access</div>
          <div className="flex justify-between items-end h-40">
            {[60, 90, 100, 120, 70, 80, 110].map((value, index) => (
              <div
                key={index}
                className="w-8 bg-cyan-500"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
        </div>

        {/* Live Calls */}
        <div className=" p-6 rounded-lg border border-general-pink">
          <div className="mb-4 ">Live Calls</div>
          <div className="flex items-center justify-center h-64">
            <div className="w-40 h-40">
              {/* Simulated Circular Chart */}
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <circle r="16" cx="16" cy="16" fill="cyan" />
                <circle
                  r="16"
                  cx="16"
                  cy="16"
                  fill="transparent"
                  stroke="pink"
                  strokeWidth="32"
                  strokeDasharray="80 100"
                  transform="rotate(-90) translate(-32)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
