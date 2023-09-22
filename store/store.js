import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        newAirspace: false,
        confirmOnMap: false,
        airspaceAdditionalInfo: false,
        airspaceData: {

        }
    }
};

const airspaceSlice = createSlice({
    name: "airspace",
    initialState: initialState,
    reducers: {
        newAirspaceModal(state) {
            state.value.newAirspace = true;
        },

        closeNewAirspaceModal(state) {
            state.value.newAirspace = false;
        },

        confirmOnMapModal(state) {
            state.value.confirmOnMap = true;
        },

        closeConfirmOnMapModal(state) {
            state.value.confirmOnMap = false;
        },

        additionalInfoModal(state) {
            state.value.airspaceAdditionalInfo = true;
        },

        closeAdditionalInfoModal(state) {
            state.value.airspaceAdditionalInfo = false;
        },

        airspaceData(state, action) {
            state.value.airspaceData = {
                ...state.value.airspaceData,
                ...action.payload
            }
        }
    }
});

const store = configureStore({
    reducer: airspaceSlice.reducer
});

export const counterActions = airspaceSlice.actions;

export default store;