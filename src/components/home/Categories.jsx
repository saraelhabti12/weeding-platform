import { Building2, Utensils, Sparkles, Music, Camera, Flower2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: "Halls", icon: Building2, slug: "halls", color: "bg-amber-50 text-amber-600" },
  { id: 2, name: "Traiteur", icon: Utensils, slug: "traiteur", color: "bg-emerald-50 text-emerald-600" },
  { id: 3, name: "Negafa", icon: Sparkles, slug: "negafa", color: "bg-pink-50 text-pink-600" },
  { id: 4, name: "DJ & Music", icon: Music, slug: "dj-music", color: "bg-indigo-50 text-indigo-600" },
  { id: 5, name: "Photography", icon: Camera, slug: "photography", color: "bg-blue-50 text-blue-600" },
  { id: 6, name: "Decoration", icon: Flower2, slug: "decoration", color: "bg-rose-50 text-rose-600" },
];

const Categories = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {categories.map((cat) => (
        <Link 
          key={cat.id} 
          to={`/services?category=${cat.slug}`}
          className="group flex flex-col items-center p-8 bg-white rounded-[2rem] soft-shadow hover:scale-105 transition-all duration-300 border border-transparent hover:border-gold/20"
        >
          <div className={`h-16 w-16 rounded-2xl ${cat.color} flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform`}>
            <cat.icon size={32} />
          </div>
          <span className="text-gray-900 font-bold tracking-tight">{cat.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
