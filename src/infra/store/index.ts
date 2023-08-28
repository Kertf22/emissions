import { create } from "zustand";
import { User } from "../../App";
import _ from "lodash";

interface Data {
  value: any;
  type: string | "error" | "login" | "register";
}

interface Location {
  id: number
  lat: number
  long: number
  timestamp: number
  country :string
  city :string
  state :string
}
interface GlobalStore {
  user: null | User;
  setUser: (user: User) => void;

  countries: {
    country: string;
  }[];
  setCountries: (
    countries: {
      country: string;
    }[]
  ) => void;

  years: number[];
  totalFonts: number[];

  data: Data;
  setData: (data: Data) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  locations:Location[];
  setLocations: (locations: Location[]) => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  locations: [],
  countries: [],
  setCountries: (
    countries: {
      country: string;
    }[]
  ) => set({ countries }),
  years: _.range(2021, 1749, -1),
  totalFonts: _.range(1, 6),
  data: null,
  setData: (data: Data) => set({ data }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  setLocations: (locations: any[]) => set({ locations }),
}));

export default useGlobalStore;
