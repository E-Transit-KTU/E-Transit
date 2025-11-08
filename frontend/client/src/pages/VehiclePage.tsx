import React, { useState, useEffect } from 'react';

// Define the Vehicle interface
interface Vehicle {
  id: number;
  valstybiniaiNum: string;
  rida: number;
  vietuSk: number;
  kuroTipas: number;
}

const VehiclePage: React.FC = () => {
  // Specify the type for useState
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // Example data for testing - now properly typed
  const exampleData: Vehicle[] = [
    { id: 1, valstybiniaiNum: 'ABC123', rida: 50000, vietuSk: 5, kuroTipas: 1 },
    { id: 2, valstybiniaiNum: 'DEF456', rida: 80000, vietuSk: 7, kuroTipas: 3 },
    { id: 3, valstybiniaiNum: 'GHI789', rida: 30000, vietuSk: 4, kuroTipas: 4 },
    { id: 4, valstybiniaiNum: 'JKL012', rida: 120000, vietuSk: 5, kuroTipas: 2 },
    { id: 5, valstybiniaiNum: 'MNO345', rida: 15000, vietuSk: 8, kuroTipas: 1 }
  ];

  const kuroTipasLabels: { [key: number]: string } = {
    1: 'Benzinas',
    2: 'LPG',
    3: 'Dyzelinas',
    4: 'Elektra'
  };

  useEffect(() => {
    // Simulate API call
    const fetchVehicles = async () => {
      try {
        // For testing, use example data
        // In real app, you would use:
        // const response = await fetch('/api/vehicles');
        // const data = await response.json();
        // setVehicles(data);
        
        setTimeout(() => {
          setVehicles(exampleData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        setVehicles(exampleData); // Fallback to example data
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const loadExampleData = () => {
    setVehicles(exampleData);
  };

  const clearData = () => {
    setVehicles([]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Transporto Priemonių Sąrašas</h2>
            <div className="space-x-2">
              <button
                onClick={loadExampleData}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Rodyti Pavyzdžius
              </button>
              <button
                onClick={clearData}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Išvalyti
              </button>
            </div>
          </div>
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">Nėra duomenų rodyti</p>
            <button
              onClick={loadExampleData}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
            >
              Įkelti Pavyzdinius Duomenis
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valstybinis Nr.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rida (km)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vietų Sk.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kuro Tipas
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {vehicle.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {vehicle.valstybiniaiNum}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.rida.toLocaleString()} km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vehicle.vietuSk}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vehicle.kuroTipas === 4 
                          ? 'bg-green-100 text-green-800' 
                          : vehicle.kuroTipas === 3 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {kuroTipasLabels[vehicle.kuroTipas]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Iš viso: <span className="font-semibold">{vehicles.length}</span> transporto priemonės
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehiclePage;