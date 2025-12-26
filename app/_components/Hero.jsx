import { Bell, Rabbit, Shield } from 'lucide-react';
import React from 'react'

const Hero = () => {
     const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return (
    <section className='py-20 px-4'>
  <div className='text-center max-w-7xl mx-auto'>
      <h5 className='inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6  py-2 rounded-full text-sm font-medium mb-6'> Made with 💖 by jameel </h5>
{/* Never miss a price Drop */}
      <h2 className='text-5xl font-bold text-gray-900 mb-4 tracking-tight'> Catch price drops instantly  </h2>

      <p className=' text-xl text-gray-600 mb-12 max-w-2xl mx-auto'> Track prices from any e-commerce site. Get instant alerts when
            prices drop. Save money effortlessly.  </p>

        {/* text area */}
         
         {/* featuers */}
  </div>
    </section>
  ) 
}

export default Hero