export type Participant = {
  selected?: number;
  lastHeartbeat: number;
  lurker: boolean;
  name: string;
};

export type EstimationState = {
  displayed?: boolean;
  participants?: {
    [id: string]: Participant;
  };
};

export const initialEstimationState: EstimationState = {
  displayed: false,
  participants: {},
};
