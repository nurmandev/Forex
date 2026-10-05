import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const profitData = [
  { date: "Nov 1", profit: 8.5 },
  { date: "Nov 3", profit: 12.2 },
  { date: "Nov 5", profit: 10.8 },
  { date: "Nov 7", profit: 15.4 },
  { date: "Nov 9", profit: 13.6 },
  { date: "Nov 11", profit: 18.2 },
  { date: "Nov 13", profit: 16.5 },
  { date: "Nov 15", profit: 20.1 },
  { date: "Nov 17", profit: 17.8 },
  { date: "Nov 19", profit: 22.4 },
  { date: "Nov 21", profit: 19.6 },
  { date: "Nov 23", profit: 24.3 },
];

export function ProfitChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={profitData}>
          <defs>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px 12px'
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Profit']}
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#colorProfit)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
