import React from 'react';
import { Navbar } from './Navbar';
import { motion } from 'framer-motion';
interface PageLayoutProps {
  children: React.ReactNode;
  role: 'student' | 'teacher';
  title?: string;
  description?: string;
  action?: React.ReactNode;
}
export function PageLayout({
  children,
  role,
  title,
  description,
  action
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar role={role} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(title || action) &&
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              {title &&
            <h1 className="text-2xl font-bold text-text-primary">
                  {title}
                </h1>
            }
              {description &&
            <p className="text-text-secondary mt-1">{description}</p>
            }
            </div>
            {action && <div>{action}</div>}
          </div>
        }

        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.3
          }}>
          
          {children}
        </motion.div>
      </main>
    </div>);

}