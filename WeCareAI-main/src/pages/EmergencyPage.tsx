import { useState, useEffect } from 'react';
import {
  Siren,
  Phone,
  MapPin,
  Navigation,
  Clock,
  Building,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { hospitals } from '../data/mockData';

export default function EmergencyPage() {
const { t, language } = useApp();

const [userLocation, setUserLocation] = useState<{
  lat: number;
  lng: number;
} | null>(null);

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c).toFixed(1);
};

useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    () => {
      setUserLocation(null);
    }
  );
}, []);
const sortedHospitals = [...hospitals].sort((a, b) => {
  if (!userLocation) return 0;

  const distanceA = Number(
    calculateDistance(
      userLocation.lat,
      userLocation.lng,
      a.lat,
      a.lng
    )
  );

  const distanceB = Number(
    calculateDistance(
      userLocation.lat,
      userLocation.lng,
      b.lat,
      b.lng
    )
  );

  return distanceA - distanceB;
});

return (

    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
          <Siren size={20} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-gray-800">{t('Emergency Hospital Finder', 'आपातकालीन अस्पताल खोज')}</h2>
          <p className="text-sm text-gray-500">{t('Nearest government hospitals in Delhi', 'दिल्ली में निकटतम सरकारी अस्पताल')}</p>
        </div>
      </div>
     


      {/* Emergency Banner */}
      <div className="bg-red-600 text-white rounded-xl p-5 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Phone size={22} className="animate-pulse" />
          <h3 className="font-bold text-lg">{t('Call Emergency Services', 'आपातकालीन सेवा कॉल करें')}</h3>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          <a href="tel:112" className="bg-white text-red-600 px-5 py-2 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors">
            112
          </a>
          <a href="tel:108" className="bg-white text-red-600 px-5 py-2 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors">
            108
          </a>
          <a href="tel:011-26588500" className="bg-white text-red-600 px-5 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors">
            AIIMS: 011-26588500
          </a>
        </div>
      </div>

      {/* Hospital Cards */}
      <div className="space-y-4">
        {sortedHospitals.map((hospital, i) => (
          <div
  key={hospital.id}
  className={`card p-5 animate-slide-in ${
    userLocation && i === 0
      ? 'border-2 border-green-500 shadow-lg bg-green-50'
      : ''
  }`} style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Building size={18} className="text-primary-600" />
                  <h3 className="font-bold text-gray-800 text-lg">
                    {language === 'hi' ? hospital.nameHindi : hospital.name}
                  </h3>
                  {userLocation && i === 0 && (
  <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
    🟢 {t('Nearest Hospital', 'निकटतम अस्पताल')}
  </span>
)}
                </div>
                <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                  <Navigation size={14} />
    <span className="font-semibold text-primary-600">
  {userLocation
    ? `${calculateDistance(
        userLocation.lat,
        userLocation.lng,
        hospital.lat,
        hospital.lng
      )} km`
    : hospital.distance}
</span>
                  <span className="mx-1">•</span>
                  <Clock size={14} />
                <span>
  {userLocation
    ? (() => {
        const distance = Number(
          calculateDistance(
            userLocation.lat,
            userLocation.lng,
            hospital.lat,
            hospital.lng
          )
        );

        const totalMinutes = Math.round(distance * 2); // Approximation

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return hours > 0
          ? `~${hours} hr ${minutes} min`
          : `~${minutes} min`;
      })()
    : t('Calculating...', 'गणना हो रही है...')}
</span>
                </div>
              </div>
            <a
  href={`tel:${hospital.phone}`}
  className="bg-red-50 text-red-600 p-2.5 rounded-xl hover:bg-red-100 transition-colors"
  title={t('Call Hospital', 'अस्पताल को कॉल करें')}
>
  <Phone size={20} />
</a>
             <a
  href={
    userLocation
      ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${hospital.lat},${hospital.lng}&travelmode=driving`
      : `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`
  }
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ml-2"
  title={t('Navigate with Google Maps', 'Google Maps से नेविगेट करें')}
>
  <ExternalLink size={16} />
  <span className="text-sm font-medium">
    {t('Navigate', 'नेविगेट')}
  </span>
</a>
            </div>

            <div className="flex items-start gap-2 mb-3 text-sm text-gray-600">
              <MapPin size={14} className="shrink-0 mt-0.5 text-gray-400" />
              <span>{language === 'hi' ? hospital.addressHindi : hospital.address}</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Phone size={14} className="text-gray-400" />
              <a href={`tel:${hospital.phone}`} className="text-sm font-mono text-primary-600 font-semibold hover:underline">
                {hospital.phone}
              </a>
            </div>

            {/* Emergency Departments */}
            <div className="pt-3 border-t border-gray-50">
              <p className="text-xs font-medium text-gray-400 mb-2">
                {t('Emergency Departments', 'आपातकालीन विभाग')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {hospital.emergencyDepts.map(dept => (
                  <span
                    key={dept}
                    className="px-2.5 py-1 bg-red-50 text-red-700 rounded-md text-xs font-medium"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
