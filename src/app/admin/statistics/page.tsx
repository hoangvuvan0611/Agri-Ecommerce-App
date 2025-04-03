'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface CategoryData {
  name: string;
  value: number;
}

const salesData = [
  { name: 'Tháng 1', value: 4000 },
  { name: 'Tháng 2', value: 3000 },
  { name: 'Tháng 3', value: 5000 },
  { name: 'Tháng 4', value: 2780 },
  { name: 'Tháng 5', value: 1890 },
  { name: 'Tháng 6', value: 2390 },
];

const revenueData = [
  { name: 'Tháng 1', value: 4000 },
  { name: 'Tháng 2', value: 3000 },
  { name: 'Tháng 3', value: 5000 },
  { name: 'Tháng 4', value: 2780 },
  { name: 'Tháng 5', value: 1890 },
  { name: 'Tháng 6', value: 2390 },
];

const categoryData: CategoryData[] = [
  { name: 'Rau xanh', value: 400 },
  { name: 'Trái cây', value: 300 },
  { name: 'Thực phẩm', value: 200 },
  { name: 'Khác', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Thống kê</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Tuần</Button>
          <Button variant="outline">Tháng</Button>
          <Button variant="outline">Năm</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-600">Tổng doanh thu</h3>
          <p className="text-2xl font-bold mt-2">45.2M ₫</p>
          <p className="text-sm text-green-600 mt-2">+15% so với tháng trước</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-600">Đơn hàng</h3>
          <p className="text-2xl font-bold mt-2">1,234</p>
          <p className="text-sm text-green-600 mt-2">+8% so với tháng trước</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-600">Sản phẩm bán được</h3>
          <p className="text-2xl font-bold mt-2">5,678</p>
          <p className="text-sm text-green-600 mt-2">+12% so với tháng trước</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-600">Khách hàng mới</h3>
          <p className="text-2xl font-bold mt-2">89</p>
          <p className="text-sm text-green-600 mt-2">+5% so với tháng trước</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Doanh thu theo tháng</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tăng trưởng doanh thu</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Phân loại sản phẩm</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: { name: string; percent: number }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top sản phẩm bán chạy</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                  <div>
                    <p className="font-medium">Sản phẩm {item}</p>
                    <p className="text-sm text-gray-600">Đã bán: 123</p>
                  </div>
                </div>
                <p className="text-lime-600 font-semibold">1,234,000₫</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 