import { Geoposition } from '@ionic-native/geolocation';

export interface Profile {
    email: string;
    displayName: string;
    lat: number;
    lng: any;
    friendlist: any;
}