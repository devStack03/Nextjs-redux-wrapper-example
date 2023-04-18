import { createReducer } from '@reduxjs/toolkit';
import { runSystem, pauseSystem, insufficientBalance } from './actions';

export enum SystemStatus {
  PAUSED = 0,
  INSUFFICIENT_VALANCE = -1,
  RUNNING = 1,
};

interface SystemStatusSpec {
  key: number,
  label: string,
  color: string,
}

export const getSystemStatusSpec = (systemStatus: SystemStatus): SystemStatusSpec => {
  switch (systemStatus) {
    case SystemStatus.PAUSED:
      return { key: systemStatus, label: "Paused", color: "#7E838E" };
    case SystemStatus.INSUFFICIENT_VALANCE:
      return { key: systemStatus, label: "Insufficient credits", color: "#E9A654" };
    case SystemStatus.RUNNING:
      return { key: systemStatus, label: "Running", color: "#54CCA1" };
  }
}

export type SystemState = {
  status: SystemStatus;
};

const initialState: SystemState = {
  status: SystemStatus.PAUSED,
};

export const systemReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(runSystem, (state) => {
      state.status = SystemStatus.RUNNING;
    })
    .addCase(pauseSystem, (state) => {
      state.status = SystemStatus.PAUSED;
    })
    .addCase(insufficientBalance, (state) => {
      state.status = SystemStatus.INSUFFICIENT_VALANCE;
    });
});
