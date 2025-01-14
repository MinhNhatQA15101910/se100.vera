import React from 'react';
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmDialogProps {
   isOpen: boolean;
   onOpenChange: (isOpen: boolean) => void;
   onConfirm: () => void;
   onCancel?: () => void;
   title: string;
   description: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
   isOpen,
   onOpenChange,
   onConfirm,
   onCancel,
   title,
   description,
}) => {
   return (
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
         <AlertDialogTrigger />
         <AlertDialogContent className="bg-general-theme border-none">
            <AlertDialogHeader>
               <AlertDialogTitle className='text-general-pink-hover'>
                  {title}
               </AlertDialogTitle>
               <AlertDialogDescription className='font-medium'>
                  {description}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel
                  className="mr-4 px-4 py-2 rounded-lg bg-transparent border-general-pink-border text-general-pink 
                hover:text-general-white hover:border-transparent hover:bg-general-pink-hover"
                  onClick={onCancel}
               >
                  Cancel
               </AlertDialogCancel>
               <AlertDialogAction
                  className="px-4 py-2 bg-general-pink rounded-lg hover:bg-general-pink-hover"
                  onClick={onConfirm}
               >
                  Continue
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default ConfirmDialog;