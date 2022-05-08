export type AddForumItem = {
  author: string;
  content: string;
};

export type ForumItem = AddForumItem & {
  id: string;
  likes: number;
  dislikes: number;
  dateOfCreation: Date;
};

export type StateValue = {
  email: string;
  loggedIn: boolean;
};

export type StateAction = {
  type: ActionTypes;
  payload?: StateValue;
};

export enum ActionTypes {
  "LOG_IN",
  "LOG_OUT",
}

export type GlobalState = {
  state: StateValue;
  dispatch: any;
};

export interface StandingsData {
  id: number;
  mrData: MrData;
}

export interface MrData {
  series: string;
  standingsTable: StandingsTable;
}

export interface StandingsTable {
  season: string;
  standingsLists: StandingsList[];
}

export interface StandingsList {
  season: string;
  round: string;
  driverStandings: DriverStanding[];
}

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  driver: Driver;
  constructors: Constructor[];
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  nationality: string;
}
export interface INews {
  id: number;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  dateOfCreation: Date;
}
export interface IComment {
  Id: string;
  Author: null;
  Content: string;
  Likes: number;
  Dislikes: number;
  DateOfCreation: Date;
  NewsId: number;
  News: null;
}
