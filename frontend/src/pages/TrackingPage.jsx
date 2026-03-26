import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const statusLabels = {
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700 border-amber-200" },
  confirmed: { label: "Confirmed", color: "bg-blue-100 text-blue-700 border-blue-200" },
  assigned: { label: "Agent Assigned", color: "bg-purple-100 text-purple-700 border-purple-200" },
  on_the_way: { label: "On The Way", color: "bg-mantis/10 text-mantis border-mantis/20" },
  picking_up: { label: "Picking Up", color: "bg-mantis/20 text-book-green border-mantis/30" },
  completed: { label: "Completed", color: "bg-mantis text-white border-mantis" },
};

export default function TrackingPage() {
  const [searchParams] = useSearchParams();
  const [searchId, setSearchId] = useState(searchParams.get("id") || "");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (id) => {
    const searchVal = id || searchId;
    if (!searchVal.trim()) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const res = await axios.get(`${API}/bookings/${searchVal.trim()}`);
      setBooking(res.data);
    } catch {
      setError("Booking not found. Please check the ID and try again.");
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setSearchId(id);
      handleSearch(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-praxeti min-h-screen py-20 md:py-28" data-testid="tracking-page">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4">
            Track Your <span className="text-mantis">Pickup</span>
          </h1>
          <p className="text-[#525252]">Booking ID daalo aur status dekho</p>
        </motion.div>

        <div className="flex gap-3 mb-8">
          <input
            data-testid="track-search-input"
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className="flex-1 h-14 px-6 border border-black/10 rounded-full focus:border-mantis focus:ring-4 focus:ring-mantis/10 outline-none bg-white text-lg"
            placeholder="Enter Booking ID..."
          />
          <button
            data-testid="track-search-btn"
            onClick={() => handleSearch()}
            disabled={loading}
            className="h-14 px-6 bg-mantis hover:bg-book-green text-white rounded-full font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline">Track</span>
          </button>
        </div>

        {loading && <div className="text-center py-12 text-[#A3A3A3]">Searching...</div>}

        {error && searched && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
            <p className="text-red-600 text-sm">{error}</p>
          </motion.div>
        )}

        {booking && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Booking Header */}
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-[#A3A3A3]">Booking ID</p>
                  <p className="text-xl font-heading font-bold text-[#1A1A1A]" data-testid="tracking-booking-id">{booking.id}</p>
                </div>
                <Badge className={statusLabels[booking.status]?.color || "bg-gray-100 text-gray-700 border-gray-200"}>
                  {statusLabels[booking.status]?.label || booking.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-[#A3A3A3] mb-0.5">Name</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{booking.name}</p>
                </div>
                <div>
                  <p className="text-xs text-[#A3A3A3] mb-0.5">Phone</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{booking.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-[#A3A3A3] mb-0.5">Date</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{booking.preferred_date}</p>
                </div>
                <div>
                  <p className="text-xs text-[#A3A3A3] mb-0.5">Time</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{booking.preferred_time}</p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <h3 className="font-heading font-semibold text-[#1A1A1A] mb-3">Items</h3>
              <div className="space-y-2">
                {booking.scrap_items?.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-2 border-b border-black/5 last:border-0">
                    <span className="text-[#525252]">{item.type}</span>
                    <span className="font-medium text-[#1A1A1A]">{item.estimated_weight} KG x Rs {item.price_per_kg}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3 font-semibold">
                  <span className="text-[#1A1A1A]">Estimated Total</span>
                  <span className="text-mantis text-lg">Rs {booking.estimated_amount}</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <h3 className="font-heading font-semibold text-[#1A1A1A] mb-3">Address</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-mantis mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-[#1A1A1A]">{booking.address}</p>
                  <p className="text-sm text-[#525252]">{booking.city} - {booking.pincode}</p>
                </div>
              </div>
            </div>

            {/* Status History */}
            {booking.status_history && booking.status_history.length > 0 && (
              <div className="bg-white rounded-2xl border border-black/5 p-6">
                <h3 className="font-heading font-semibold text-[#1A1A1A] mb-3">Status History</h3>
                <div className="space-y-3">
                  {booking.status_history.map((entry, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-mantis/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-mantis" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1A1A1A] capitalize">{entry.status}</p>
                        <p className="text-xs text-[#A3A3A3]">{entry.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
