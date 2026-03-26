import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon, ArrowRight, ArrowLeft, Check, Package, MapPin, Clock,
  FileText, Book, Box, Hammer, Circle, Zap, Droplets, Recycle,
  Thermometer, RotateCcw, Monitor, Laptop
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SCRAP_TYPES = [
  { name: "Newspaper", category: "paper", icon: FileText },
  { name: "Books/Copies", category: "paper", icon: Book },
  { name: "Cardboard", category: "paper", icon: Box },
  { name: "Iron", category: "metal", icon: Hammer },
  { name: "Aluminium", category: "metal", icon: Circle },
  { name: "Copper", category: "metal", icon: Zap },
  { name: "Plastic Bottles", category: "plastic", icon: Droplets },
  { name: "Hard Plastic", category: "plastic", icon: Recycle },
  { name: "AC", category: "ewaste", icon: Thermometer },
  { name: "Washing Machine", category: "ewaste", icon: RotateCcw },
  { name: "TV", category: "ewaste", icon: Monitor },
  { name: "Laptop", category: "ewaste", icon: Laptop },
];

const TIME_SLOTS = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [weights, setWeights] = useState({});
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState("");
  const [contact, setContact] = useState({
    name: "", phone: "", email: "", address: "", city: "", pincode: "", notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const navigate = useNavigate();

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const toggleType = (name) => {
    setSelectedTypes(prev =>
      prev.includes(name) ? prev.filter(t => t !== name) : [...prev, name]
    );
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedTypes.length > 0;
      case 2: return selectedTypes.every(t => weights[t] && parseFloat(weights[t]) > 0);
      case 3: return date && time;
      case 4: return contact.name && contact.phone && contact.address && contact.city && contact.pincode;
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        name: contact.name,
        phone: contact.phone,
        email: contact.email || null,
        address: contact.address,
        city: contact.city,
        pincode: contact.pincode,
        scrap_items: selectedTypes.map(t => ({
          type: t,
          estimated_weight: parseFloat(weights[t])
        })),
        preferred_date: format(date, 'yyyy-MM-dd'),
        preferred_time: time,
        notes: contact.notes || null,
      };
      const res = await axios.post(`${API}/bookings`, payload);
      setBookingResult(res.data);
      setStep(6);
      toast.success("Booking confirmed! Aapki booking ho gayi hai.");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedTypes([]);
    setWeights({});
    setDate(undefined);
    setTime("");
    setContact({ name: "", phone: "", email: "", address: "", city: "", pincode: "", notes: "" });
    setBookingResult(null);
  };

  return (
    <div className="bg-praxeti min-h-screen py-20 md:py-28" data-testid="booking-page">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            Book <span className="text-mantis">Pickup</span>
          </h1>
          <p className="text-[#525252] mt-2">Kabad bechna hua aasan - Grab the Scrap!</p>
        </motion.div>

        {/* Progress */}
        {step <= 5 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#525252]">Step {step} of {totalSteps}</span>
              <span className="text-sm font-medium text-mantis">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-mantis/10 [&>div]:bg-mantis" data-testid="booking-progress" />
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Select Scrap Types */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="font-heading text-2xl font-bold text-[#1A1A1A] mb-2">Kya bechna hai?</h2>
              <p className="text-[#525252] text-sm mb-6">Select the types of scrap you want to sell</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SCRAP_TYPES.map(type => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.name}
                      data-testid={`scrap-type-${type.name.toLowerCase().replace(/[\s\/]/g, '-')}`}
                      onClick={() => toggleType(type.name)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedTypes.includes(type.name)
                          ? 'border-mantis bg-mantis/5 ring-2 ring-mantis/20'
                          : 'border-black/5 bg-white hover:border-mantis/30'
                      }`}
                    >
                      <div className="w-10 h-10 bg-mantis/10 rounded-lg flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-mantis" />
                      </div>
                      <span className="text-sm font-medium text-[#1A1A1A] block">{type.name}</span>
                      <Badge variant="secondary" className="mt-1.5 text-xs">{type.category}</Badge>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Enter Weights */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="font-heading text-2xl font-bold text-[#1A1A1A] mb-2">Kitna hai approximately?</h2>
              <p className="text-[#525252] text-sm mb-6">Enter estimated weight for each item (in KG)</p>
              <div className="space-y-3">
                {selectedTypes.map(type => (
                  <div key={type} className="bg-white rounded-xl border border-black/5 p-4 flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-[#1A1A1A] text-sm">{type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0.5"
                        step="0.5"
                        placeholder="0"
                        data-testid={`weight-${type.toLowerCase().replace(/[\s\/]/g, '-')}`}
                        value={weights[type] || ""}
                        onChange={e => setWeights(prev => ({ ...prev, [type]: e.target.value }))}
                        className="w-20 h-10 text-center border border-black/10 rounded-lg focus:border-mantis focus:ring-2 focus:ring-mantis/10 outline-none text-sm"
                      />
                      <span className="text-sm text-[#A3A3A3]">KG</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="font-heading text-2xl font-bold text-[#1A1A1A] mb-2">Kab aayein?</h2>
              <p className="text-[#525252] text-sm mb-6">Pick a date and time slot for pickup</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-black/5 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarIcon className="w-4 h-4 text-mantis" />
                    <span className="text-sm font-medium text-[#1A1A1A]">Select Date</span>
                  </div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                    classNames={{
                      day_selected: "bg-[#74C365] text-white hover:bg-[#74C365] hover:text-white focus:bg-[#74C365] focus:text-white",
                      day_today: "bg-[#74C365]/10 text-[#74C365] font-bold",
                    }}
                  />
                </div>
                <div className="bg-white rounded-2xl border border-black/5 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-mantis" />
                    <span className="text-sm font-medium text-[#1A1A1A]">Select Time Slot</span>
                  </div>
                  <div className="space-y-3">
                    {TIME_SLOTS.map(slot => (
                      <button
                        key={slot}
                        data-testid={`time-slot-${slot.replace(/[\s:]/g, '-')}`}
                        onClick={() => setTime(slot)}
                        className={`w-full p-3 rounded-xl text-sm font-medium text-left transition-all ${
                          time === slot
                            ? 'bg-mantis text-white'
                            : 'bg-praxeti text-[#1A1A1A] hover:bg-mantis/10'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Contact & Address */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="font-heading text-2xl font-bold text-[#1A1A1A] mb-2">Aapki Details</h2>
              <p className="text-[#525252] text-sm mb-6">Where should we come for pickup?</p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">Name *</label>
                    <input
                      data-testid="booking-name"
                      value={contact.name}
                      onChange={e => setContact(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full h-12 px-4 border border-black/10 rounded-xl focus:border-mantis focus:ring-4 focus:ring-mantis/10 outline-none bg-white"
                      placeholder="Aapka naam"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">Phone *</label>
                    <input
                      data-testid="booking-phone"
                      type="tel"
                      value={contact.phone}
                      onChange={e => setContact(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full h-12 px-4 border border-black/10 rounded-xl focus:border-mantis focus:ring-4 focus:ring-mantis/10 outline-none bg-white"
                      placeholder="9876543210"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">Email (Optional)</label>
                  <input
                    data-testid="booking-email"
                    type="email"
                    value={contact.email}
                    onChange={e => setContact(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full h-12 px-4 border border-black/10 rounded-xl focus:border-mantis focus:ring-4 focus:ring-mantis/10 outline-none bg-white"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">Full Address *</label>
                  <textarea
                    data-testid="booking-address"
                    value={contact.address}
                    onChange={e => setContact(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-black/10 rounded-xl focus:border-mantis focus:ring-4 focus:ring-mantis/10 outline-none bg-white resize-none"
                    placeholder="Flat no, building, street..."
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">City *</label>
                    <input
                      data-testid="booking-city"
                      value={contact.city}
                      onChange={e => setContact(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full h-12 px-4 border border-black/10 rounded-xl focus:border-mantis focus:ring-4 focus:ring-mantis/10 outline-none bg-white"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">Pincode *</label>
                    <input
                      data-testid="booking-pincode"
                      value={contact.pincode}
                      onChange={e => setContact(prev => ({ ...prev, pincode: e.target.value }))}
                      className="w-full h-12 px-4 border border-black/10 rounded-xl focus:border-mantis focus:ring-4 focus:ring-mantis/10 outline-none bg-white"
                      placeholder="400001"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1A1A1A] mb-1.5 block">Notes (Optional)</label>
                  <input
                    data-testid="booking-notes"
                    value={contact.notes}
                    onChange={e => setContact(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full h-12 px-4 border border-black/10 rounded-xl focus:border-mantis focus:ring-4 focus:ring-mantis/10 outline-none bg-white"
                    placeholder="Any special instructions..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="font-heading text-2xl font-bold text-[#1A1A1A] mb-2">Review & Confirm</h2>
              <p className="text-[#525252] text-sm mb-6">Ek baar check kar lo sab sahi hai</p>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-black/5 p-6">
                  <h3 className="font-heading font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-mantis" /> Scrap Items
                  </h3>
                  <div className="space-y-2">
                    {selectedTypes.map(type => (
                      <div key={type} className="flex justify-between text-sm py-1.5 border-b border-black/5 last:border-0">
                        <span className="text-[#525252]">{type}</span>
                        <span className="font-medium text-[#1A1A1A]">{weights[type]} KG</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-black/5 p-6">
                  <h3 className="font-heading font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-mantis" /> Pickup Schedule
                  </h3>
                  <p className="text-sm text-[#525252]">{date ? format(date, 'PPP') : '-'}</p>
                  <p className="text-sm text-[#525252] mt-1">{time}</p>
                </div>
                <div className="bg-white rounded-2xl border border-black/5 p-6">
                  <h3 className="font-heading font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-mantis" /> Pickup Address
                  </h3>
                  <p className="text-sm text-[#1A1A1A] font-medium">{contact.name}</p>
                  <p className="text-sm text-[#525252]">{contact.phone}</p>
                  <p className="text-sm text-[#525252]">{contact.address}</p>
                  <p className="text-sm text-[#525252]">{contact.city} - {contact.pincode}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 6: Success */}
          {step === 6 && bookingResult && (
            <motion.div key="step6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="w-20 h-20 bg-mantis/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-mantis" />
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2">Booking Confirmed!</h2>
              <p className="text-[#525252] mb-6">Aapki booking ho gayi hai. Hum aapke paas aayenge!</p>
              <div className="bg-white rounded-2xl border border-black/5 p-6 max-w-md mx-auto mb-8">
                <p className="text-sm text-[#A3A3A3] mb-1">Booking ID</p>
                <p className="text-2xl font-heading font-bold text-mantis" data-testid="booking-id">{bookingResult.id}</p>
                <p className="text-sm text-[#525252] mt-2">Estimated Amount: <span className="font-semibold text-[#1A1A1A]">Rs {bookingResult.estimated_amount}</span></p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  data-testid="track-booking-btn"
                  onClick={() => navigate(`/track?id=${bookingResult.id}`)}
                  className="bg-mantis hover:bg-book-green text-white rounded-full px-8 py-3 font-semibold transition-all"
                >
                  Track Booking
                </button>
                <button
                  data-testid="new-booking-btn"
                  onClick={resetForm}
                  className="bg-white border-2 border-mantis text-mantis rounded-full px-8 py-3 font-semibold transition-all hover:bg-mantis/5"
                >
                  New Booking
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step <= 5 && (
          <div className="flex justify-between mt-10">
            {step > 1 ? (
              <button
                data-testid="booking-back-btn"
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 text-[#525252] hover:text-[#1A1A1A] font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                data-testid="booking-next-btn"
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                className={`flex items-center gap-2 font-semibold rounded-full px-8 py-3 transition-all ${
                  canProceed()
                    ? 'bg-mantis hover:bg-book-green text-white shadow-lg shadow-mantis/20'
                    : 'bg-black/5 text-[#A3A3A3] cursor-not-allowed'
                }`}
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <motion.button
                data-testid="booking-confirm-btn"
                onClick={handleSubmit}
                disabled={submitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-2 font-semibold rounded-full px-8 py-3 bg-mantis hover:bg-book-green text-white shadow-lg shadow-mantis/20 transition-all disabled:opacity-50"
              >
                <span className="absolute inset-0 rounded-full bg-mantis/30 animate-pulse-ring" />
                <span className="relative">{submitting ? "Confirming..." : "Confirm Booking"}</span>
                <Check className="w-4 h-4 relative" />
              </motion.button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
