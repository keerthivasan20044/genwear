import React, { useState } from 'react'
import { ChevronDown, ChevronUp, X, Filter, Zap, Layout, IndianRupee } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const FilterSidebar = ({
  filters = {},
  activeFilters = {},
  onFilterChange,
  onClearFilters,
  className = '',
  isMobile = false,
  isOpen = true,
  onClose
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    gender: true,
    price: true
  })

  const [priceRange, setPriceRange] = useState({
    min: activeFilters.minPrice || 0,
    max: activeFilters.maxPrice || 50000
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleFilterChange = (type, value) => {
    onFilterChange({ [type]: value })
  }

  const handlePriceChange = (type, value) => {
    const val = value === '' ? (type === 'min' ? 0 : 50000) : parseFloat(value)
    const newRange = { ...priceRange, [type]: val }
    setPriceRange(newRange)
    onFilterChange({ minPrice: newRange.min, maxPrice: newRange.max })
  }

  const getActiveFilterCount = () => {
    return Object.keys(activeFilters).filter(key =>
      activeFilters[key] && activeFilters[key] !== '' && key !== 'sort'
    ).length
  }

  if (isMobile && !isOpen) return null

  const SectionHeader = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between py-6 group"
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
          <Icon size={14} className="font-bold" />
        </div>
        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-900">{label}</span>
      </div>
      <motion.div
        animate={{ rotate: expandedSections[id] ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown size={16} className="text-gray-400" />
      </motion.div>
    </button>
  )

  return (
    <div className={`space-y-12 select-none ${className}`}>
      {/* Active Selection Header */}
      <div className="flex items-center justify-between pb-8 border-b-2 border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-600 text-white rounded-lg shadow-lg shadow-orange-600/20">
            <Filter size={16} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="flex items-center justify-center w-5 h-5 bg-black text-white text-[9px] font-black rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>

        {getActiveFilterCount() > 0 && (
          <button
            onClick={onClearFilters}
            className="text-[9px] font-black uppercase tracking-widest text-orange-600 hover:text-black transition-colors"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="space-y-2">
        {/* Shop By Gender */}
        <div className="border-b border-gray-100">
          <SectionHeader id="gender" label="Shop By Gender" icon={Zap} />
          <AnimatePresence initial={false}>
            {expandedSections.gender && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pb-6 space-y-3"
              >
                {[
                  { value: 'men', label: 'Men' },
                  { value: 'women', label: 'Women' },
                  { value: 'kids', label: 'Kids' }
                ].map(item => (
                  <button
                    key={item.value}
                    onClick={() => handleFilterChange('gender', activeFilters.gender === item.value ? '' : item.value)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border-2 transition-all duration-300 group
                      ${activeFilters.gender === item.value
                        ? 'border-orange-600 bg-orange-50/50'
                        : 'border-transparent hover:border-gray-100 hover:bg-gray-50'}`}
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors
                      ${activeFilters.gender === item.value ? 'text-orange-600' : 'text-gray-500 group-hover:text-gray-900'}`}>
                      {item.label}
                    </span>
                    {activeFilters.gender === item.value && (
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Collections */}
        <div className="border-b border-gray-100">
          <SectionHeader id="category" label="Collections" icon={Layout} />
          <AnimatePresence initial={false}>
            {expandedSections.category && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pb-6 space-y-2"
              >
                {['shirts', 'jeans', 'pants', 'tshirts', 'jackets', 'activewear', 'dresses', 'wallets', 'watches'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange('category', activeFilters.category === cat ? '' : cat)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all
                      ${activeFilters.category === cat ? 'bg-black text-white shadow-xl translate-x-1' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.15em]">{cat}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range */}
        <div className="border-b border-gray-100">
          <SectionHeader id="price" label="Price Range" icon={IndianRupee} />
          <AnimatePresence initial={false}>
            {expandedSections.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pb-8 px-2"
              >
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="space-y-2">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Min</span>
                    <div className="relative">
                      <input
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-xl px-3 py-3 text-[11px] font-bold text-gray-900 focus:ring-2 focus:ring-orange-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Max</span>
                    <div className="relative">
                      <input
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-xl px-3 py-3 text-[11px] font-bold text-gray-900 focus:ring-2 focus:ring-orange-500"
                        placeholder="50000"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[500, 1000, 2500, 5000].map(price => (
                    <button
                      key={price}
                      onClick={() => {
                        setPriceRange({ min: 0, max: price })
                        onFilterChange({ minPrice: 0, maxPrice: price })
                      }}
                      className="w-full text-left px-4 py-2 text-[10px] font-bold text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                    >
                      Under ₹{price.toLocaleString()}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar