
import React from 'react';
import { BookHeart, Mic, UtensilsCrossed } from 'lucide-react';
import QuickActionButton from './QuickActionButton';
import { useToast } from '@/hooks/use-toast';

interface QuickActionsProps {
  onActionSelect: (action: string) => void;
}

const QuickActions = ({ onActionSelect }: QuickActionsProps) => {
  const { toast } = useToast();
  
  const handleVoiceNote = () => {
    toast({
      title: "Coming Soon",
      description: "Voice notes will be available in a future update."
    });
    onActionSelect('voice');
  };

  return (
    <section className="grid grid-cols-3 gap-3">
      <QuickActionButton 
        icon={<BookHeart size={20} />}
        label="Journal"
        color="bg-blue-600"
        onClick={() => onActionSelect('journal')}
      />
      <QuickActionButton 
        icon={<UtensilsCrossed size={20} />}
        label="Log Meal"
        color="bg-emerald-600"
        onClick={() => onActionSelect('meals')}
      />
      <QuickActionButton 
        icon={<Mic size={20} />}
        label="Voice Note"
        color="bg-purple-600"
        onClick={handleVoiceNote}
      />
    </section>
  );
};

export default QuickActions;
