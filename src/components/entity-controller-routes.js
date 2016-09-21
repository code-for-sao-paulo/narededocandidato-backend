import r from 'ressendr';

export default function (app, controller, baseRoute) {
  app.get(`${baseRoute}`, r.handle(controller.list.bind(controller)));
  app.get(`${baseRoute}/:id`, r.handle(controller.show.bind(controller)));
  app.post(`${baseRoute}`, r.handle(controller.create.bind(controller)));
  app.put(`${baseRoute}/:id`, r.handle(controller.update.bind(controller)));
  app.delete(`${baseRoute}/:id`, r.handle(controller.remove.bind(controller)));
  return app;
}
