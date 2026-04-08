import React from 'react';
import { motion } from 'framer-motion';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}
export function Card({
  children,
  className = '',
  onClick,
  hoverable = false
}: CardProps) {
  const baseClasses =
  'bg-card rounded-2xl border border-border shadow-soft overflow-hidden';
  const combinedClasses = `${baseClasses} ${className} ${onClick ? 'cursor-pointer' : ''}`;
  if (hoverable || onClick) {
    return (
      <motion.div
        className={combinedClasses}
        onClick={onClick}
        whileHover={{
          y: -4,
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
        }}
        transition={{
          duration: 0.2
        }}>
        
        {children}
      </motion.div>);

  }
  return (
    <div className={combinedClasses} onClick={onClick}>
      {children}
    </div>);

}