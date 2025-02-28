import { Station } from '@/models/Station';
import StationActions from './StationActions';

interface StationCardProps {
    station: Station;
    onDelete: (stationId: number) => void;
}

export const StationCard: React.FC<StationCardProps> = ({ station, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{station.city}</h2>
                        <p className="text-gray-500 mt-1">Station ID: {station.id}</p>
                    </div>
                    <StationActions stationId={station.id} onDelete={onDelete} />
                </div>
            </div>
        </div>
    );
};