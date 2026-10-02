import { Wallet, Users, ChefHat, Truck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

// Custom Triangle Shape for Bar Chart
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height}
  ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

function AdminDashboard() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetching Dynamic Admin Stats
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    }
  });

  // Chart Static Data (Order-stats integrate na kora porjonto)
  const barData = [
    { category: 'Dessert', total: 20 },
    { category: 'Pizza', total: 30 },
    { category: 'Salad', total: 15 },
    { category: 'Soup', total: 25 },
  ];
  const barColors = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

  const pieData = [
    { name: 'Dessert', value: 21 },
    { name: 'Pizza', value: 21 },
    { name: 'Salad', value: 38 },
    { name: 'Soup', value: 20 },
  ];
  const pieColors = ['#0088FE', '#FF8042', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (isLoading) {
    return <div className="text-center py-20 text-lg font-semibold">Loading stats...</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-[#F6F6F6] min-h-screen">
      {/* Dynamic Title */}
      <div className="mb-8 flex flex-col items-start gap-1">
        <p className="text-xs font-semibold tracking-widest text-[#D1A054] uppercase">
          Overview & Dashboard
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
          Hi, Welcome Back{" "}
          <span className="inline-block bg-gradient-to-r from-[#D1A054] to-[#b58130] bg-clip-text text-transparent capitalize">
            {user?.displayName || user?.name || "Guest"}!
          </span>
        </h1>
        <div className="h-1 w-16 bg-[#D1A054] rounded-full mt-2"></div>
      </div>

      {/* Dynamic Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
        
        {/* Card 1: Revenue */}
        <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] text-white p-6 rounded-lg flex items-center justify-center gap-6 shadow-md">
          <Wallet className="w-10 h-10" />
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold">${stats.revenue || 0}</h2>
            <p className="text-lg font-normal opacity-90">Revenue</p>
          </div>
        </div>

        {/* Card 2: Customers */}
        <div className="bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] text-white p-6 rounded-lg flex items-center justify-center gap-6 shadow-md">
          <Users className="w-10 h-10" />
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold">{stats.users || 0}</h2>
            <p className="text-lg font-normal opacity-90">Customers</p>
          </div>
        </div>

        {/* Card 3: Products */}
        <div className="bg-gradient-to-r from-[#FE4880] to-[#FECDE1] text-white p-6 rounded-lg flex items-center justify-center gap-6 shadow-md">
          <ChefHat className="w-10 h-10" />
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold">{stats.menuItems || 0}</h2>
            <p className="text-lg font-normal opacity-90">Products</p>
          </div>
        </div>

        {/* Card 4: Orders */}
        <div className="bg-gradient-to-r from-[#6AA2E8] to-[#B2E3FF] text-white p-6 rounded-lg flex items-center justify-center gap-6 shadow-md">
          <Truck className="w-10 h-10" />
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold">{stats.orders || 0}</h2>
            <p className="text-lg font-normal opacity-90">Orders</p>
          </div>
        </div>
      </div>

      {/* Charts Container */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Bar Chart Section */}
        <div className="w-full h-[300px] sm:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="category" tickLine={false} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart Section */}
        <div className="w-full h-[300px] sm:h-[350px] flex flex-col items-center justify-center">
          <div className="flex flex-wrap gap-4 justify-center mb-2 text-xs font-semibold text-gray-600">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#0088FE] inline-block rotate-45"></span> Dessert</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#00C49F] inline-block rotate-45"></span> Pizza</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#FFBB28] inline-block rotate-45"></span> Salad</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#FF8042] inline-block rotate-45"></span> Soup</span>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;









// import { Wallet, Users, ChefHat, Truck } from 'lucide-react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
//   PieChart,
//   Pie
// } from 'recharts';
// import useAuth from '../../../hooks/useAuth';

// // Custom Triangle Shape for Bar Chart (Exact UI Match)
// const getPath = (x, y, width, height) => {
//   return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
//   ${x + width / 2}, ${y}
//   C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height}
//   ${x + width}, ${y + height}
//   Z`;
// };

// const TriangleBar = (props) => {
//   const { fill, x, y, width, height } = props;
//   return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
// };

// function AdminDashboard() {
//   // Static Data for Bar Chart
//   const barData = [
//     { category: 'Dessert', total: 20 },
//     { category: 'Pizza', total: 30 },
//     { category: 'Salad', total: 15 },
//     { category: 'Soup', total: 25 },
//   ];

//   const barColors = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];
//   const { user } = useAuth();

//   // Static Data for Pie Chart
//   const pieData = [
//     { name: 'Dessert', value: 21 },
//     { name: 'Pizza', value: 21 },
//     { name: 'Salad', value: 38 },
//     { name: 'Soup', value: 20 },
//   ];

//   const pieColors = ['#0088FE', '#FF8042', '#FFBB28', '#FF8042'];

//   const RADIAN = Math.PI / 180;
//   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
//   };

//   return (
//     <div className="p-4 sm:p-6 md:p-10 bg-[#F6F6F6] min-h-screen">
//       {/* Title */}
//       <div className="mb-8 flex flex-col items-start gap-1">
//         <p className="text-xs font-semibold tracking-widest text-[#D1A054] uppercase">
//           Overview & Dashboard
//         </p>
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
//           Hi, Welcome Back{" "}
//           <span className="inline-block bg-gradient-to-r from-[#D1A054] to-[#b58130] bg-clip-text text-transparent capitalize">
//             {user?.displayName || user?.name || "Guest"}!
//           </span>
//         </h1>
//         <div className="h-1 w-16 bg-[#D1A054] rounded-full mt-2"></div>
//       </div>

//       {/* Top 4 Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
//         {/* Card 1: Revenue */}
//         <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] text-white p-6 rounded-lg flex items-center justify-center gap-6 shadow-md">
//           <Wallet className="w-10 h-10" />
//           <div>
//             <h2 className="text-3xl sm:text-4xl font-extrabold">1000</h2>
//             <p className="text-lg font-normal opacity-90">Revenue</p>
//           </div>
//         </div>

//         {/* Card 2: Customers */}
//         <div className="bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] text-white p-6 rounded-lg flex items-center justify-center gap-6 shadow-md">
//           <Users className="w-10 h-10" />
//           <div>
//             <h2 className="text-3xl sm:text-4xl font-extrabold">1500</h2>
//             <p className="text-lg font-normal opacity-90">Customers</p>
//           </div>
//         </div>

//         {/* Card 3: Products */}
//         <div className="bg-gradient-to-r from-[#FE4880] to-[#FECDE1] text-white p-6 rounded-lg flex items-center justify-center gap-6 shadow-md">
//           <ChefHat className="w-10 h-10" />
//           <div>
//             <h2 className="text-3xl sm:text-4xl font-extrabold">103</h2>
//             <p className="text-lg font-normal opacity-90">Products</p>
//           </div>
//         </div>

//         {/* Card 4: Orders */}
//         <div className="bg-gradient-to-r from-[#6AA2E8] to-[#B2E3FF] text-white p-6 rounded-lg flex items-center justify-center gap-6 shadow-md">
//           <Truck className="w-10 h-10" />
//           <div>
//             <h2 className="text-3xl sm:text-4xl font-extrabold">500</h2>
//             <p className="text-lg font-normal opacity-90">Orders</p>
//           </div>
//         </div>
//       </div>

//       {/* Charts Container */}
//       <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

//         {/* Bar Chart Section */}
//         <div className="w-full h-[300px] sm:h-[350px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={barData}
//               margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis dataKey="category" tickLine={false} />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="total" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
//                 {barData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Pie Chart Section */}
//         <div className="w-full h-[300px] sm:h-[350px] flex flex-col items-center justify-center">
//           {/* Legend Header */}
//           <div className="flex flex-wrap gap-4 justify-center mb-2 text-xs font-semibold text-gray-600">
//             <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#0088FE] inline-block rotate-45"></span> Dessert</span>
//             <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#00C49F] inline-block rotate-45"></span> Pizza</span>
//             <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#FFBB28] inline-block rotate-45"></span> Salad</span>
//             <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#FF8042] inline-block rotate-45"></span> Soup</span>
//           </div>

//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={renderCustomizedLabel}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;