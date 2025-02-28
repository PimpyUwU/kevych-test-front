import { Train } from './Train';
import { Station } from './Station';

export interface Route {
    id: number;
    train: Train;
    station: Station;
    date: string;
}