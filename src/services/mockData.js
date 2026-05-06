export const halls = [
  {
    id: 1,
    name: "Royal Grand Ballroom",
    lat: 33.5898,
    lng: -7.6031,
    city: "Casablanca",
    district: "Anfa",
    location: "Anfa District, Casablanca",
    capacity: 500,
    price: 2500,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A majestic ballroom perfect for grand weddings. Featuring crystal chandeliers, hand-carved Moroccan plasterwork (Zellige), and a spacious stage for live performances.",
    amenities: ["AC", "Parking", "Catering", "Sound System", "Bridal Suite", "Valet Parking"],
    packs: [
      { id: "basic", name: "Hall Only", price: 2500, description: "Full venue access for your special day." },
      { id: "standard", name: "Hall + Decoration", price: 3500, description: "Venue rental plus premium floral and table decor." },
      { id: "premium", name: "Hall + DJ + Decoration", price: 4500, description: "All-inclusive package with elite DJ and luxury decoration." }
    ],
    availableDates: ["2026-05-15", "2026-05-16", "2026-05-22", "2026-05-23", "2026-06-01"]
  },
  {
    id: 2,
    name: "Ocean View Terrace",
    lat: 35.7595,
    lng: -5.8340,
    city: "Tangier",
    district: "Malabata",
    location: "Malabata Road, Tangier",
    capacity: 200,
    price: 1800,
    rating: 4.9,
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Beautiful outdoor venue with a stunning ocean view. Perfect for summer weddings and sunset ceremonies.",
    amenities: ["Sea View", "Open Air", "Bar", "Mood Lighting", "Security"],
    packs: [
      { id: "basic", name: "Hall Only", price: 1800, description: "Full venue access." },
      { id: "standard", name: "Hall + Decoration", price: 2600, description: "Venue plus seaside-themed decor." },
      { id: "premium", name: "Hall + DJ + Decoration", price: 3400, description: "The ultimate seaside celebration package." }
    ],
    availableDates: ["2026-07-10", "2026-07-11", "2026-07-17", "2026-07-18"]
  },
  {
    id: 3,
    name: "Palais Bahja",
    lat: 31.6295,
    lng: -7.9811,
    city: "Marrakech",
    district: "Medina",
    location: "Medina, Marrakech",
    capacity: 350,
    price: 3200,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1544427928-14299aa12984?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505944270255-bd2b896e7e55?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A historic riad palace in the heart of Marrakech. Experience the authentic soul of Moroccan hospitality.",
    amenities: ["Traditional Decor", "Fountain", "Orange Grove", "Live Music Setup", "Local Catering"],
    packs: [
      { id: "basic", name: "Hall Only", price: 3200, description: "Palace access for your event." },
      { id: "standard", name: "Hall + Decoration", price: 4200, description: "Traditional luxury decoration included." },
      { id: "premium", name: "Hall + DJ + Decoration", price: 5200, description: "Full palace experience with music and decor." }
    ],
    availableDates: ["2026-09-05", "2026-09-06", "2026-09-12", "2026-09-13"]
  },
  {
    id: 4,
    name: "Villa des Roses",
    lat: 33.9716,
    lng: -6.8498,
    city: "Rabat",
    district: "Souissi",
    location: "Souissi, Rabat",
    capacity: 300,
    price: 2200,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An elegant villa in the prestigious Souissi neighborhood. Perfect for sophisticated weddings.",
    amenities: ["Garden", "Swimming Pool", "AC", "Security"],
    packs: [
      { id: "basic", name: "Hall Only", price: 2200, description: "Villa rental." },
      { id: "standard", name: "Hall + Decoration", price: 3000, description: "Villa rental with floral garden decor." },
      { id: "premium", name: "Hall + DJ + Decoration", price: 3800, description: "Premium villa wedding package." }
    ],
    availableDates: ["2026-06-20", "2026-06-21", "2026-06-27", "2026-06-28"]
  },
  {
    id: 5,
    name: "Hivernage Luxury Suite",
    lat: 31.6190,
    lng: -8.0145,
    city: "Marrakech",
    district: "Hivernage",
    location: "Hivernage, Marrakech",
    capacity: 100,
    price: 4500,
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Exclusive suite for high-end boutique weddings.",
    amenities: ["Valet", "Private Chef", "Spa"],
    packs: [
      { id: "basic", name: "Hall Only", price: 4500, description: "Suite rental." },
      { id: "standard", name: "Hall + Decoration", price: 5500, description: "Suite rental with luxury floral decor." },
      { id: "premium", name: "Hall + DJ + Decoration", price: 6500, description: "Ultimate luxury suite package." }
    ],
    availableDates: ["2026-10-10", "2026-10-11", "2026-10-17", "2026-10-18"]
  }
];


export const services = [
  {
    id: 1,
    name: "Elite Traiteur Casa",
    lat: 33.6000,
    lng: -7.6500,
    city: "Casablanca",
    district: "Ain Diab",
    category: "traiteur",
    slug: "traiteur",
    description: "Authentic Moroccan and International cuisine for royal weddings.",
    priceRange: "$20 - $150 per guest",
    rating: 4.9,
    availabilityStatus: "Available",
    icon: "Utensils",
    images: ["https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 2,
    name: "Bahia Negafa",
    lat: 31.6350,
    lng: -8.0050,
    city: "Marrakech",
    district: "Gueliz",
    category: "negafa",
    slug: "negafa",
    description: "Traditional Moroccan bridal styling and luxury Amariya services.",
    priceRange: "$500 - $3000",
    rating: 4.8,
    availabilityStatus: "Limited",
    icon: "Sparkles",
    images: ["https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 3,
    name: "DJ Simo Marrakech",
    lat: 31.6250,
    lng: -7.9950,
    city: "Marrakech",
    district: "Hivernage",
    category: "dj",
    slug: "dj",
    description: "The best wedding DJ in Marrakech with high-end sound and light.",
    priceRange: "$400 - $1200",
    rating: 5.0,
    availabilityStatus: "Available",
    icon: "Music",
    images: ["https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 4,
    name: "Studio Atlas Photography",
    lat: 34.0200,
    lng: -6.8300,
    city: "Rabat",
    district: "Agdal",
    category: "photography",
    slug: "photography",
    description: "Capturing your precious moments with cinematic perfection.",
    priceRange: "$800 - $2500",
    rating: 4.7,
    availabilityStatus: "Available",
    icon: "Camera",
    images: ["https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 5,
    name: "Dakka Marrakchia Al Bahja",
    lat: 31.6300,
    lng: -7.9800,
    city: "Marrakech",
    district: "Medina",
    category: "dakka-marrakchia",
    slug: "dakka-marrakchia",
    description: "Authentic traditional Dakka for an explosive atmosphere.",
    priceRange: "$300 - $800",
    rating: 4.9,
    availabilityStatus: "Available",
    icon: "Drums",
    images: ["https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 6,
    name: "Lina Glam Beauty",
    lat: 35.7700,
    lng: -5.8100,
    city: "Tangier",
    district: "City Center",
    category: "hair-makeup",
    slug: "hair-makeup",
    description: "Professional hair and makeup for modern Moroccan brides.",
    priceRange: "$200 - $600",
    rating: 4.8,
    availabilityStatus: "Booked",
    icon: "Palette",
    images: ["https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80"]
  }
];




