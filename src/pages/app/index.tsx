import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import SmartRecommendation from '../../components/SmartRecommendation'

// Professional Icon Component
const Icon = ({ name, className = "w-6 h-6", color = "currentColor" }: { name: string, className?: string, color?: string }) => {
  const icons: Record<string, JSX.Element> = {
    wash: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    clock: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    star: (
      <svg className={className} fill={color} viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    check: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
    qrcode: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    ),
    home: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    user: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    droplet: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    sparkles: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    shield: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    zap: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    camera: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    message: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    trophy: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    bell: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    gift: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    calendar: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    lightning: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    users: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke={color}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  }
  return icons[name] || null
}

// Self-service wash program (only 1 token option)
const washProgram = {
  id: 'standard',
  name: 'Selvvask',
  price: 25,
  time: '3:20',
  timeSeconds: 200,
  icon: 'wash',
  features: ['Højtryksrens', 'Hot Skum', 'Voks', 'Skylning', 'Demi-vand'],
  description: '1 polet = 3 min 20 sek vasketid'
}

// Happy Hour special
const happyHourInfo = {
  days: 'Mandag - Torsdag',
  time: '08:00 - 11:00',
  bonus: '25% ekstra vasketid',
  active: false
}

// Prepaid cards with discounts
const prepaidCards = [
  { value: 500, price: 425, discount: '15%', savings: 75 },
  { value: 1000, price: 800, discount: '20%', savings: 200 },
  { value: 1500, price: 1125, discount: '25%', savings: 375 },
  { value: 2000, price: 1400, discount: '30%', savings: 600 }
]

// Wash halls (4 stationer)
const washStations = [
  { id: 1, name: 'Hal 1', status: 'available', currentUser: null },
  { id: 2, name: 'Hal 2', status: 'available', currentUser: null },
  { id: 3, name: 'Hal 3', status: 'occupied', currentUser: 'I brug' },
  { id: 4, name: 'Hal 4', status: 'available', currentUser: null }
]

// Products for shop
const products = [
  { id: "apc-1l", name: "All Purpose Cleaner", category: "Rengøring", price: 149, badge: "Populær" },
  { id: "insect-500", name: "Insektfjerner", category: "Før vask", price: 129, badge: null },
  { id: "magma-500", name: "Magma Fælgrens", category: "Fælge", price: 199, badge: "Ny" }
]

// Bilpleje services
const careServices = [
  {
    id: 'interior-clean',
    title: 'Indvendig rengøring',
    desc: 'Grundig støvsugning, aftørring og rengøring',
    price: 595,
    duration: '1-2 timer',
    icon: 'sparkles',
    popular: true
  },
  {
    id: 'in-out-clean',
    title: 'Ind & udvendig',
    desc: 'Komplet rengøring inde og ude',
    price: 895,
    duration: '2-3 timer',
    icon: 'wash',
    popular: false
  },
  {
    id: 'extended-detail',
    title: 'Premium detailing',
    desc: 'Dybdegående behandling med lakforsegling',
    price: 1595,
    duration: '4-5 timer',
    icon: 'star',
    popular: false
  },
  {
    id: 'express-wash',
    title: 'Express vask',
    desc: 'Hurtig udvendig håndvask',
    price: 199,
    duration: '30 min',
    icon: 'zap',
    popular: false
  }
]

// Membership tiers - Professional color palette
const membershipTiers = [
  { name: 'Bronze', discount: 5, color: 'from-[#CD7F32] to-[#A0522D]', required: 0 },
  { name: 'Silver', discount: 10, color: 'from-[#C0C0C0] to-[#A8A8A8]', required: 1000 },
  { name: 'Gold', discount: 15, color: 'from-[#FFD700] to-[#DAA520]', required: 3000 },
  { name: 'Platinum', discount: 20, color: 'from-[#E5E4E2] to-[#BCC6CC]', required: 5000 }
]

// Achievements - Expanded
const achievements = [
  { id: 1, title: 'Første vask', desc: 'Gennemfør din første vask', unlocked: true, icon: 'wash', xp: 100 },
  { id: 2, title: 'Loyalitetskunde', desc: 'Nå 1000 point', unlocked: true, icon: 'star', xp: 250 },
  { id: 3, title: 'Vaskekriger', desc: 'Vask 10 gange', unlocked: false, icon: 'trophy', xp: 500 },
  { id: 4, title: 'Anbefal ven', desc: 'Inviter 3 venner', unlocked: false, icon: 'users', xp: 300 },
  { id: 5, title: 'Morgenfugl', desc: 'Vask før kl. 8:00', unlocked: false, icon: 'clock', xp: 200 },
  { id: 6, title: 'Weekend Warrior', desc: 'Vask 5 weekender i træk', unlocked: false, icon: 'zap', xp: 400 },
  { id: 7, title: 'Regnmester', desc: 'Vask på en regnvejrsdag', unlocked: true, icon: 'droplet', xp: 150 },
  { id: 8, title: 'Miljøhelt', desc: 'Eco score over 90', unlocked: false, icon: 'shield', xp: 500 }
]

// Daily Challenges - Rotates daily
const dailyChallenges = [
  { 
    id: 1, 
    title: 'Morgenvask', 
    desc: 'Vask din bil før kl. 10:00', 
    progress: 0, 
    goal: 1, 
    reward: 50, 
    xp: 100,
    icon: 'clock',
    timeLeft: '8t 23m',
    active: true
  },
  { 
    id: 2, 
    title: 'Premium Plus', 
    desc: 'Prøv et premium vaskeprogram', 
    progress: 0, 
    goal: 1, 
    reward: 100, 
    xp: 150,
    icon: 'sparkles',
    timeLeft: '8t 23m',
    active: true
  },
  { 
    id: 3, 
    title: 'Bring en ven', 
    desc: 'Del app\'en med en ven', 
    progress: 1, 
    goal: 3, 
    reward: 200, 
    xp: 300,
    icon: 'gift',
    timeLeft: '8t 23m',
    active: true
  }
]

// User Level System
const userLevel = {
  current: 12,
  xp: 2850,
  xpToNext: 3500,
  title: 'Vaskeentusiast'
}

// Spin-the-Wheel Rewards
const wheelPrizes = [
  { id: 1, label: '50 point', value: 50, color: 'from-[#0066CC] to-[#004C99]', probability: 30 },
  { id: 2, label: '100 point', value: 100, color: 'from-[#00B383] to-[#008A66]', probability: 25 },
  { id: 3, label: 'Gratis vask', value: 'free_wash', color: 'from-[#FFD700] to-[#DAA520]', probability: 10 },
  { id: 4, label: '25 point', value: 25, color: 'from-[#8B5CF6] to-[#EC4899]', probability: 20 },
  { id: 5, label: '200 point', value: 200, color: 'from-[#F59E0B] to-[#D97706]', probability: 10 },
  { id: 6, label: '10% rabat', value: 'discount_10', color: 'from-[#06B6D4] to-[#0066CC]', probability: 5 }
]

// Scratch Card System
const scratchCards = [
  { id: 1, revealed: false, prize: 50, type: 'points' },
  { id: 2, revealed: false, prize: 100, type: 'points' },
  { id: 3, revealed: false, prize: 'free_wash', type: 'service' }
]

const washHistory = [
  { station: 'Hal 1', date: '24. Nov 2024, 14:30', cost: 50, xpEarned: 50 },
  { station: 'Hal 3', date: '22. Nov 2024, 10:15', cost: 75, xpEarned: 75 },
  { station: 'Hal 2', date: '20. Nov 2024, 16:45', cost: 50, xpEarned: 50 },
]

export default function WebApp() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedStation, setSelectedStation] = useState<number | null>(null)
  const [washDuration, setWashDuration] = useState(1)
  const [isScanning, setIsScanning] = useState(false)
  const [loyaltyPoints, setLoyaltyPoints] = useState(3420)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card' | 'loyalty' | 'clip' | null>(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [washInProgress, setWashInProgress] = useState(false)
  const [washTimeRemaining, setWashTimeRemaining] = useState(0)
  const [showWashTimer, setShowWashTimer] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  // Klippekort states
  const [showClipCards, setShowClipCards] = useState(false)
  const [clipBalance, setClipBalance] = useState(0)
  const [selectedClipPurchase, setSelectedClipPurchase] = useState<string | null>(null)
  const clipCardOptions = [
    { id: 'clip5', washes: 5, price: 225, normal: 250, savingPct: 10 },
    { id: 'clip10', washes: 10, price: 430, normal: 500, savingPct: 14 },
    { id: 'clip20', washes: 20, price: 820, normal: 1000, savingPct: 18 }
  ]
  
  // Bilpleje booking states
  const [showBooking, setShowBooking] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [bookingStep, setBookingStep] = useState(1)
  
  // AR Camera states
  const [showARCamera, setShowARCamera] = useState(false)
  const [detectedDamages, setDetectedDamages] = useState<string[]>([])
  
  // Chat assistant states
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{text: string, sender: 'user' | 'bot'}>>([{
    text: 'Hej! Jeg er din AI-assistent. Hvordan kan jeg hjælpe dig i dag? 🚗',
    sender: 'bot'
  }])
  
  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Din vask starter om 5 minutter', read: false, type: 'info' },
    { id: 2, text: 'Du har optjent 50 point! 🎉', read: false, type: 'success' },
    { id: 3, text: '20% rabat på bilpleje denne uge', read: true, type: 'promo' }
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  
  // New Premium Features
  const [showWeather, setShowWeather] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
  const [showQueueStatus, setShowQueueStatus] = useState(false)
  const [showEcoScore, setShowEcoScore] = useState(false)
  const ecoScore = 87 // Out of 100 - based on wash frequency, water usage, eco products
  const [weatherData, setWeatherData] = useState({ temp: 12, condition: 'Delvist skyet', rainChance: 20 })
  const queueTime = '~5 min'
  const peakHours = ['12:00-14:00', '17:00-19:00']
  
  // NEW: Gamification States
  const [showDailyChallenges, setShowDailyChallenges] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [showSpinWheel, setShowSpinWheel] = useState(false)
  const [showScratchCard, setShowScratchCard] = useState(false)
  const [wheelSpinning, setWheelSpinning] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [wheelPrize, setWheelPrize] = useState<any>(null)
  const [scratchProgress, setScratchProgress] = useState<{[key: number]: number}>({})
  const [currentXP, setCurrentXP] = useState(userLevel.xp)
  const [currentLevel, setCurrentLevel] = useState(userLevel.current)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [dailyStreak, setDailyStreak] = useState(7) // Days in a row
  const [showCarProfile, setShowCarProfile] = useState(false)
  const [selectedCar, setSelectedCar] = useState(0)
  const [showFullHistory, setShowFullHistory] = useState(false)
  
  // Car profiles - Multiple vehicles
  const [carProfiles] = useState([
    { 
      id: 1, 
      name: 'Min Tesla Model 3', 
      plate: 'AB 12345', 
      color: 'Pearl White',
      totalWashes: 24,
      lastWash: '2 dage siden',
      nextService: '15. Dec 2024',
      avgWashFreq: '2 gange/måned',
      preferredProgram: 'Premium Plus'
    },
    { 
      id: 2, 
      name: 'BMW X5', 
      plate: 'CD 67890', 
      color: 'Mineral Grey',
      totalWashes: 18,
      lastWash: '5 dage siden',
      nextService: '8. Jan 2025',
      avgWashFreq: '1.5 gange/måned',
      preferredProgram: 'Express vask'
    }
  ])
  
  // Friend leaderboard
  const [friendLeaderboard] = useState([
    { rank: 1, name: 'Dig', points: 3420, washes: 24, avatar: '🥇' },
    { rank: 2, name: 'Anders', points: 3100, washes: 22, avatar: '👨' },
    { rank: 3, name: 'Mette', points: 2850, washes: 19, avatar: '👩' },
    { rank: 4, name: 'Lars', points: 2650, washes: 18, avatar: '🧔' },
    { rank: 5, name: 'Sofia', points: 2400, washes: 16, avatar: '👧' }
  ])
  
  // Membership
  const currentTier = membershipTiers.find((tier, i) => {
    const nextTier = membershipTiers[i + 1]
    return loyaltyPoints >= tier.required && (!nextTier || loyaltyPoints < nextTier.required)
  }) || membershipTiers[0]
  
  // Stats for quick view
  const availableStations = washStations.filter(s => s.status === 'available').length

  // Splash screen and initial loading
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    const timer2 = setTimeout(() => {
      setShowSplash(false)
    }, 2500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  // Load persisted clip balance
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem('clipBalance')
      if (stored) {
        const num = parseInt(stored, 10)
        if (!isNaN(num)) setClipBalance(num)
      }
    } catch (e) {
      // ignore read errors
    }
  }, [])

  // Persist clip balance whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('clipBalance', clipBalance.toString())
    } catch (e) {
      // ignore write errors
    }
  }, [clipBalance])

  // Haptic feedback helper
  const hapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      const patterns = { light: 10, medium: 20, heavy: 30 }
      navigator.vibrate(patterns[type])
    }
  }

  // Pull to refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    hapticFeedback('medium')
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  // Live weather fetch (Open-Meteo) every 15 min
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('/api/weather')
        if (!res.ok) return
        const data = await res.json()
        if (data && data.temp != null) {
          setWeatherData({ temp: data.temp, condition: data.condition, rainChance: data.rainChance })
        }
      } catch (e) {}
    }
    fetchWeather()
    const interval = setInterval(fetchWeather, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Handle payment and auto-start wash
  const handlePayment = async () => {
    if (!selectedStation) {
      alert('Vælg venligst en station først')
      return
    }

    setIsProcessingPayment(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    let cost = washDuration * 25
    const nominalCost = cost
    const usingClip = paymentMethod === 'clip'
    if (usingClip) cost = 0
    const pointsEarned = Math.floor(nominalCost / 10)
    if (paymentMethod === 'loyalty') {
      setLoyaltyPoints(prev => prev - nominalCost + pointsEarned)
    } else if (usingClip) {
      setClipBalance(prev => Math.max(0, prev - 1))
      setLoyaltyPoints(prev => prev + pointsEarned)
      setNotifications(prev => [{
        id: Date.now(),
        text: `Klip brugt – ${clipBalance - 1} klip tilbage`,
        read: false,
        type: 'info'
      }, ...prev])
    } else {
      setLoyaltyPoints(prev => prev + pointsEarned)
    }

    setShowPayment(false)
    setIsProcessingPayment(false)
    setIsScanning(false)

    setWashInProgress(true)
    setWashTimeRemaining(washDuration * 200)
    setShowWashTimer(true)

    const interval = setInterval(() => {
      setWashTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setWashInProgress(false)
          setShowWashTimer(false)
          hapticFeedback('heavy')
          setNotifications(prev => [{
            id: Date.now(),
            text: `🎉 Vask færdig på ${washStations.find(s => s.id === selectedStation)?.name}! Du har optjent ${pointsEarned} point`,
            read: false,
            type: 'success'
          }, ...prev])
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans pb-28 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      <Head>
        <title>WashNGo App</title>
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>

      {/* Pull to refresh indicator */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-xl rounded-full px-4 py-2 shadow-lg border border-slate-200 flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"
            />
            <span className="text-sm font-medium text-slate-700">Opdaterer...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-[600px] left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl opacity-30" />
      </div>

      {/* App Header */}
      <header className="bg-slate-800/90 backdrop-blur-xl border-b border-slate-700 p-6 shadow-sm relative z-10">
        <div className="flex justify-between items-center mb-6">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="relative">
              {/* Animated outer glow */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#0066CC] via-[#06B6D4] to-[#0066CC] rounded-xl blur-md opacity-40"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* 3D depth layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl blur-sm opacity-50 translate-y-0.5" />
              {/* Main logo with metallic gradient */}
              <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-[#E5E4E2] via-white to-[#C0C0C0] flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden">
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                />
                {/* Text with gradient */}
                <span className="text-lg font-black bg-gradient-to-br from-[#004C99] via-[#0066CC] to-[#004C99] bg-clip-text text-transparent relative z-10">WB</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold uppercase tracking-wider text-white">WashNGo</span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">BilCenter</span>
            </div>
          </motion.div>
          <div className="flex items-center gap-3">
            {/* Streak Counter - NEW */}
            <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-full border border-slate-600">
              <div className="text-orange-400">🔥</div>
              <div>
                <div className="text-[10px] text-slate-400 leading-none">Streak</div>
                <div className="text-sm font-bold text-white leading-none">7 dage</div>
              </div>
            </div>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center border border-slate-600 hover:bg-slate-600 transition-colors"
            >
              <Icon name="bell" className="w-6 h-6" color="#e2e8f0" />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-16 right-6 w-80 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 z-50 overflow-hidden">
              <div className="bg-gradient-to-r from-[#0066CC] to-[#004C99] px-4 py-3">
                <h3 className="font-bold text-white">Notifikationer</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notif => (
                  <div 
                    key={notif.id}
                    className={`px-4 py-3 border-b border-slate-700 last:border-0 ${!notif.read ? 'bg-blue-900/30' : 'bg-slate-800'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${!notif.read ? 'bg-blue-400' : 'bg-slate-600'}`} />
                      <div className="flex-1">
                        <p className="text-sm text-slate-200">{notif.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))}
                className="w-full py-2 text-sm text-blue-400 font-bold hover:bg-slate-700 transition-colors"
              >
                Marker alle som læst
              </button>
            </div>
          )}
          </div>
        </div>

        {/* Wash in Progress Banner */}
        {washInProgress && (
          <div className="bg-gradient-to-r from-[#00B383] to-[#008A66] text-white p-4 rounded-2xl border border-[#00B383] shadow-lg mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm">Vask i gang - {washStations.find(s => s.id === selectedStation)?.name}</div>
                <div className="text-xs text-green-100 mt-1">Tid tilbage: {Math.floor(washTimeRemaining / 60)}:{String(washTimeRemaining % 60).padStart(2, '0')}</div>
              </div>
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </div>
            </div>
          </div>
        )}

        {/* Status Card - Only show on Home */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Professional Welcome Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500 rounded-full blur-2xl" />
              </div>
              
              <div className="relative flex items-center justify-between gap-4">
                {/* Text content */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-0.5">Book din næste vask</h2>
                  <p className="text-sm text-slate-400">Vælg program og kom i gang på sekunder</p>
                </div>
                
                {/* Status indicator */}
                <div className="flex items-center gap-2 bg-green-500/10 px-3 py-2 rounded-xl border border-green-500/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Åben</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl rounded-xl p-4 border border-blue-500/20 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-black text-white">{loyaltyPoints}</div>
                  <div className="text-[10px] font-semibold text-blue-300 mt-1 uppercase tracking-wider">Point</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-xl rounded-xl p-4 border border-green-500/20 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-black text-white">{availableStations}</div>
                  <div className="text-[10px] font-semibold text-green-300 mt-1 uppercase tracking-wider">Ledige</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-xl rounded-xl p-4 border border-emerald-500/20 shadow-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                    <span className="text-base font-bold text-white">Åben</span>
                  </div>
                  <div className="text-[10px] font-semibold text-emerald-300 mt-1 uppercase tracking-wider">Status</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main 
        className="px-4 pt-6 space-y-6 relative z-10"
        onTouchStart={(e) => {
          const touch = e.touches[0]
          if (window.scrollY === 0) {
            const startY = touch.clientY
            const handleMove = (moveEvent: TouchEvent) => {
              const currentY = moveEvent.touches[0].clientY
              if (currentY - startY > 100) {
                handleRefresh()
                document.removeEventListener('touchmove', handleMove)
              }
            }
            document.addEventListener('touchmove', handleMove, { once: true })
          }
        }}
      >
        
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <>
            {/* Smart Recommendation */}
            <SmartRecommendation
              weather={weatherData as any}
              washHistory={washHistory as any}
              onSelect={(tokens) => {
                setWashDuration(tokens)
                setNotifications(prev => [{
                  id: Date.now(),
                  text: `Smart anbefaling valgt: ${tokens} poletter sat (ca. ${tokens * 25} kr)`,
                  read: false,
                  type: 'info'
                }, ...prev])
              }}
            />
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button 
                onClick={() => {
                  hapticFeedback('medium')
                  setIsScanning(true)
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden bg-gradient-to-br from-[#0066CC] to-[#004C99] p-6 rounded-2xl shadow-xl border border-blue-400/20 flex flex-col items-center gap-3 group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white bg-white/10 backdrop-blur-sm shadow-lg" 
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon name="qrcode" className="w-7 h-7" />
                </motion.div>
                <div className="text-center relative z-10">
                  <span className="font-bold text-white text-base">Start Vask</span>
                  <p className="text-xs text-blue-100 mt-1">Scan QR-kode</p>
                </div>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { hapticFeedback('light'); setShowClipCards(true); }}
                className="relative overflow-hidden bg-gradient-to-br from-[#00B383] to-[#008A66] p-6 rounded-2xl shadow-xl border border-green-400/20 flex flex-col items-center gap-3 group"
              >
                {clipBalance > 0 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg border-2 border-white/30 z-20">
                    {clipBalance}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white bg-white/10 backdrop-blur-sm shadow-lg" 
                  whileHover={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </motion.div>
                <div className="text-center relative z-10">
                  <span className="font-bold text-white text-base">Klippekort</span>
                  <p className="text-xs text-green-100 mt-1">Spar op til 30%</p>
                </div>
              </motion.button>
            </div>

            {/* AI Features Row */}
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => setShowARCamera(true)}
                className="p-4 rounded-xl shadow-lg flex flex-col items-center gap-2 active:scale-95 transition-all hover:scale-[1.02] hover:shadow-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-400/30"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Icon name="camera" className="w-5 h-5" color="white" />
                </div>
                <span className="font-bold text-white text-[10px]">AR Scan</span>
              </button>
              
              <button
                onClick={() => setShowChat(true)}
                className="p-4 rounded-xl shadow-lg flex flex-col items-center gap-2 active:scale-95 transition-all hover:scale-[1.02] hover:shadow-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-sm border border-cyan-400/30"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Icon name="message" className="w-5 h-5" color="white" />
                </div>
                <span className="font-bold text-white text-[10px]">Chat</span>
              </button>
              
              <button
                onClick={() => {
                  hapticFeedback('medium')
                  setShowCarProfile(true)
                }}
                className="p-4 rounded-xl shadow-lg flex flex-col items-center gap-2 active:scale-95 transition-all hover:scale-[1.02] hover:shadow-xl bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-400/30"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <span className="font-bold text-white text-[10px]">Mine Biler</span>
              </button>
              
              <button
                onClick={() => {
                  hapticFeedback('medium')
                  setShowSpinWheel(true)
                }}
                className="relative p-4 rounded-xl shadow-lg flex flex-col items-center gap-2 active:scale-95 transition-all hover:scale-[1.02] hover:shadow-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur-sm border border-amber-400/30"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon name="gift" className="w-5 h-5" color="white" />
                  </motion.div>
                </div>
                <span className="font-bold text-white text-[10px]">Lykkehjul</span>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white animate-pulse shadow-lg">1</div>
              </button>
            </div>

            {/* NEW: Daily Challenges Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-3xl p-6 border border-slate-600 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                    <Icon name="zap" className="w-5 h-5" color="white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Daglige Challenges</h3>
                    <p className="text-xs text-slate-400">Udløber om {dailyChallenges[0].timeLeft}</p>
                  </div>
                </div>
                <motion.div 
                  className="flex items-center gap-1 bg-gradient-to-r from-[#FFD700] to-[#DAA520] px-3 py-1.5 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon name="trophy" className="w-4 h-4" color="white" />
                  <span className="text-xs font-black text-white">{dailyStreak} dage</span>
                </motion.div>
              </div>

              <div className="space-y-3">
                {dailyChallenges.map((challenge, idx) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-4 border border-slate-700"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#004C99] flex items-center justify-center flex-shrink-0">
                        <Icon name={challenge.icon} className="w-5 h-5" color="white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-white text-sm">{challenge.title}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-[#FFD700]/20 px-2 py-0.5 rounded-full">
                              <Icon name="star" className="w-3 h-3" color="#FFD700" />
                              <span className="text-xs font-bold text-[#FFD700]">+{challenge.reward}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-[#0066CC]/20 px-2 py-0.5 rounded-full">
                              <span className="text-xs font-bold text-[#0066CC]">+{challenge.xp} XP</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mb-3">{challenge.desc}</p>
                        
                        {/* Progress bar */}
                        <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00B383] to-[#008A66] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(challenge.progress / challenge.goal) * 100}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-slate-500">{challenge.progress}/{challenge.goal}</span>
                          {challenge.progress === challenge.goal && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-xs font-bold text-[#00B383]"
                            >
                              Færdig! 🎉
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => setShowDailyChallenges(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white font-bold py-3 rounded-xl shadow-lg"
              >
                Se alle challenges
              </motion.button>
            </motion.div>

            {/* NEW: Level & XP Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 border border-slate-700 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-black text-white">Level {currentLevel}</h3>
                  <p className="text-sm text-slate-400 font-medium">{userLevel.title}</p>
                </div>
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#DAA520] flex items-center justify-center shadow-xl"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-2xl font-black text-white">{currentLevel}</span>
                </motion.div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">XP Progress</span>
                  <span className="text-white font-bold">{currentXP.toLocaleString()} / {userLevel.xpToNext.toLocaleString()}</span>
                </div>
                <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0066CC] via-[#06B6D4] to-[#00B383] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentXP / userLevel.xpToNext) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
                <p className="text-xs text-slate-500 text-center">
                  {userLevel.xpToNext - currentXP} XP til Level {currentLevel + 1}
                </p>
              </div>
            </motion.div>

            {/* NEW: Friend Leaderboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-700 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white text-lg">Vennernes Leaderboard</h3>
                <motion.button
                  onClick={() => setShowLeaderboard(true)}
                  whileHover={{ scale: 1.05 }}
                  className="text-xs text-[#0066CC] font-bold"
                >
                  Se alle →
                </motion.button>
              </div>

              <div className="space-y-2">
                {friendLeaderboard.slice(0, 3).map((friend, idx) => (
                  <motion.div
                    key={friend.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      friend.rank === 1 ? 'bg-gradient-to-r from-[#FFD700]/20 to-[#DAA520]/20 border border-[#FFD700]/30' : 'bg-slate-900/50'
                    }`}
                  >
                    <div className="text-2xl">{friend.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{friend.name}</span>
                        {friend.rank === 1 && <span className="text-xs">👑</span>}
                      </div>
                      <p className="text-xs text-slate-400">{friend.washes} vasker</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#FFD700]">{friend.points.toLocaleString()}</div>
                      <p className="text-xs text-slate-500">point</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Membership Card - Enhanced Professional Design */}
            <motion.div 
              className={`bg-gradient-to-br ${currentTier.color} rounded-3xl p-8 text-white shadow-2xl border-2 border-white/20 relative overflow-hidden`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl" />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-75 mb-2">Medlemsniveau</div>
                    <div className="text-4xl font-black tracking-tight">{currentTier.name}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-xs font-medium opacity-90">Aktiv</span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon name="trophy" className="w-12 h-12" color="white" />
                  </motion.div>
                </div>

                {/* Benefit Card */}
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-lg mb-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider opacity-80 mb-1">Rabat på services</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black">{currentTier.discount}</span>
                        <span className="text-2xl font-bold opacity-90">%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-75 mb-1">Besparelse i år</div>
                      <div className="text-lg font-bold">2.140 kr</div>
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">Fremskridt til næste niveau</span>
                    {membershipTiers[membershipTiers.indexOf(currentTier) + 1] ? (
                      <span className="font-bold">{membershipTiers[membershipTiers.indexOf(currentTier) + 1].name}</span>
                    ) : (
                      <span className="font-bold">Max niveau</span>
                    )}
                  </div>
                  
                  {membershipTiers[membershipTiers.indexOf(currentTier) + 1] && (
                    <>
                      <div className="relative h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-white rounded-full shadow-lg"
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${(loyaltyPoints / membershipTiers[membershipTiers.indexOf(currentTier) + 1].required) * 100}%` 
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="opacity-90">{loyaltyPoints.toLocaleString('da-DK')} point</span>
                        <span className="opacity-75">{membershipTiers[membershipTiers.indexOf(currentTier) + 1].required.toLocaleString('da-DK')} point</span>
                      </div>
                      <div className="text-xs opacity-75 text-center">
                        Endnu {(membershipTiers[membershipTiers.indexOf(currentTier) + 1].required - loyaltyPoints).toLocaleString('da-DK')} point til {membershipTiers[membershipTiers.indexOf(currentTier) + 1].name}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* NEW: Premium Unlimited Subscription Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-6 overflow-hidden border-2 border-purple-500/30 shadow-2xl"
            >
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                      x: ["-100%", "200%"],
                      y: ["0%", "100%", "0%"]
                    }}
                    transition={{
                      duration: 8 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 2
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="text-2xl"
                      >
                        👑
                      </motion.span>
                      <h3 className="text-xl font-black text-white">Premium Unlimited</h3>
                    </div>
                    <p className="text-sm text-purple-200">Ubegrænsede vasker hver måned</p>
                  </div>
                  <div className="px-3 py-1 bg-purple-500/30 rounded-full">
                    <span className="text-xs font-bold text-purple-200">EKSKLUSIVT</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
                    <p className="text-xs text-purple-200 mb-1">Pris</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-white">399</span>
                      <span className="text-sm text-purple-200">kr/md</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
                    <p className="text-xs text-purple-200 mb-1">Du sparer</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-[#00B383]">~40</span>
                      <span className="text-sm text-purple-200">%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {[
                    { icon: '♾️', text: 'Ubegrænsede vasker' },
                    { icon: '⚡', text: 'Spring køen over' },
                    { icon: '🎁', text: '2x point på alt' },
                    { icon: '💎', text: 'Gratis premium services' },
                    { icon: '🎯', text: 'Personlig service manager' }
                  ].map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      className="flex items-center gap-3 text-sm text-white"
                    >
                      <span className="text-lg">{benefit.icon}</span>
                      <span>{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold py-3 rounded-xl shadow-lg relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10">Prøv 14 dage gratis</span>
                </motion.button>

                <p className="text-xs text-center text-purple-300 mt-3">
                  Ingen binding • Opsig når som helst
                </p>
              </div>
            </motion.div>

            {/* Smart Insights Grid - NEW PREMIUM FEATURE */}
            <div className="grid grid-cols-2 gap-3">
              {/* Weather Widget */}
              <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 border border-slate-700 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)' }}>
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Vejr nu</div>
                    <div className="text-sm font-bold text-white">{weatherData.temp}°C</div>
                  </div>
                </div>
                <div className="text-xs text-slate-300">{weatherData.condition}</div>
                <div className="text-[10px] text-slate-400 mt-1">☔ {weatherData.rainChance}% regn</div>
              </div>

              {/* Queue Status Widget */}
              <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 border border-slate-700 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
                    <Icon name="clock" className="w-5 h-5" color="white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Kø status</div>
                    <div className="text-sm font-bold text-white">{queueTime}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-300">{availableStations}/{washStations.length} ledige</div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <div className="text-[10px] text-slate-400">Lav travlhed</div>
                </div>
              </div>

              {/* Eco Score Widget */}
              <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 border border-slate-700 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)' }}>
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Eco Score</div>
                    <div className="text-sm font-bold text-white">{ecoScore}/100</div>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
                  <div className="h-1.5 rounded-full" style={{ width: `${ecoScore}%`, background: 'linear-gradient(90deg, #34D399 0%, #10B981 100%)' }} />
                </div>
                <div className="text-[10px] text-slate-400 mt-1">🌿 Fremragende!</div>
              </div>

              {/* Savings Widget */}
              <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-4 border border-slate-700 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
                    <Icon name="star" className="w-5 h-5" color="white" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Sparet i år</div>
                    <div className="text-sm font-bold text-white">2.140 kr</div>
                  </div>
                </div>
                <div className="text-xs text-slate-300">Via medlemskab</div>
                <div className="text-[10px] text-amber-400 mt-1">💰 +{currentTier.discount}% rabat</div>
              </div>
            </div>

            {/* NEW: Smart Wash Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-[#0066CC] to-[#004C99] rounded-3xl p-6 text-white shadow-xl border-2 border-[#0066CC]/50"
            >
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0"
                >
                  <Icon name="sparkles" className="w-6 h-6" color="white" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Smart anbefaling</h3>
                  <p className="text-sm opacity-90">Baseret på vejr og din vaskhistorik</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-base">Premium Plus Vask</p>
                    <p className="text-xs opacity-80">Perfekt til nuværende vejr</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black">99,-</p>
                    <p className="text-[10px] opacity-75 line-through">120,-</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-white/20 rounded-full text-[10px] font-bold">🌧️ Regn forventet</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-[10px] font-bold">⚡ Voks anbefalet</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-[10px] font-bold">💎 Populært valg</span>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedStation(1)
                      setShowPayment(true)
                      hapticFeedback('medium')
                    }}
                    className="flex-1 bg-white text-[#0066CC] font-bold py-2.5 rounded-xl shadow-lg"
                  >
                    Vælg denne
                  </motion.button>
                  <button className="px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl font-bold transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs opacity-75">
                <span>⏰ Bedste tidspunkt: Nu - kl. 11:00</span>
                <span>🎯 90% match</span>
              </div>
            </motion.div>

            {/* Bilpleje Services */}
            <div>
              <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Icon name="sparkles" className="w-5 h-5" color="#3b82f6" />
                  Bilpleje Services
                </h2>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold">Ny!</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {careServices.map(service => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service)
                      setShowBooking(true)
                      setBookingStep(1)
                    }}
                    className="relative bg-slate-800/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-700 hover:scale-[1.02] transition-all shadow-md hover:shadow-xl hover:border-[#0066CC] text-left overflow-hidden group"
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative z-10">
                      {service.popular && (
                        <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 border border-amber-500/30">
                          <Icon name="star" className="w-3 h-3" color="#fbbf24" />
                          Populær
                        </span>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0066CC 0%, #004C99 100%)' }}>
                          <Icon name={service.icon} className="w-5 h-5" color="white" />
                        </div>
                        <div className="font-bold text-white text-sm">{service.title}</div>
                      </div>
                      <div className="text-xs text-slate-400 mb-3 line-clamp-2">{service.desc}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">{service.price} kr</span>
                        <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">{service.duration}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Station Selector */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4 px-2">Vælg Station</h2>
              <div className="grid grid-cols-2 gap-3">
                {washStations.map((station) => {
                  const isAvailable = station.status === 'available'
                  return (
                    <button
                      key={station.id}
                      onClick={() => setSelectedStation(station.id)}
                      disabled={!isAvailable}
                      className={`relative p-4 rounded-2xl border transition-all backdrop-blur-xl shadow-sm ${
                        selectedStation === station.id
                          ? 'border-blue-500 bg-blue-900/40 scale-[1.02] shadow-md shadow-blue-500/20'
                          : isAvailable
                          ? 'border-slate-700 bg-slate-800/80 hover:border-green-500 hover:scale-[1.02]'
                          : 'border-slate-800 bg-slate-900/50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white">{station.name}</span>
                        <div className="relative">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isAvailable ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          />
                          {isAvailable && (
                            <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isAvailable 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {isAvailable ? 'LEDIG' : 'OPTAGET'}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Wash Program Info */}
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-700 shadow-lg">
              {/* Smart Recommendation Banner */}
              <div className="mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                  <span className="text-xs font-bold text-blue-400">💡 Smart anbefaling</span>
                </div>
                <p className="text-xs text-slate-300">Bedste tidspunkt: <span className="font-bold text-white">Om 2 timer</span></p>
                <p className="text-[10px] text-slate-400 mt-0.5">Færre i kø + bedre vejr</p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Icon name="sparkles" className="w-5 h-5" color="#3b82f6" />
                    Selvvask
                  </h3>
                  <p className="text-sm text-slate-400">1 polet = 3:20 min</p>
                </div>
                <div className="text-3xl font-bold text-white">25,-</div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {washProgram.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs bg-slate-700/50 px-3 py-2 rounded-xl text-slate-300 border border-slate-600">
                    <Icon name="check" className="w-3 h-3" color="#10b981" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => {
                  if (!selectedStation) {
                    alert('Vælg venligst en station først')
                    return
                  }
                  setShowPayment(true)
                }}
                disabled={!selectedStation}
                className={`w-full bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 ${
                  !selectedStation ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Icon name="qrcode" className="w-5 h-5" />
                {selectedStation ? 'Betal & Start' : 'Vælg station først'}
              </button>
            </div>

            {/* Wash Duration Selector */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Icon name="clock" className="w-5 h-5" color="#3b82f6" />
                Vælg vasketid
              </h3>
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => setWashDuration(Math.max(1, washDuration - 1))}
                  className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors active:scale-95 shadow-sm"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                  </svg>
                </button>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#0066CC] to-[#004C99] bg-clip-text text-transparent">{washDuration}</div>
                  <div className="text-sm text-slate-600 mt-1">poletter</div>
                  <div className="text-xs text-blue-600 mt-1 flex items-center justify-center gap-1">
                    <Icon name="clock" className="w-3 h-3" />
                    {washDuration * 3}:20 min
                  </div>
                </div>
                <button 
                  onClick={() => setWashDuration(washDuration + 1)}
                  className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors active:scale-95 shadow-sm"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="text-center bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-4 border border-blue-200">
                <div className="text-3xl font-bold text-slate-900 mb-1">{washDuration * 25} kr</div>
                <div className="text-xs text-slate-600">Total pris</div>
              </div>
            </div>

            {/* Prepaid Cards */}
            <div>
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Icon name="star" className="w-5 h-5" color="#f59e0b" />
                  Klippekort
                </h3>
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold border border-green-200 flex items-center gap-1">
                  <Icon name="zap" className="w-3 h-3" />
                  Op til 30%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {prepaidCards.map((card, i) => (
                  <div
                    key={card.value}
                    className={`bg-white/80 backdrop-blur-xl rounded-2xl p-4 border hover:scale-[1.02] transition-all cursor-pointer shadow-md ${
                      i === 3 ? 'border-[#F59E0B] bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-2">
                      <Icon name="sparkles" className="w-3 h-3" color="#a78bfa" />
                      <span className="text-xs text-purple-600 font-bold">{card.discount} rabat</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{card.value} kr</div>
                    <div className="text-sm text-slate-600 mb-2">Betal {card.price} kr</div>
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full inline-flex items-center gap-1 font-bold border border-green-200">
                      <Icon name="check" className="w-3 h-3" />
                      Spar {card.savings} kr
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Washes */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 px-2">Seneste vaske</h3>
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-slate-200 space-y-3 shadow-md">
                {washHistory.map((wash, i) => (
                  <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                        <Icon name="wash" className="w-5 h-5" color="#3b82f6" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{wash.station}</div>
                        <div className="text-xs text-slate-500">{wash.date}</div>
                      </div>
                    </div>
                    <div className="font-bold text-slate-900">{wash.cost} kr</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* VASK SELV VIEW */}
        {activeTab === 'selfwash' && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-700 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-2">Vask selv</h2>
              <p className="text-slate-400 text-sm">Direkte adgang til station, tid og start</p>
            </div>

            {/* Station Selector (reused) */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3 px-1">Vælg station</h3>
              <div className="grid grid-cols-2 gap-3">
                {washStations.map((station) => {
                  const isAvailable = station.status === 'available'
                  return (
                    <button
                      key={station.id}
                      onClick={() => setSelectedStation(station.id)}
                      disabled={!isAvailable}
                      className={`relative p-4 rounded-2xl border transition-all backdrop-blur-xl shadow-sm text-left $${''}
                        ${selectedStation === station.id
                          ? 'border-blue-500 bg-blue-900/40 scale-[1.02] shadow-md shadow-blue-500/20'
                          : isAvailable
                          ? 'border-slate-700 bg-slate-800/80 hover:border-green-500 hover:scale-[1.02]'
                          : 'border-slate-800 bg-slate-900/50 opacity-50 cursor-not-allowed'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-sm">{station.name}</span>
                        <div className="relative">
                          <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                          {isAvailable && <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />}
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${isAvailable ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                        {isAvailable ? 'LEDIG' : 'OPTAGET'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Wash Program Info (simplified) */}
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Icon name="sparkles" className="w-5 h-5" color="#3b82f6" />
                    Selvvask
                  </h3>
                  <p className="text-xs text-slate-400">1 polet = 3:20 min</p>
                </div>
                <div className="text-3xl font-bold text-white">25,-</div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {washProgram.features.slice(0,4).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] bg-slate-700/50 px-3 py-2 rounded-xl text-slate-300 border border-slate-600">
                    <Icon name="check" className="w-3 h-3" color="#10b981" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => {
                  if (!selectedStation) {
                    alert('Vælg venligst en station først')
                    return
                  }
                  setShowPayment(true)
                }}
                disabled={!selectedStation}
                className={`w-full bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 ${!selectedStation ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] transition-transform'}`}
              >
                <Icon name="qrcode" className="w-5 h-5" />
                {selectedStation ? 'Betal & Start' : 'Vælg station først'}
              </button>
            </div>

            {/* Modern Duration Selector */}
            <div className="relative rounded-3xl p-6 border border-slate-700 shadow-lg overflow-hidden bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
              </div>
              <div className="flex items-center justify-between mb-5 relative z-10">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2 tracking-wide">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30">
                    <Icon name="clock" className="w-4 h-4" color="#3b82f6" />
                  </span>
                  Vasketid (polet)
                </h3>
                <div className="text-right">
                  <div className="text-xs uppercase text-slate-400 tracking-wider">Anslået tid</div>
                  <div className="text-sm font-bold text-white">{(washDuration * 3.33).toFixed(0)} min</div>
                </div>
              </div>

              {/* Circular indicator */}
              <div className="flex items-center gap-6 mb-6 relative z-10">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-24 h-24 rotate-[-90deg]">
                    <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                    <circle cx="50" cy="50" r="42" stroke="url(#gradTokens)" strokeWidth="8" strokeLinecap="round" fill="none"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={`${(1 - washDuration/12) * 2 * Math.PI * 42}`}
                    />
                    <defs>
                      <linearGradient id="gradTokens" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#0066CC" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl font-black text-white leading-none">{washDuration}</div>
                    <div className="text-[10px] uppercase tracking-wider text-blue-300 font-semibold">Polet</div>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <input
                    type="range"
                    min={1}
                    max={12}
                    step={1}
                    value={washDuration}
                    onChange={e => setWashDuration(parseInt(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                    {[1,3,6,9,12].map(m => <span key={m}>{m}</span>)}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Icon name="sparkles" className="w-4 h-4" color="#3b82f6" />
                      <span>Smart anbefaling: <span className="text-white font-bold">{(() => { if (weatherData.rainChance > 70) return 2; if (weatherData.rainChance < 30) return 4; return 3 })()} polet</span></span>
                    </div>
                    <div className="text-xs text-slate-400">Pris ca. {washDuration * 25} kr</div>
                  </div>
                </div>
              </div>

              {/* Presets */}
              <div className="grid grid-cols-6 gap-2 mb-4 relative z-10">
                {[1,2,3,4,6,8].map(val => (
                  <button
                    key={val}
                    onClick={() => setWashDuration(val)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${washDuration === val ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-500 shadow-lg shadow-blue-600/30' : 'bg-slate-900/40 text-slate-300 border-slate-600 hover:border-blue-500 hover:text-white'}`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 relative z-10">
                <span className="flex items-center gap-2"><Icon name="shield" className="w-4 h-4" color="#10b981" /> Optimal vandforbrug</span>
                <span className="flex items-center gap-1"><Icon name="zap" className="w-4 h-4" color="#f59e0b" /> Hurtig afslutning</span>
              </div>
            </div>
          </div>
        )}

        {/* WEBSHOP VIEW */}
        {activeTab === 'webshop' && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-700 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Webshop</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Professionel bilpleje</h2>
              <p className="text-slate-400 text-sm">Køb de samme produkter som de professionelle bruger</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <div key={product.id} className="bg-slate-800/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-700 hover:scale-[1.02] transition-all shadow-md">
                  <div className="mb-3">
                    <div className="text-xs text-blue-400 font-bold uppercase mb-1">{product.category}</div>
                    <div className="font-bold text-white text-sm mb-2">{product.name}</div>
                    <div className="text-lg font-bold text-white">{product.price},-</div>
                  </div>
                  {product.badge && (
                    <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full font-bold border border-purple-500/30">
                      {product.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#0066CC] to-[#004C99] rounded-3xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-2">Besøg vores webshop</h3>
              <p className="text-blue-100 text-sm mb-4">Se hele vores udvalg af professionelle bilplejeprodukter</p>
              <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg w-full">
                Åbn webshop
              </button>
            </div>
          </div>
        )}

        {/* PROFIL VIEW */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-700 text-center shadow-lg">
              <div className="w-20 h-20 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-slate-600">
                <Icon name="user" className="w-10 h-10" color="#cbd5e1" />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">Din Profil</h2>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Icon name="star" className="w-5 h-5" color="#f59e0b" />
                <span className="text-2xl font-bold text-white">{loyaltyPoints}</span>
                <span className="text-slate-400">point</span>
              </div>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-700 shadow-lg">
              <h3 className="font-bold text-white mb-4">Statistik</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total vaske</span>
                  <span className="font-bold text-white">{washHistory.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Favorit hal</span>
                  <span className="font-bold text-white">Hal 1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Medlem siden</span>
                  <span className="font-bold text-white">Nov 2024</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards - NEW */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-800/80 backdrop-blur-xl rounded-xl p-3 border border-slate-700 text-center">
                <div className="text-2xl font-bold text-white mb-1">86%</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Tilfredshed</div>
              </div>
              <div className="bg-slate-800/80 backdrop-blur-xl rounded-xl p-3 border border-slate-700 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">12</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Denne måned</div>
              </div>
              <div className="bg-slate-800/80 backdrop-blur-xl rounded-xl p-3 border border-slate-700 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">#4</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Top kunde</div>
              </div>
            </div>

            {/* Monthly Insights - NEW */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-5 border border-slate-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Månedlig indsigt</h3>
                <span className="text-xs text-slate-400">Nov 2024</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0066CC 0%, #004C99 100%)' }}>
                      <Icon name="droplet" className="w-4 h-4" color="white" />
                    </div>
                    <span className="text-sm text-slate-300">Vaske gennemført</span>
                  </div>
                  <span className="font-bold text-white">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
                      <Icon name="star" className="w-4 h-4" color="white" />
                    </div>
                    <span className="text-sm text-slate-300">Point optjent</span>
                  </div>
                  <span className="font-bold text-white">+340</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }}>
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-300">Sparet med rabat</span>
                  </div>
                  <span className="font-bold text-green-400">287 kr</span>
                </div>
              </div>
            </div>

            {/* Vaskehistorik (kompakt) */}
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-5 border border-slate-700 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Icon name="clock" className="w-5 h-5" color="#cbd5e1" />
                    Vaskehistorik
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{washHistory.length} vasker totalt</p>
                </div>
                <button
                  onClick={() => setShowFullHistory(prev => !prev)}
                  className="text-xs font-bold px-3 py-1 rounded-full border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                >
                  {showFullHistory ? 'Luk' : 'Vis'}
                </button>
              </div>
              {showFullHistory && (
                <div className="mt-4 space-y-2 max-h-48 overflow-y-auto pr-1">
                  {washHistory.map((wash, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-700/40 rounded-xl px-3 py-2 text-xs">
                      <div>
                        <p className="font-bold text-white leading-tight">{wash.station}</p>
                        <p className="text-[10px] text-slate-400">{wash.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">{wash.cost} kr</p>
                        <p className="text-[10px] text-green-400">+{Math.floor(wash.cost / 10)}p</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Achievements Section */}
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-700 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Præstationer</h3>
                <div className="text-sm text-slate-400">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, i) => (
                  <div 
                    key={i}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-yellow-500/50'
                        : 'bg-slate-700/50 border-slate-600 opacity-50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                      achievement.unlocked ? 'bg-yellow-400' : 'bg-slate-600'
                    }`}>
                      <Icon name={achievement.icon as any} className="w-6 h-6" color={achievement.unlocked ? '#78350f' : '#94a3b8'} />
                    </div>
                    <h4 className="font-bold text-sm text-white mb-1">{achievement.title}</h4>
                    <p className="text-xs text-slate-400">{achievement.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Referral Section */}
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-3xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">Inviter venner</h3>
                  <p className="text-sm opacity-90">Få 50 kr per ven</p>
                </div>
                <Icon name="gift" className="w-12 h-12" color="white" />
              </div>
              <div className="bg-white/20 backdrop-blur-xl rounded-xl p-3 mb-3">
                <div className="text-xs opacity-75 mb-1">Din kode</div>
                <div className="font-mono font-bold text-lg">WASH2024</div>
              </div>
              <button 
                onClick={() => {
                  // Copy to clipboard
                  navigator.clipboard.writeText('WASH2024')
                }}
                className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform"
              >
                Del kode
              </button>
            </div>
          </div>
        )}

        {/* SHOP VIEW - Removed */}
        {/* SERVICES VIEW - Removed */}

      </main>

      {/* Floating Action Button (FAB) - Quick Wash */}
      {activeTab === 'home' && !washInProgress && (
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            hapticFeedback('heavy')
            setIsScanning(true)
          }}
          className="fixed bottom-32 right-6 w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#004C99] rounded-full shadow-2xl shadow-blue-500/50 flex items-center justify-center z-40 border-4 border-white"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Icon name="sparkles" className="w-8 h-8" color="white" />
          </motion.div>
        </motion.button>
      )}

      {/* NEW: Achievement Unlock Toast */}
      <AnimatePresence>
        {achievements.filter(a => a.unlocked).length > 0 && Math.random() > 0.95 && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed top-24 right-6 z-[100] max-w-xs"
          >
            <div className="bg-gradient-to-br from-[#FFD700] to-[#DAA520] rounded-2xl p-4 shadow-2xl border-2 border-white/30">
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl"
                >
                  🏆
                </motion.div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-white/90 uppercase tracking-wider mb-1">Achievement Unlocked!</p>
                  <p className="text-sm font-black text-white">Regnmester</p>
                  <p className="text-xs text-white/80 mt-1">+150 XP</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-2xl border-t border-slate-700 px-6 py-4 pb-8 flex justify-between items-center z-50 max-w-md mx-auto shadow-2xl">
        <motion.button 
          onClick={() => {
            hapticFeedback('light')
            setActiveTab('home')
          }}
          whileTap={{ scale: 0.9 }}
          className={`flex flex-col items-center gap-1 transition-colors relative ${
            activeTab === 'home' ? 'text-blue-500' : 'text-slate-500'
          }`}
        >
          {activeTab === 'home' && (
            <motion.div
              layoutId="bottomTab"
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <Icon name="home" className="w-6 h-6" />
          <span className="text-[10px] font-medium">Hjem</span>
        </motion.button>
        
        <motion.button 
          onClick={() => {
            hapticFeedback('light')
            setActiveTab('selfwash')
          }}
          whileTap={{ scale: 0.9 }}
          className={`flex flex-col items-center gap-1 transition-colors relative ${
            activeTab === 'selfwash' ? 'text-blue-500' : 'text-slate-500'
          }`}
        >
          {activeTab === 'selfwash' && (
            <motion.div
              layoutId="bottomTab"
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <Icon name="wash" className="w-6 h-6" />
          <span className="text-[10px] font-medium">Vask selv</span>

                    
        </motion.button>

        <motion.button 
          onClick={() => {
            hapticFeedback('light')
            setActiveTab('webshop')
          }}
          whileTap={{ scale: 0.9 }}
          className={`flex flex-col items-center gap-1 transition-colors relative ${
            activeTab === 'webshop' ? 'text-blue-500' : 'text-slate-500'
          }`}
        >
          {activeTab === 'webshop' && (
            <motion.div
              layoutId="bottomTab"
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-[10px] font-medium">Webshop</span>
        </motion.button>

        <motion.button 
          onClick={() => {
            hapticFeedback('light')
            setActiveTab('profile')
          }}
          whileTap={{ scale: 0.9 }}
          className={`flex flex-col items-center gap-1 transition-colors relative ${
            activeTab === 'profile' ? 'text-blue-500' : 'text-slate-500'
          }`}
        >
          {activeTab === 'profile' && (
            <motion.div
              layoutId="bottomTab"
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <Icon name="user" className="w-6 h-6" />
          <span className="text-[10px] font-medium">Profil</span>
        </motion.button>
      </nav>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-[60] flex flex-col items-center justify-center p-4"
            onClick={() => !isProcessingPayment && setShowPayment(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-700"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Vælg betalingsmetode</h2>
                <p className="text-slate-400 text-sm">Total: {washDuration * 25} kr • {washDuration * 3}:20 min</p>
                <p className="text-green-400 text-xs font-bold mt-1">+ {Math.floor((washDuration * 25) / 10)} loyalty point</p>
              </div>

              <div className="space-y-3 mb-6">
                {/* Apple Pay */}
                <button
                  onClick={() => setPaymentMethod('apple')}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    paymentMethod === 'apple'
                      ? 'border-blue-500 bg-blue-900/30'
                      : 'border-slate-700 hover:border-slate-600 bg-slate-700/50'
                  }`}
                >
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-white">Apple Pay</div>
                    <div className="text-xs text-slate-400">Hurtig og sikker betaling</div>
                  </div>
                  {paymentMethod === 'apple' && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Icon name="check" className="w-4 h-4" color="white" />
                    </div>
                  )}
                </button>

                {/* Credit Card */}
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0066CC] to-[#004C99] rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-white">Kredit/Debit kort</div>
                    <div className="text-xs text-slate-400">Visa, Mastercard, Dankort</div>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Icon name="check" className="w-4 h-4" color="white" />
                    </div>
                  )}
                </button>

                {/* Loyalty Card */}
                <button
                  onClick={() => setPaymentMethod('loyalty')}
                  disabled={loyaltyPoints < washDuration * 25}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    loyaltyPoints < washDuration * 25
                      ? 'opacity-50 cursor-not-allowed border-slate-700 bg-slate-700/50'
                      : paymentMethod === 'loyalty'
                      ? 'border-amber-500 bg-amber-900/30'
                      : 'border-slate-700 hover:border-slate-600 bg-slate-700/50'
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-xl flex items-center justify-center">
                    <Icon name="star" className="w-7 h-7" color="white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-white">Loyalitetskort</div>
                    <div className="text-xs text-slate-400">
                      {loyaltyPoints >= washDuration * 25
                        ? `${loyaltyPoints} point tilgængelige`
                        : `Ikke nok point (${loyaltyPoints}/${washDuration * 25})`
                      }
                    </div>
                  </div>
                  {paymentMethod === 'loyalty' && (
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                      <Icon name="check" className="w-4 h-4" color="white" />
                    </div>
                  )}
                </button>

                {/* Clip Card */}
                {clipBalance > 0 && (
                  <button
                    onClick={() => setPaymentMethod('clip')}
                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                      paymentMethod === 'clip'
                        ? 'border-green-500 bg-green-900/30'
                        : 'border-slate-700 hover:border-slate-600 bg-slate-700/50'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00B383] to-[#008A66] rounded-xl flex items-center justify-center">
                      <Icon name="zap" className="w-7 h-7" color="white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-white">Klippekort</div>
                      <div className="text-xs text-slate-400">{clipBalance} klip tilbage</div>
                    </div>
                    {paymentMethod === 'clip' && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Icon name="check" className="w-4 h-4" color="white" />
                      </div>
                    )}
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => !isProcessingPayment && setShowPayment(false)}
                  disabled={isProcessingPayment}
                  className="flex-1 bg-slate-700 text-slate-200 py-3 rounded-xl font-bold hover:bg-slate-600 transition-colors disabled:opacity-50"
                >
                  Annuller
                </button>
                <button
                  onClick={handlePayment}
                  disabled={!paymentMethod || isProcessingPayment}
                  className="flex-1 bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
                >
                  {isProcessingPayment ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Behandler...
                    </span>
                  ) : (
                    'Betal & Start vask'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBooking && selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowBooking(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Book {selectedService.title}</h2>
                <button onClick={() => setShowBooking(false)} className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {bookingStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-blue-900/30 rounded-2xl p-4 border border-blue-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white">{selectedService.price} kr</span>
                      <span className="text-sm text-slate-400">{selectedService.duration}</span>
                    </div>
                    <p className="text-sm text-slate-300">{selectedService.desc}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-3">Vælg dato</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['I dag', 'I morgen', '3 dage'].map((day, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(day)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            selectedDate === day
                              ? 'border-blue-500 bg-blue-900/30'
                              : 'border-slate-600 hover:border-slate-500 bg-slate-700/50'
                          }`}
                        >
                          <div className="font-bold text-white text-sm">{day}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-3">Vælg tid</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'].map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            selectedTime === time
                              ? 'border-blue-500 bg-blue-900/30'
                              : 'border-slate-600 hover:border-slate-500 bg-slate-700/50'
                          }`}
                        >
                          <div className="font-bold text-white">{time}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (selectedDate && selectedTime) {
                        setBookingStep(2)
                      }
                    }}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
                  >
                    Fortsæt til betaling
                  </button>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-green-900/30 rounded-2xl p-6 text-center border border-green-500/30">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="check" className="w-10 h-10" color="white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Booking bekræftet!</h3>
                    <p className="text-slate-300 mb-4">
                      {selectedService.title} • {selectedDate} kl. {selectedTime}
                    </p>
                    <p className="text-sm text-slate-400">Du modtager en bekræftelse via notifikation</p>
                  </div>

                  <button
                    onClick={() => {
                      setShowBooking(false)
                      setBookingStep(1)
                      setSelectedDate('')
                      setSelectedTime('')
                    }}
                    className="w-full bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-blue-500/30"
                  >
                    Færdig
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AR Camera Modal */}
      <AnimatePresence>
        {showARCamera && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900 z-[60] flex flex-col"
          >
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-pink-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Icon name="camera" className="w-20 h-20 mx-auto mb-4" color="white" />
                    <p className="text-lg font-bold mb-2">AR Skade Scanner</p>
                    <p className="text-sm opacity-75">Scan din bil for at opdage skader</p>
                  </div>
                </div>
              </div>
              
              {detectedDamages.length > 0 && (
                <div className="absolute bottom-20 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-4">
                  <h4 className="font-bold text-slate-900 mb-2">Opdagede skader:</h4>
                  <ul className="space-y-1">
                    {detectedDamages.map((damage, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full" />
                        {damage}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-slate-900 flex gap-3">
              <button
                onClick={() => {
                  setDetectedDamages(['Ridse på venstre dør', 'Lille bule på kofanger', 'Lakskade på motorhjelm'])
                }}
                className="flex-1 bg-purple-500 text-white py-3 rounded-xl font-bold hover:bg-purple-600 transition-colors"
              >
                Scan bil
              </button>
              <button
                onClick={() => {
                  setShowARCamera(false)
                  setDetectedDamages([])
                }}
                className="flex-1 bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20 transition-colors"
              >
                Luk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 bg-slate-900 z-[60] flex flex-col"
          >
            <div className="bg-gradient-to-r from-[#06B6D4] to-[#0066CC] p-6 flex items-center justify-between text-white">
              <div>
                <h3 className="font-bold text-lg">AI Assistent</h3>
                <p className="text-xs opacity-90">Altid klar til at hjælpe</p>
              </div>
              <button onClick={() => setShowChat(false)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-700 text-slate-100 rounded-tl-none shadow-md'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-2">
                {['Hvad koster en vask?', 'Book bilpleje', 'Mine point'].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setChatMessages(prev => [...prev, 
                        { text: suggestion, sender: 'user' },
                        { text: `Lad mig hjælpe dig med det! ${suggestion === 'Hvad koster en vask?' ? 'En selvvask koster 25 kr per 3:20 min.' : suggestion === 'Book bilpleje' ? 'Du kan booke bilpleje direkte fra forsiden 👍' : `Du har ${loyaltyPoints} point!`}`, sender: 'bot' }
                      ])
                    }}
                    className="bg-slate-700 px-4 py-2 rounded-full text-sm font-medium text-slate-200 hover:bg-slate-600 transition-colors shadow-sm border border-slate-600"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Skriv en besked..."
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wash Timer Modal - NEW */}
      <AnimatePresence>
        {showWashTimer && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
          >
            <motion.div 
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700 w-full max-w-md overflow-hidden"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              {/* Header with pulsing animation */}
              <div className="bg-gradient-to-r from-[#00B383] to-[#008A66] px-6 py-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
                <div className="relative">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </div>
                    <h3 className="text-lg font-bold text-white">Vask i gang</h3>
                  </div>
                  <p className="text-sm text-green-100">
                    {washStations.find(s => s.id === selectedStation)?.name}
                  </p>
                </div>
              </div>

              {/* Giant countdown timer */}
              <div className="px-8 py-12 text-center">
                <div className="mb-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC] to-[#6366F1] rounded-full blur-2xl opacity-30 animate-pulse" />
                    <div className="relative">
                      <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] tabular-nums">
                        {Math.floor(washTimeRemaining / 60)}:{String(washTimeRemaining % 60).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center gap-2 text-slate-300">
                    <Icon name="clock" className="w-5 h-5" color="#cbd5e1" />
                    <span className="text-sm">Forløbet tid: {Math.floor((washDuration * 200 - washTimeRemaining) / 60)}:{String((washDuration * 200 - washTimeRemaining) % 60).padStart(2, '0')}</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#34D399] to-[#10B981] rounded-full shadow-lg"
                      initial={{ width: 0 }}
                      animate={{ width: `${((washDuration * 200 - washTimeRemaining) / (washDuration * 200)) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  
                  <div className="text-xs text-slate-400">
                    {Math.round(((washDuration * 200 - washTimeRemaining) / (washDuration * 200)) * 100)}% gennemført
                  </div>
                </div>

                {/* Quick info cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
                    <div className="text-xs text-slate-400 mb-1">Poletter brugt</div>
                    <div className="text-xl font-bold text-white">{washDuration}</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
                    <div className="text-xs text-slate-400 mb-1">Point optjent</div>
                    <div className="text-xl font-bold text-green-400">+{Math.floor(washDuration * 25 / 10)}</div>
                  </div>
                </div>
              </div>

              {/* Footer buttons */}
              <div className="px-6 pb-6 flex gap-3">
                <button
                  onClick={() => setShowWashTimer(false)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl font-bold transition-colors"
                >
                  Minimer
                </button>
                <button
                  onClick={() => {
                    if (confirm('Er du sikker på, at du vil stoppe vasken?')) {
                      setWashInProgress(false)
                      setShowWashTimer(false)
                      setWashTimeRemaining(0)
                    }
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition-colors"
                >
                  Stop vask
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW: Spin the Wheel Modal */}
      <AnimatePresence>
        {showSpinWheel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[90] flex items-center justify-center p-6"
            onClick={() => !wheelSpinning && setShowSpinWheel(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-3xl p-8 max-w-md w-full border-2 border-slate-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black text-white mb-2">Lykkehjulet! 🎰</h3>
                <p className="text-sm text-slate-400">Spin og vind belønninger</p>
              </div>

              {/* Wheel */}
              <div className="relative w-64 h-64 mx-auto mb-6">
                <motion.div
                  className="absolute inset-0 rounded-full shadow-2xl overflow-hidden"
                  animate={{ rotate: wheelRotation }}
                  transition={{ duration: 3, ease: [0.17, 0.67, 0.35, 0.98] }}
                >
                  {wheelPrizes.map((prize, idx) => {
                    const angle = (360 / wheelPrizes.length) * idx
                    return (
                      <div
                        key={prize.id}
                        className={`absolute inset-0 origin-center`}
                        style={{
                          transform: `rotate(${angle}deg)`,
                          clipPath: `polygon(50% 50%, 100% 0%, 100% ${100/wheelPrizes.length}%)`
                        }}
                      >
                        <div className={`w-full h-full bg-gradient-to-r ${prize.color}`} />
                      </div>
                    )
                  })}
                  {/* Prize labels */}
                  {wheelPrizes.map((prize, idx) => {
                    const angle = (360 / wheelPrizes.length) * idx + (360 / wheelPrizes.length / 2)
                    return (
                      <div
                        key={`label-${prize.id}`}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
                        style={{ rotate: `${angle}deg` }}
                      >
                        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center">
                          <span className="text-xs font-black text-white drop-shadow-lg">{prize.label}</span>
                        </div>
                      </div>
                    )
                  })}
                </motion.div>

                {/* Center button */}
                <motion.button
                  onClick={() => {
                    if (!wheelSpinning) {
                      setWheelSpinning(true)
                      hapticFeedback('heavy')
                      const spins = 5 + Math.random() * 3
                      const extraDegrees = Math.random() * 360
                      const totalRotation = wheelRotation + (360 * spins) + extraDegrees
                      setWheelRotation(totalRotation)
                      
                      setTimeout(() => {
                        const prizeIndex = Math.floor((totalRotation % 360) / (360 / wheelPrizes.length))
                        setWheelPrize(wheelPrizes[prizeIndex])
                        setWheelSpinning(false)
                        hapticFeedback('heavy')
                      }, 3000)
                    }
                  }}
                  disabled={wheelSpinning}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD700] to-[#DAA520] shadow-2xl flex items-center justify-center border-4 border-white z-10"
                >
                  <span className="text-2xl font-black text-white">SPIN</span>
                </motion.button>

                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-red-500 drop-shadow-lg" />
                </div>
              </div>

              {/* Prize display */}
              {wheelPrize && !wheelSpinning && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-gradient-to-r from-[#FFD700] to-[#DAA520] rounded-2xl p-4 text-center"
                >
                  <p className="text-sm font-semibold text-white mb-1">Du vandt!</p>
                  <p className="text-2xl font-black text-white">{wheelPrize.label}</p>
                </motion.div>
              )}

              <motion.button
                onClick={() => setShowSpinWheel(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-slate-700 text-white font-bold py-3 rounded-xl"
              >
                {wheelPrize ? 'Indløs præmie' : 'Luk'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW: Car Profile Modal */}
      <AnimatePresence>
        {showCarProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[90] flex items-center justify-center p-6"
            onClick={() => setShowCarProfile(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-slate-900 rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto border-2 border-slate-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700 z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black text-white">Mine Biler</h3>
                  <button
                    onClick={() => setShowCarProfile(false)}
                    className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Car selector */}
                <div className="flex gap-2">
                  {carProfiles.map((car, idx) => (
                    <button
                      key={car.id}
                      onClick={() => setSelectedCar(idx)}
                      className={`flex-1 py-2 px-3 rounded-xl font-bold text-sm transition-all ${
                        selectedCar === idx
                          ? 'bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {car.name.split(' ').slice(-2).join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Car details */}
              <div className="p-6 space-y-6">
                <motion.div
                  key={selectedCar}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {/* Car image placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl mb-6 overflow-hidden border border-slate-600">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl">🚗</div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-2xl font-black text-white mb-1">{carProfiles[selectedCar].name}</h4>
                      <p className="text-slate-400 text-sm">{carProfiles[selectedCar].plate}</p>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <p className="text-slate-400 text-xs mb-1">Total vasker</p>
                      <p className="text-2xl font-black text-white">{carProfiles[selectedCar].totalWashes}</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <p className="text-slate-400 text-xs mb-1">Sidste vask</p>
                      <p className="text-sm font-bold text-white">{carProfiles[selectedCar].lastWash}</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <p className="text-slate-400 text-xs mb-1">Gennemsnit</p>
                      <p className="text-sm font-bold text-white">{carProfiles[selectedCar].avgWashFreq}</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <p className="text-slate-400 text-xs mb-1">Foretrukket</p>
                      <p className="text-xs font-bold text-white">{carProfiles[selectedCar].preferredProgram}</p>
                    </div>
                  </div>

                  {/* Next service reminder */}
                  <div className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <Icon name="calendar" className="w-5 h-5" color="white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-white/80 font-medium">Næste service</p>
                        <p className="text-sm font-black text-white">{carProfiles[selectedCar].nextService}</p>
                      </div>
                      <button className="px-4 py-2 bg-white/20 rounded-xl text-xs font-bold text-white">
                        Book nu
                      </button>
                    </div>
                  </div>

                  {/* Wash history timeline */}
                  <div>
                    <h5 className="text-sm font-bold text-white mb-3">Seneste vasker</h5>
                    <div className="space-y-3">
                      {washHistory.map((wash, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-slate-800 rounded-xl p-3 border border-slate-700">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066CC] to-[#004C99] flex items-center justify-center flex-shrink-0">
                            <Icon name="wash" className="w-4 h-4" color="white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-white">{wash.station}</p>
                            <p className="text-xs text-slate-400">{wash.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-white">{wash.cost} kr</p>
                            <p className="text-xs text-[#00B383]">+{wash.xpEarned} XP</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW: Full Leaderboard Modal */}
      <AnimatePresence>
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[90] flex items-center justify-center p-6"
            onClick={() => setShowLeaderboard(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-slate-900 rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto border-2 border-slate-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-white">Leaderboard</h3>
                    <p className="text-sm text-slate-400">Konkurrér med dine venner</p>
                  </div>
                  <button
                    onClick={() => setShowLeaderboard(false)}
                    className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-3">
                {friendLeaderboard.map((friend, idx) => (
                  <motion.div
                    key={friend.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className={`flex items-center gap-4 p-4 rounded-2xl ${
                      friend.rank === 1 
                        ? 'bg-gradient-to-r from-[#FFD700]/30 to-[#DAA520]/30 border-2 border-[#FFD700]' 
                        : friend.rank <= 3
                        ? 'bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600'
                        : 'bg-slate-800 border border-slate-700'
                    }`}
                  >
                    <div className={`text-2xl font-black ${
                      friend.rank === 1 ? 'text-[#FFD700]' : 
                      friend.rank === 2 ? 'text-[#C0C0C0]' :
                      friend.rank === 3 ? 'text-[#CD7F32]' : 'text-slate-500'
                    }`}>
                      #{friend.rank}
                    </div>
                    <div className="text-3xl">{friend.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{friend.name}</span>
                        {friend.rank === 1 && <span className="text-lg">👑</span>}
                      </div>
                      <p className="text-xs text-slate-400">{friend.washes} vasker</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-[#FFD700]">{friend.points.toLocaleString()}</div>
                      <p className="text-xs text-slate-500">point</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 border-t border-slate-700">
                <button className="w-full bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white font-bold py-3 rounded-xl shadow-lg">
                  Inviter venner
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Klippekort Modal */}
      <AnimatePresence>
        {showClipCards && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[90] flex items-center justify-center p-6"
            onClick={() => setShowClipCards(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border-2 border-slate-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-white">Klippekort</h3>
                  <p className="text-sm text-slate-400">Spar op til 18% på vasker</p>
                </div>
                <button
                  onClick={() => setShowClipCards(false)}
                  className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6 bg-gradient-to-r from-[#00B383] to-[#008A66] rounded-2xl p-4 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Dine klip</p>
                  <p className="text-4xl font-black">{clipBalance}</p>
                </div>
                <div className="text-right text-xs opacity-80">
                  {clipBalance > 0 ? 'Klar til vask' : 'Køb klip og spar'}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {clipCardOptions.map((option, idx) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedClipPurchase(option.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className={`w-full text-left p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                      selectedClipPurchase === option.id
                        ? 'border-green-500 bg-green-900/30'
                        : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B383] to-[#008A66] flex items-center justify-center text-white font-black text-lg">
                      {option.washes}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white">{option.washes} vasker</span>
                        <span className="text-xs font-bold text-green-400">Spar {option.savingPct}%</span>
                      </div>
                      <div className="text-xs text-slate-400">{option.price} kr (normal {option.normal} kr)</div>
                    </div>
                    {selectedClipPurchase === option.id && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Icon name="check" className="w-4 h-4" color="white" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="space-y-3">
                <motion.button
                  disabled={!selectedClipPurchase}
                  whileHover={{ scale: selectedClipPurchase ? 1.02 : 1 }}
                  whileTap={{ scale: selectedClipPurchase ? 0.97 : 1 }}
                  onClick={() => {
                    if (!selectedClipPurchase) return
                    const opt = clipCardOptions.find(o => o.id === selectedClipPurchase)
                    if (!opt) return
                    setClipBalance(prev => prev + opt.washes)
                    setSelectedClipPurchase(null)
                    hapticFeedback('medium')
                    setNotifications(prev => [{
                      id: Date.now(),
                      text: `Køb bekræftet: +${opt.washes} klip tilføjet`,
                      read: false,
                      type: 'success'
                    }, ...prev])
                  }}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-[#00B383] to-[#008A66] transition-opacity ${
                    selectedClipPurchase ? '' : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  Køb valgt klippekort
                </motion.button>
                {clipBalance > 0 && (
                  <button
                    onClick={() => {
                      setShowClipCards(false)
                      setPaymentMethod('clip')
                      setShowPayment(true)
                      hapticFeedback('light')
                    }}
                    className="w-full py-3 rounded-xl font-bold text-[#00B383] bg-slate-800 border border-[#00B383]/40 hover:bg-slate-700 transition-colors"
                  >
                    Brug klip til vask
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Scanner Modal - NEW */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[80] flex flex-col"
          >
            {/* Scanner UI */}
            <div className="flex-1 relative overflow-hidden">
              {/* Camera simulation */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-1/4 left-0 right-0 h-px bg-white animate-pulse" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-3/4 left-0 right-0 h-px bg-white animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </div>

              {/* Scanning frame */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full max-w-xs aspect-square">
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-blue-400 rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-blue-400 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-blue-400 rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-blue-400 rounded-br-2xl" />
                  
                  {/* Scanning line */}
                  <motion.div
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-lg shadow-blue-500/50"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>

              {/* Instructions */}
              <div className="absolute bottom-32 left-0 right-0 text-center px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
                    <p className="text-white font-medium mb-2">Scan QR-kode på vaskehallen</p>
                    <p className="text-sm text-white/70">Placer koden inden for rammen</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Controls */}
            <div className="p-6 bg-slate-900 border-t border-slate-700">
              <div className="flex gap-3">
                <motion.button
                  onClick={() => {
                    hapticFeedback('heavy')
                    setIsScanning(false)
                    setShowPayment(true)
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/30"
                >
                  Simuler scan
                </motion.button>
                <motion.button
                  onClick={() => {
                    hapticFeedback('light')
                    setIsScanning(false)
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold transition-colors"
                >
                  Luk
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Splash Screen - NEW */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-[100] flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="relative inline-block mb-6">
                  {/* Pulsing multi-layer glow */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-[#0066CC] via-[#06B6D4] to-[#0066CC] rounded-3xl blur-3xl opacity-50"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.7, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-[#FFD700] via-[#DAA520] to-[#FFD700] rounded-3xl blur-2xl opacity-30"
                    animate={{ 
                      scale: [1.2, 1, 1.2],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {/* 3D depth layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-600 rounded-3xl blur-md opacity-60 translate-y-1" />
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-500 rounded-3xl blur-sm opacity-40 translate-y-0.5" />
                  {/* Main logo with premium metallic gradient */}
                  <div className="relative h-24 w-24 rounded-3xl bg-gradient-to-br from-[#E5E4E2] via-white to-[#C0C0C0] flex items-center justify-center shadow-2xl border-2 border-white/30 overflow-hidden">
                    {/* Rotating shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
                      animate={{ 
                        x: ["-100%", "200%"],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    />
                    {/* Subtle radial glow from center */}
                    <div className="absolute inset-0 bg-radial-gradient from-white/20 via-transparent to-transparent" />
                    {/* Text with premium gradient */}
                    <span className="text-4xl font-black bg-gradient-to-br from-[#004C99] via-[#0066CC] to-[#006699] bg-clip-text text-transparent relative z-10">WB</span>
                  </div>
                </div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h1 className="text-3xl font-bold uppercase tracking-wider text-white mb-2">WashNGo</h1>
                  <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">BilCenter</p>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="mt-8 flex justify-center"
                    >
                      <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#0066CC] to-[#06B6D4] rounded-full"
                          initial={{ x: "-100%" }}
                          animate={{ x: "200%" }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
