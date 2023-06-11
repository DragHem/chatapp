import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/app/map/components/Map'), { ssr: false });

const MapPage = () => {
  return (
    <div className="hidden h-full lg:block ">
      <Map />
    </div>
  );
};

export default MapPage;
