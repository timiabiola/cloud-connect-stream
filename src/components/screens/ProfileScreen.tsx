
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Settings, 
  Goal, 
  Scale, 
  LogOut, 
  ChevronRight, 
  Bell, 
  HelpCircle, 
  Shield 
} from 'lucide-react';

const ProfileScreen = () => {
  const { user, profile, signOut } = useAuth();

  // Profile sections
  const profileSections = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: <User size={18} />,
      items: [
        { label: 'Account Settings', icon: <Settings size={18} /> },
        { label: 'Health Profile', icon: <User size={18} /> },
        { label: 'Nutrition Goals', icon: <Goal size={18} /> },
        { label: 'Progress Metrics', icon: <Scale size={18} /> }
      ]
    },
    {
      id: 'app',
      title: 'App Settings',
      icon: <Settings size={18} />,
      items: [
        { label: 'Notifications', icon: <Bell size={18} /> },
        { label: 'Privacy', icon: <Shield size={18} /> },
        { label: 'Help & Support', icon: <HelpCircle size={18} /> }
      ]
    }
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="container px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Profile</h1>
      
      {/* User card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.full_name || 'User'} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-emerald-600" />
                )}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                {profile?.full_name || 'User'}
              </h2>
              <p className="text-slate-500">
                {profile?.username ? `@${profile.username}` : user?.email}
              </p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-emerald-600"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Profile sections */}
      {profileSections.map(section => (
        <div key={section.id} className="mb-6">
          <div className="flex items-center mb-3">
            <div className="mr-2 text-slate-500">{section.icon}</div>
            <h2 className="text-lg font-semibold text-slate-800">{section.title}</h2>
          </div>
          <Card>
            <CardContent className="p-0">
              {section.items.map((item, index) => (
                <React.Fragment key={item.label}>
                  <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50">
                    <div className="flex items-center">
                      <div className="mr-3 text-slate-500">{item.icon}</div>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-400" />
                  </div>
                  {index < section.items.length - 1 && (
                    <Separator />
                  )}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}
      
      {/* Logout button */}
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        Sign Out
      </Button>
    </div>
  );
};

export default ProfileScreen;
