import ReturnPreviousPage from '@/components/ReturnPreviousPage';

const NotFound = () => {
  return (
    <div
      style={{ textAlign: 'center', padding: '2rem' }}
      className="flex flex-col items-center justify-center h-screen"
    >
      <h1 className='text-general-pink'>404 - Page Not Found</h1>
      <p className='text-general-pink'>Sorry, the page you are looking for does not exist.</p>
      <ReturnPreviousPage />
    </div>
  );
};

export default NotFound;
