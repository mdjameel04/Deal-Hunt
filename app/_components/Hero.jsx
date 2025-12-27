import { Bell, Rabbit, Shield, TrendingDown } from 'lucide-react';
import React from 'react'
import AddProductFrom from './AddProductFrom';
import { createClient } from '@/utils/supabase/server';

const Hero = async() => {
  const supabase= await createClient()
  const {
    data : {user},
  } = await supabase.auth.getUser() ;

const products = []

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
         <AddProductFrom/>
         {/* featuers */}
         {products.length==0 && (
          <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16'>
         {FEATURES.map(({icon:Icon, title,description})=>(
          <div className='bg-white p-6 rounded-xl border border-gray-200 ' 
           key={title}>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
          </div>
         ))}
          </div>
         )}
  </div>
   
   {user && products.length==0 && (
    <div className='bg-white rounded-xl border-2 border-dashed border-gray-300 p-12'>
 <TrendingDown className='w-16 h-16 text-gray-400 mx-auto mb-4'/>
 <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600">
              Add your first product above to start tracking prices!
            </p>

    </div>
   )}
     


    </section>
  ) 
}

export default Hero