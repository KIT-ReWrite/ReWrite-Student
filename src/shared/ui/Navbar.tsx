import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Home,
  Book,
  FileText,
  BarChart2,
  Calendar,
  Users,
  PlusCircle,
  Menu,
  X,
  LogOut } from
'lucide-react';
import { currentUser, currentTeacher } from '../../data/mockData';
interface NavbarProps {
  role: 'student' | 'teacher';
}
export function Navbar({ role }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = role === 'student' ? currentUser : currentTeacher;
  const basePath = role === 'student' ? '' : '/teacher';
  const studentLinks = [
  {
    path: '/',
    label: '홈',
    icon: Home
  },
  {
    path: '/classes',
    label: '내 학급',
    icon: Book
  },
  {
    path: '/assignments',
    label: '과제 목록',
    icon: FileText
  },
  {
    path: '/analysis',
    label: '학습 분석',
    icon: BarChart2
  },
  {
    path: '/calendar',
    label: '캘린더',
    icon: Calendar
  }];

  const teacherLinks = [
  {
    path: '/teacher',
    label: '대시보드',
    icon: Home
  },
  {
    path: '/teacher/classes',
    label: '학급 관리',
    icon: Users
  },
  {
    path: '/teacher/assignments',
    label: '과제 관리',
    icon: FileText
  },
  {
    path: '/teacher/assignments/create',
    label: '과제 생성',
    icon: PlusCircle
  }];

  const links = role === 'student' ? studentLinks : teacherLinks;
  const isActive = (path: string) => {
    if (path === '/' || path === '/teacher') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  const handleLogout = () => {
    navigate('/login');
  };
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-border z-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to={basePath || '/'}
          className="flex items-center gap-2 text-primary font-bold text-xl">
          
          <BookOpen className="text-primary" />
          <span>Re:Write</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors
                  ${isActive(link.path) ? 'bg-primary-light text-primary-hover' : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'}`}>
                
                <Icon size={18} />
                {link.label}
              </Link>);

          })}
        </div>

        {/* User Profile & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to={`${basePath}/mypage`}
            className="hidden sm:flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-full pr-4 transition-colors">
            
            <img
              src={user.profile_image}
              alt="Profile"
              className="w-8 h-8 rounded-full bg-gray-100" />
            
            <div className="flex flex-col">
              <span className="text-sm font-medium text-text-primary leading-none">
                {user.name}
              </span>
              <span className="text-xs text-text-secondary mt-1">
                {role === 'student' ? '학생' : '선생님'}
              </span>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="hidden sm:flex p-2 text-text-secondary hover:text-accent hover:bg-red-50 rounded-full transition-colors"
            title="로그아웃">
            
            <LogOut size={20} />
          </button>

          <button
            className="md:hidden p-2 text-text-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen &&
      <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-border shadow-lg p-4 flex flex-col gap-2">
          <div className="flex items-center gap-3 p-3 mb-2 border-b border-gray-100">
            <img
            src={user.profile_image}
            alt="Profile"
            className="w-10 h-10 rounded-full bg-gray-100" />
          
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-text-secondary">
                {role === 'student' ? '학생' : '선생님'}
              </div>
            </div>
          </div>

          {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  ${isActive(link.path) ? 'bg-primary-light text-primary-hover' : 'text-text-secondary hover:bg-gray-50'}`}>
              
                <Icon size={20} />
                {link.label}
              </Link>);

        })}

          <Link
          to={`${basePath}/mypage`}
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-gray-50">
          
            <Users size={20} />
            마이페이지
          </Link>

          <button
          onClick={() => {
            setIsMobileMenuOpen(false);
            handleLogout();
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-accent hover:bg-red-50 text-left">
          
            <LogOut size={20} />
            로그아웃
          </button>
        </div>
      }
    </nav>);

}