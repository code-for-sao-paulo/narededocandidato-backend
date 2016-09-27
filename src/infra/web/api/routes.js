import politicalPartyRoutes from './data/politicalParty/politicalParty.routes';

const modules = [
  politicalPartyRoutes,
];

export default function (app) {
  modules.map((module) => module(app));
}
