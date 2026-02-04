import React from 'react';
import Image from 'next/image';

interface AboutUsProps {
  text: string;
  image_url: string;
}

const AboutUs: React.FC<AboutUsProps> = ({ text, image_url }) => {
  return (
    <section id="about" className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className="order-2 md:order-1 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Our Story</h2>
        <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
          {text}
        </p>
      </div>
      <div className="order-1 md:order-2 relative w-full aspect-[4/3]">
        <Image
          src={image_url}
          alt="About Wilsons Seafoods"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="rounded-xl shadow-lg object-cover"
        />
      </div>
    </section>
  );
};

export default AboutUs;