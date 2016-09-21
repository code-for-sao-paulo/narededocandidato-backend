import imageRoutes from './data/image/image.routes';

const modules = [
  imageRoutes,
];

export default function (app) {
  modules.map((module) => module(app));
}
