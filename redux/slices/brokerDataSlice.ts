import { createSlice } from "@reduxjs/toolkit";
import { eventType, listType } from "@/common/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BrokerDataSlice {
  trackingList: {
    [eventKey: string]: {
      [listKey: string]: number[];
    };
  };
}

export interface UpdateTrackingListPayload {
  event: eventType;
  list: listType;
  id: number;
}

const initialState: BrokerDataSlice = {
  trackingList: {
    impression: {
      topStock: [],
      search: [],
      topForex: [],
    },
    click: {
      topStock: [],
      search: [],
      topForex: [],
    },
  },
};

const brokerDataSlice = createSlice({
  name: "brokerData",
  initialState,
  reducers: {
    updateTrackingList(
      state,
      action: PayloadAction<UpdateTrackingListPayload>
    ) {
      const { event, list, id } = action.payload;
      state.trackingList[event][list] = [
        ...state.trackingList[event][list],
        id,
      ];
    },
  },
});

export default brokerDataSlice.reducer;

export const { updateTrackingList } = brokerDataSlice.actions;
