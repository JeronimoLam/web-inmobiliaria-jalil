interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className }: PageContainerProps) => (
  <div className={`w-full px-4 container mx-auto ${className || ''}`}>
    {children}
  </div>
);