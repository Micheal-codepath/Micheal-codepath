import { stats } from '@/data/mockData';

export default function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-orange-50/30 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
