import {
  useContext,
  useReducer,
  createContext,
  useEffect,
  useCallback,
} from "react";

const BASE_URL =
  "https://api.jsonstorage.net/v1/json/ce2317f1-6eb2-4d70-a918-e37cb92c8ea2/c6622788-1743-4a48-b0f9-7b94d5e2b7e6";
const apiKey = "?apiKey=77f53356-7f15-4ab3-9c55-2867ceb15074";
const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        currentCity: state.cities[0] || {},
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        currentCity: state.cities[0] || {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type :(");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data.cities });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Произошла ошибка при загрузке данных...",
        });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      const currCity = data.cities.filter(
        (city) => String(city.id) === String(id)
      )[0];

      dispatch({ type: "city/loaded", payload: currCity });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Произошла ошибка при загрузке данных...",
      });
    }
  }, []);

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      await fetch(BASE_URL + apiKey, {
        method: "PATCH",
        body: JSON.stringify({ cities: [newCity] }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: "city/created", payload: newCity });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Произошла ошибка при добавлении города...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      const filteredCities = cities.filter(
        (city) => String(city.id) !== String(id)
      );

      await fetch(BASE_URL + apiKey, {
        method: "PUT",
        body: JSON.stringify({ cities: filteredCities }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: "city/deleted", payload: filteredCities });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Произошла ошибка при удалении города...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
