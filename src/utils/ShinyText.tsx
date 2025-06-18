import React from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
    color?: string;
    orbit?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, orbit=0 , className= ""}) => {
    const animationDuration = `${speed}s`;

    return (
        <>
        {orbit?( <div
            className={`text-transparent bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
            style={{
                backgroundImage: 'linear-gradient(120deg, rgba(139, 92, 246, 1) 40%, rgba(255, 255, 255, 1) 50%, rgba(139, 92, 246, 1) 60%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              animationDuration: animationDuration,
            }}
          >
            {text}
          </div>):(<></>)}
       </>
    );
};

export default ShinyText;

