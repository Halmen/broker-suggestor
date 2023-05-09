import { combineReducers } from "redux";
import brokerDataSliceReduce from "@/redux/slices/brokerDataSlice";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import {
  updateTrackingList,
  UpdateTrackingListPayload,
} from "@/redux/slices/brokerDataSlice";
import { eventIdMap, sendEvent, MeasurementId } from "@/common/consts";
import { useDispatch } from "react-redux";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: updateTrackingList,
  effect: async (action) => {
    sendEvent({
      type: action.payload.event,
      brokerId: action.payload.id,
      measurementId: eventIdMap[action.payload.list] as MeasurementId,
    });
  },
});

export const makeStore = () => {
  const reducer = combineReducers({
    brokerData: brokerDataSliceReduce,
  });

  return configureStore({
    reducer,
    devTools: {
      name: "BrokerSuggester",
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};
